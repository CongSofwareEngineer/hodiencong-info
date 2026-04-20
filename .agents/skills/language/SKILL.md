---
name: language
description: Guidelines for localization and multilingual support in the project
version: 1.0.0
tags: [i18n, localization, frontend, hooks, ui]
---

# 🌐 Language Skill

This skill governs how text, translations, and multilingual support are handled throughout the project. AI Agents must strictly follow these guidelines when working with UI components, notifications, or dynamic content.

## 🎯 Objectives

- Ensure 100% of UI-displayed text is managed through language files.
- Maintain consistency, maintainability, and synchronization across all supported languages.
- Prevent hardcoded strings, duplicate keys, or missing translations.

## 📜 Core Rules

1. **Always use the `useLanguage` hook**: All UI text must be retrieved via the `useLanguage` hook. Never directly import JSON files or hardcode strings.
2. **Check before adding a new key**: Before creating a new translation key, always check `@/public/assets/language/en.json`. If an equivalent key exists, reuse it.
3. **No hardcoded text**: Hardcoding strings directly in components is strictly prohibited. Only use keys from language files.
4. **Do not create new hooks**: Only use the existing `useLanguage` hook. Do not define new hooks, contexts, or utilities for language management.
5. **Synchronize all language files**: When adding a new key, it MUST be added to ALL files in `@/public/assets/language/` (e.g., `en.json`, `vn.json`). Keys must exist in every file; translations can temporarily use English if not yet localized.

## 📝 Key Naming Conventions

- Structure: `module.section.element` or `module.page.action` (e.g., `auth.login.submitButton`, `dashboard.welcome.title`)
- Consistently use `dot.notation`.
- Avoid generic names like `text`, `label`, or `message`. Keys must be context-specific.
- Group by feature/page for easier maintenance and discovery.

## 🔤 Handling Dynamic Text & Parameters

- When text contains variables (e.g., `Hello, {name}`), pass parameters via an object: `translate('key', { name: userName })`.
- Never manually concatenate strings in components (`"Hello, " + user.name + "!"`).
- Keep sentence structure natural per language. Avoid hardcoding variable positions within sentences.

## ✅ Pre-Submission Checklist (Agent Self-Validation)

- [ ] No hardcoded strings in JSX/TSX/templates
- [ ] All new keys added to `en.json` and all other language files in the directory
- [ ] Keys follow the naming convention (`module.section.element`)
- [ ] Dynamic values are passed via parameters, not manually concatenated
- [ ] No new hooks/contexts/utilities created for language management

## 🚫 Anti-Patterns (Strictly Avoid)

```tsx
// ❌ WRONG: Direct hardcoding
<button>Login</button>

// ❌ WRONG: Direct JSON import
import en from '@/public/assets/language/en.json'
<span>{en.dashboard.title}</span>

// ❌ WRONG: Manual string concatenation
<p>Hello, {user.name}!</p>

// ✅ CORRECT: Use hook + proper key + parameter passing
const { translate } = useLanguage()
<button>{translate('auth.login.submitButton')}</button>
<p>{translate('common.greeting', { name: user.name })}</p>
```
