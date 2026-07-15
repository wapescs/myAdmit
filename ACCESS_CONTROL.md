# Tiered Access Control — Developer Guide

MVP implementation. Everything here is mocked behind a service seam — there is
no Supabase, no real OTP delivery, and no persistence beyond the current page
session. See §4 for the swap plan.

## 1. Files touched

### New — service seam (`src/lib/access/`)

| File | Purpose |
|---|---|
| `types.ts` | `AccessTier`, `QualificationDetails` and related types, `isEntitled()` rank check |
| `authService.ts` | Interface: `signInWithGoogle`, `sendEmailOtp`, `verifyEmailOtp` |
| `verificationService.ts` | Interface: `sendPhoneOtp`, `verifyPhoneOtp` |
| `profileService.ts` | Interface: `saveQualification`, `getProfile` |
| `mock/shared.ts` | Fixed OTP code (`123456`) + fake network delay helper |
| `mock/authService.mock.ts` | Mock impl of `AuthService` |
| `mock/verificationService.mock.ts` | Mock impl of `VerificationService` |
| `mock/profileService.mock.ts` | Mock impl of `ProfileService` (in-memory) |
| `index.ts` | **The Supabase swap point** — wires interfaces to mock impls; also exports `MOCK_OTP_HINT` |
| `AccessProvider.tsx` | React context (`useAccess()`) — tier, profile, auth actions, modal open/close state |

### New — UI (`src/app/components/access/`)

| File | Purpose |
|---|---|
| `FeatureGate.tsx` | The one-line gating wrapper |
| `GateOverlay.tsx` | Blur overlay card (login or upgrade prompt) |
| `OtpEntry.tsx` | Shared 6-digit OTP UI, used by both email and phone verification |
| `EmailLoginModal.tsx` | Auth flow #1 — Google one-click or manual email + OTP |
| `UpgradeModal.tsx` | Auth flow #2 — the clubbed phone + qualification modal |
| `useUpgradeFlow.ts` | Step orchestration — the "skip phone if verified" branch |
| `UpgradeStepPhone.tsx` | Step A — phone + OTP |
| `useQualificationForm.ts` | Step B form state, matches the `QualificationDetails` schema |
| `UpgradeStepQualification.tsx` | Step B UI |
| `AccessModals.tsx` | Mounts both modals once, globally |

### New — dev switcher (`src/dev/UserSwitcher/`)

| File | Purpose |
|---|---|
| `UserSwitcher.tsx` | Floating tier dropdown, env-gated |
| `index.ts` | Re-export |

### Edited

| File | Change |
|---|---|
| `app/layout.tsx` | Mounts `AccessProvider` (inside `UserStateProvider`), `AccessModals`, and `UserSwitcher` |
| `app/chat/page.tsx`, `app/booking/page.tsx` | Wrapped in `<FeatureGate requires="full">` |
| `app/comparison/page.tsx`, `app/scholarships/page.tsx`, `app/dashboard/page.tsx`, `app/profile/page.tsx`, `app/university/[id]/page.tsx` | Wrapped in `<FeatureGate requires="email">` |
| `src/app/components/layout/Navbar/NavbarActions.tsx`, `NavMobileMenu.tsx` | "Login" button now opens `EmailLoginModal` instead of instantly setting tier |

`app/page.tsx` (homepage) is **not** wrapped — it must stay fully visible to
anonymous users per the brief.

## 2. The model

Three tiers, ranked `anonymous < email < full`:

- **Anonymous** — homepage + nav only. Every other route is blurred with a
  **login** prompt.
- **Email (semi)** — browses the whole platform freely. Only **AI Advisor**
  (`/chat`) and **Counseling** (`/booking`) are blurred with an **upgrade**
  prompt.
- **Full** — nothing is gated.

`FeatureGate` decides the outcome by comparing the current tier's rank against
`requires`. If entitled, it renders `children` untouched. If not, it renders
`children` again inside a `blur-sm pointer-events-none` wrapper and layers a
`GateOverlay` on top — a login prompt if the tier is `anonymous`, an upgrade
prompt for anything else. No redirects anywhere.

**Underlying state:** tier is *not* a new store. It's derived from the
pre-existing `UserStateProvider` (`useUserState()` → `"anonymous" |
"logged-in" | "complete"`), which was already wired through ~13 components
before this work started. `AccessProvider` composes that provider, mapping
`"logged-in" → "email"` and `"complete" → "full"`, and layers the extra fields
(`email`, `phone`, `phoneVerified`, `qualification`) that didn't exist before
in its own context. Every tier transition still flows through
`setUserState(...)`, so the legacy consumers keep working unmodified. See §6
for why this mapping wasn't collapsed into a rename.

