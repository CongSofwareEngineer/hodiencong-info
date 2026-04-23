# 🎯 Claude Agent System Configuration

This file configures the Claude Code Agent system for the `hodiencong-info` project. It defines the project structure, available skills, and agent roles to ensure Claude Code Agent operates within the correct context and follows project-specific conventions.

## 📂 Project Structure

```
hodiecong-info/
├── .agents/                    # Claude Code Agent configuration
│   ├── skills/                 # Reusable skills for agents
│   │   ├── language/SKILL.md   # Language handling rules
│   │   ├── zustand/SKILL.md    # Zustand state management rules
│   │   └── ...                 # Other skills
│   └── agents/                 # Agent configurations
│       ├── frontend/AGENT.md   # Frontend agent configuration
│       └── ...                 # Other agents
├── app/                        # Next.js application code
├── components/                 # Reusable React components
├── constants/                  # Application constants
├── hooks/                      # Custom React hooks
├── public/                     # Public assets
├── styles/                     # Global styles
├── zustand/                    # Zustand stores
└── ...                         # Other project files
```

## 🛠️ Available Skills

Claude Code Agent has access to the following skills:

### 🌐 Language Handling

**File**: `.agents/skills/language/SKILL.md`
**Description**: Guidelines for internationalization and localization using `next-intl`.

**Key Rules**:

- Use `translate('key')` for translations (not `translate()`)
- Use `useLanguage()` hook in hook
- All translation keys must follow `feature.component.action` format
- Never hardcode text strings in components
- Use `translate('key', { param: value })` for dynamic parameters

### 🏪 Zustand State Management

**File**: `.agents/skills/zustand/SKILL.md`
**Description**: Guidelines for state management using Zustand.

**Key Rules**:

- Follow `@/zustand/user.ts` pattern for all new stores
- Use `persist` middleware for persistent state (like `@/zustand/language.ts`)
- Export typed hooks in `@/hooks/` (e.g., `useUserStore`)
- Never mutate state directly outside actions
- Use proper selectors to prevent unnecessary re-renders

## 🤖 Agent Configurations

### 👨‍💻 Frontend Agent

**File**: `.agents/agents/frontend/AGENT.md`
**Description**: Agent responsible for frontend development tasks.

**Key Responsibilities**:

- Implement UI components in `app/` and `components/`
- Use Tailwind CSS for styling (following existing patterns)
- Integrate with backend APIs via `axios`
- Manage state using Zustand (following `zustand/SKILL.md`)
- Handle internationalization using `next-intl` (following `language/SKILL.md`)
- Write clean, maintainable, and type-safe TypeScript code

## 🚀 Usage Instructions

To ensure Claude Code Agent works correctly with this project:

1. **Load Skills Automatically**: The agent system should automatically load skills from the `.agents/skills/` directory.
2. **Follow Agent Instructions**: When working on frontend tasks, ensure the agent follows the `frontend/AGENT.md` configuration.
3. **Adhere to Conventions**: All code changes must follow the conventions defined in the skill files (language handling, state management, etc.).
4. **Use Project Paths**: Always use absolute paths (e.g., `@/components/`, `@/zustand/`) instead of relative paths.

## 📝 Customization

To update the agent configuration:

- Add new skills to `.agents/skills/` and reference them in `AGENT.md` files
- Modify agent behavior by editing `.agents/agents/<agent-name>/AGENT.md`
- Update project structure documentation as needed

## ✅ Verification

To verify the configuration is working correctly:

1. **Check Skill Loading**: Ask Claude Code Agent to list available skills.
2. **Test Language Handling**: Ask it to implement a feature using `next-intl` and verify it follows the `language/SKILL.md` rules.
3. **Test State Management**: Ask it to add a new state feature and verify it follows the `zustand/SKILL.md` rules.
4. **Verify Agent Behavior**: Ask it to implement a frontend feature and verify it follows the `frontend/AGENT.md` rules.

---

**Note**: This configuration ensures Claude Code Agent understands the project structure, follows established coding conventions, and uses the correct libraries and patterns for this specific Next.js application.
