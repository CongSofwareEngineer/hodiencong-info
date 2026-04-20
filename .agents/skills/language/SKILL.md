---
name: language
description: Guidelines for localization and multilingual support.
---

# Language Skill

This skill governs how text and localization are handled in the project.

## Core Rules

1. **Use `useLanguage` Hook**: Always use the `useLanguage` hook to retrieve translated text. Do not use direct imports or hardcoded strings.
2. **Check Before Adding**: Before adding a new translation key, check `@/public/assets/language/en.json` to see if the text already exists. If it does, reuse it.
3. **No Hardcoded Text**: Never write hardcoded text directly in the UI components. Use keys from the language files.
4. **No New Language Hooks**: Do not create any new hooks for language management. Stick to the provided `useLanguage`.
5. **Update All Language Files**: When adding a new key, ensure it is added to all language files in `@/public/assets/language/` (e.g., `en.json`, `vn.json`) to keep them in sync.
