
  # Luxury Education Counseling Platform

  This is a code bundle for Luxury Education Counseling Platform. The original project is available at https://www.figma.com/design/K1ghQrQFKSFLyPPhihN5Kv/Luxury-Education-Counseling-Platform.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Tiered access control (MVP)

  Auth, verification, and profile persistence are mocked behind
  `src/lib/access/`. See [ACCESS_CONTROL.md](ACCESS_CONTROL.md) for the full
  model, how to gate a new feature, and how to swap the mocks for Supabase.

  ### Dev tier switcher

  A floating "Dev Tier" dropdown (bottom-right) lets you force the current
  user into Anonymous / Email / Full for demo purposes. It only renders when
  `NEXT_PUBLIC_ENABLE_DEV_SWITCHER=true` is set (see `.env.local`).

  To remove it permanently:
  1. Delete the `src/dev/` folder.
  2. In `app/layout.tsx`, remove the `import { UserSwitcher } from "@/dev/UserSwitcher";`
     line and the `<UserSwitcher />` line.
  3. Optionally delete `NEXT_PUBLIC_ENABLE_DEV_SWITCHER` from `.env.local`.

  Nothing else in the app imports from `src/dev/`, so these are the only steps.
  