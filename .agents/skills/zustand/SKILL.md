---
name: zustand
description: Standardized system for global state management using Zustand.
---

# 🧠 Zustand State Management System

Guidelines for managing global state, persistence, and store usage using Zustand.

---

## 1. Core Principles

- **Minimal global state**: Only store what truly needs to be global
- **Local first**: Prefer `useState` before using Zustand
- **Separation of concerns**: State logic must be clean and isolated
- **Performance-aware**: Avoid unnecessary re-renders

---

## 2. Store Location

All Zustand stores MUST be placed in: @/zustand/

---

## 3. Store Naming Convention

- File name: `xxx.ts`
- Hook name: `useXxxStore`

✅ Example:

- `user.ts` → `useUserStore`
- `language.ts` → `useLanguageStore`

---

## 4. Standard Store Structure (MANDATORY)

Every store MUST follow this structure:

```ts
import { create } from "zustand";

type State = {
  // state here
};

type Actions = {
  // actions here
};

type Store = State & Actions;

export const useExampleStore = create<Store>((set) => ({
  // state
  value: null,

  // actions
  setValue: (value) => set({ value }),
}));
```
