---
globs: ["app/api/**/*.ts", "lib/**/*.ts"]
---

# Conventions API

- Valider les inputs avec zod
- Reponses : { data: ... } ou { error: "message" }
- Status HTTP corrects (200, 201, 400, 401, 403, 404, 500)
- Verifier l'authentification en debut de handler
- Gerer les erreurs avec try/catch
