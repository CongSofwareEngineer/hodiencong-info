---
name: zustand
description: Guidelines for state management using Zustand.
---

# Zustand Skill

This skill governs how global state and persistence are handled using Zustand.

## Core Rules

1. **Follow Pattern in `user.ts`**: When creating a new store, follow the implementation pattern found in `@/zustand/user.ts`.
2. **Persisted Stores**: If the store requires local storage persistence, follow the pattern used in `@/zustand/language.ts`.
3. **Hooks Integration**: After creating a Zustand store, add a corresponding hook in the `@/hooks/` directory to simplify store usage in components.
