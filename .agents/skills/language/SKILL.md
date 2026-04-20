---
name: language
description: Standardized system for localization (i18n) and multilingual support.
---

# 🌐 Language & Localization System

Guidelines for handling text, translations, and multilingual support across the application.

---

## 1. Core Principles

- **No hardcoded text**: All UI text MUST come from language files
- **Single source of truth**: Use centralized translation files
- **Consistency**: Reuse keys whenever possible
- **Scalability**: Structure keys for long-term growth

---

## 2. Mandatory Usage

### ✅ ALWAYS use:

`useLanguage` hook

```ts
const { translate } = useLanguage();
translate("common.save");
```
