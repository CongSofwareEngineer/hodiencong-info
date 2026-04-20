# 📘 UI Development System

Guidelines for building consistent, scalable, and high-quality UI components in this project.

---

## 1. Core Principles

- **Consistency first**: UI must look and behave uniform across the app
- **Reusable over duplicate**: Always reuse existing components
- **Separation of concerns**: UI ≠ business logic
- **Mobile-first design**
- **Premium & modern aesthetic**

---

## 2. Component Prioritization

Always follow this priority order:

1. **Local Components (REQUIRED FIRST)**
   - Located in `@/components/`
   - Examples:
     - `MyButton`
     - `MyInput`
     - `MyDropDown`
     - `MyModal`
     - `MyImage`
     - `MyCheckbox`
     - `...`

2. **Third-party Components (`@heroui/react`)**
   - Only allowed when:
     - No equivalent local component exists
     - Component is complex (e.g., DatePicker, Table)

   - If reused more than **2 times → MUST wrap into local component**

✅ Example:

```tsx
// ✅ DO
import MyButton from "@/components/MyButton";

// ❌ DON'T
import { Button } from "@heroui/react";
```

---

## 3. Import Mapping

| Element  | Local Component | Path                    |
| -------- | --------------- | ----------------------- |
| Button   | MyButton        | @/components/MyButton   |
| Input    | MyInput         | @/components/MyInput    |
| Dropdown | MyDropDown      | @/components/MyDropDown |
| Modal    | MyModal         | @/components/MyModal    |
| Image    | MyImage         | @/components/MyImage    |
| Checkbox | MyCheckbox      | @/components/MyCheckbox |

---

## 4. ClassName Handling (MANDATORY)

All conditional class names MUST use `cn` utility.

📍 Path: `@/utils/tailwind`

```tsx
import { cn } from "@/utils/tailwind";

<div
  className={cn(
    "base-class",
    isActive && "active-class",
    disabled ? "opacity-50" : "hover:opacity-80",
  )}
/>;
```

🚫 DO NOT:

- Use string concatenation
- Use inline ternary inside className without `cn`

---

## 5. Component Design Rules

All components MUST:

- Accept `className` and merge via `cn`
- Be reusable and generic
- Avoid business logic inside UI
- Support common states:
  - `disabled`
  - `loading`
  - `error` (if applicable)

---

## 6. State & Form Handling

- Prefer **controlled components**
- Do NOT handle validation logic inside UI components
- Keep logic in:
  - hooks
  - services
  - parent components

```tsx
// ✅ GOOD
<MyInput value={value} onChange={setValue} />

// ❌ BAD
<MyInput internallyHandlesState />
```

---

## 7. UI States (REQUIRED)

Every page/component MUST handle:

- Loading state
- Empty state
- Error state

```tsx
if (loading) return <Skeleton />;
if (!data) return <Empty />;
if (error) return <Error />;
```

---

## 8. Responsive Design

- Use **mobile-first approach**
- Tailwind breakpoints:
  - `sm` (≥640px)
  - `md` (≥768px)
  - `lg` (≥1024px)
  - `xl` (≥1280px)

✅ Example:

```tsx
<div className="text-sm md:text-base lg:text-lg" />
```

🚫 Avoid:

- Fixed widths (`w-[500px]`) unless necessary

---

## 9. Design System (Premium UI Rules)

### Spacing

- Use consistent scale: `4, 8, 12, 16, 24, 32`

### Border Radius

- Prefer: `rounded-xl`, `rounded-2xl`

### Colors

- Limit color palette
- Avoid random colors
- Use semantic colors:
  - primary
  - secondary
  - danger
  - muted

### Shadows

- Use soft shadows:
  - `shadow-md`
  - `shadow-lg`

- Avoid harsh shadows

### Visual Feel

- Clean
- Soft
- Slight gradients allowed
- Avoid clutter

---

## 10. Folder Structure

```
/components
  /ui          → reusable base components
  /features    → feature-specific components

/pages
/hooks
/services
/utils
```

---

## 11. Code Quality Rules

- No inline styles unless necessary
- No duplicated UI logic
- Keep components small and focused
- Split large components when needed

---

## 12. When to Create New Component

Create a new component when:

- UI is reused ≥ 2 times
- Component becomes too large (>150 lines)
- Logic can be isolated

---

## 13. Performance Best Practices

- Avoid unnecessary re-renders
- Use `React.memo` when needed
- Lazy load heavy components

---

## 14. Example Component Standard

```tsx
import { cn } from "@/utils/tailwind";

type Props = {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

export default function MyButton({ className, children, disabled }: Props) {
  return (
    <button
      disabled={disabled}
      className={cn(
        "px-4 py-2 rounded-xl transition",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {children}
    </button>
  );
}
```

---

## ✅ Final Notes

- Always check `components/` before creating new UI
- Keep UI clean, consistent, and scalable
- Prioritize user experience and visual quality

---

## 🚀 Evaluation

- Optimized for Gemini / GPT code generation
- Reduces UI inconsistency
- Scales well for teams
- Production-ready