All state — tier, email, phone, qualification — lives in React state only.
Nothing persists to storage. This matches the brief ("mock state can live in
memory") but means a hard refresh resets everyone to anonymous.

## 3. Adding a new gated feature

One line:

```tsx
<FeatureGate requires="email" featureName="My New Page">
  <MyNewPage />
</FeatureGate>
```

`requires` is `"email"` or `"full"`. `featureName` is optional and only feeds
the overlay copy ("Sign in to unlock **My New Page**").

## 4. Swapping mock → Supabase

1. Add `src/lib/access/supabase/{authService,verificationService,profileService}.ts`,
   each implementing the matching interface file (`authService.ts`,
   `verificationService.ts`, `profileService.ts`) with real Supabase calls.
2. In `src/lib/access/index.ts`, change the three imports from `./mock/...` to
   `./supabase/...`. Delete the `MOCK_OTP_HINT` export — real OTPs must never
   be shown to the client.
3. Decide whether `AccessProvider` should now source `tier` from a Supabase
   session/row instead of local `useState` + `UserStateProvider` — likely yes,
   since real auth needs to survive reload. That's the one place in the app
   that would need a logic change; every `FeatureGate` call site and every
   modal is untouched.

No other file changes. UI components only ever import from
`src/lib/access` (the `index.ts` barrel) or call `useAccess()` — never the
`mock/` folder directly.

## 5. Removing the dev switcher

1. Delete the `src/dev/` folder.
2. In `app/layout.tsx`, remove:
   - `import { UserSwitcher } from "@/dev/UserSwitcher";`
   - the `<UserSwitcher />` line inside the provider tree.
3. Optionally remove `NEXT_PUBLIC_ENABLE_DEV_SWITCHER` from `.env.local` /
   deployment env config (harmless if left — the component is gone, so the
   flag does nothing).

No other file imports from `src/dev/`.

## 6. Likely future bugs / footguns

- **Tier doesn't survive reload.** Everything is in-memory React state by
  design (§5 of the brief). A refresh mid-flow drops the user back to
  anonymous. Confirmed in testing: this is expected MVP behavior, not a bug —
  but it will surprise whoever demos this without knowing.
- **Dev switcher can't isolate "email + phone already verified."** Forcing
  `"email"` via the switcher always resets `phoneVerified` to `false`, and
  forcing `"full"` always sets it to `true`. The "skip phone if verified"
  branch in `useUpgradeFlow.ts` is real and correct, but you can't currently
  reach that state *only* through the dev switcher — you have to actually
  complete Step A once, drop tier to `"full"`→ back down isn't exposed either.
  If this branch needs regression testing, extend `devSetTier` or test it
  through the real flow.
- **The old `/profile` wizard (`src/app/components/profile-wizard/`) still
  exists and still calls `setUserState("complete")` directly** on its last
  step, with no phone verification and no real field capture (its inputs are
  cosmetic — `WizardFormField` never wires `value`/`onChange`). This is a
  pre-existing flow, not part of this brief, but it is now a second path to
  `"full"` tier that completely bypasses the Upgrade flow's phone-verification
  requirement. Recommend either deleting it, wiring it into the new
  `saveQualification`/`verifyPhoneOtp` flow, or removing its direct
  `setUserState` call — flagged rather than fixed here to keep this change
  scoped to the brief.
- **`UserState` ("anonymous"/"logged-in"/"complete") and `AccessTier`
  ("anonymous"/"email"/"full") are two names for the same three states.**
  `AccessProvider` maps between them so the ~13 pre-existing consumers of
  `useUserState()` didn't need to change. This is intentional (see §2) but is
  a naming trap for the next person — grep for `UserState` before assuming
  it's unrelated to tiers.
- **`FeatureGate`'s blur is a CSS overlay, not an access boundary.** Gated
  content is still mounted, still in the DOM, and still fetches whatever data
  it normally would (e.g. `ChatPage` still calls `useChat()`). There is no
  server-side check anywhere — this is fine for an MVP with no real backend,
  but the moment Supabase lands, any real data fetch must be gated
  server-side too, not just visually.
- **`ChatPage` has its own older `isLocked` gating** (via `useChat(userState)`
  → `ChatLockedState`) from before this brief. `FeatureGate` now wraps the
  whole page, so that internal lock state is redundant (fully obscured by the
  overlay) but still executes. Harmless, but worth deleting during cleanup.
- **OTP is genuinely fake.** `mockAuthService`/`mockVerificationService`
  accept exactly `123456` and nothing is sent anywhere. `MOCK_OTP_HINT` in
  `index.ts` prints that code directly in the UI — deleting that export is a
  required step of the Supabase swap (§4), not optional polish. If someone
  ships this without doing the swap, that hint string is the tell.
- **`NEXT_PUBLIC_ENABLE_DEV_SWITCHER` is a build-time-inlined public env var.**
  If it's ever set to `"true"` in a production `.env`, the switcher ships to
  real users (anyone can grant themselves `full` tier client-side). Treat it
  like a secret you don't want committed as `true` outside local dev.
- **Dialog ref-forwarding console warning.** Opening either modal logs a
  pre-existing React warning ("Function components cannot be given refs")
  from `src/app/components/ui/dialog.tsx`'s `DialogOverlay`. It predates this
  work (that shadcn primitive simply had no real caller before now) and is
  cosmetic — dev console only, no functional effect — left as-is to keep this
  change scoped to access control.

## Verification performed

- `npx tsc --noEmit` — clean.
- `npm run build` — succeeds, all routes prerender.
- Scripted Playwright walkthrough against `next dev`: anonymous → blur +
  login prompt on a platform page → Google login → email tier browses freely
  but sees an upgrade prompt on Counseling → phone OTP → qualification form →
  full tier → both Counseling and AI Advisor unlock without repeating
  verification → dev switcher forces anonymous and gating re-engages
  immediately → hard reload resets to anonymous (expected, documented above).
