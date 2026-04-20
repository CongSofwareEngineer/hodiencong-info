---
name: noti
description: Guidelines for showing notifications and toasts in the application.
---

# Notification Skill (Noti)

This skill governs how notifications, toasts, and alerts are shown to the user.

## Core Rules

1. **Use `utils/notification.ts`**: Always use the utility functions provided in `@/utils/notification.ts` for showing any type of feedback (success, error, loading, etc.).
2. **Toasts**: If you need to show a "Toast", use the notification functions from the notification utility.
3. **No New Functions**: Do not add new functions to the notification utility file unless absolutely necessary and approved.
4. **Correct Function Usage**:
   - For errors, call `showNotificationError`.
   - For success messages, call `showNotificationSuccess`.
   - Map other events to their respective functions in the utility.
