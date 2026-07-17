# Migrations

Placeholder for the Phase 2 JSON → MongoDB cutover. This will hold one-off
scripts that read `app/api/universities.json` and
`app/api/university_details.json` and `insertMany` them into MongoDB
collections.

No migration framework is included here yet — the `mongodb` driver ships
without one, and adding a third-party migration tool wasn't part of the
approved Phase 1 dependency list. When the cutover happens, either a
lightweight custom script or a dedicated migration library can be chosen
then, based on what Phase 2 actually needs.
