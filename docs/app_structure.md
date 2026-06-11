# Frontend (App) Folder Structure

This document outlines the architectural directory structure of the React Native / Expo application located in the `app/` folder.

```
app/
├── app/                  # File-based routing navigation screens (Expo Router)
│   ├── (auth)/           # Authentication screens (Login, OTP Verification)
│   ├── (onboarding)/     # Initial setup screens (User Details, Family Setup, Confirm, Agent Pipeline Log)
│   ├── (tabs)/           # Main application screens (Home Dashboard, Meds tracker, Daily Checkins, AI Bot, Profile)
│   ├── _layout.tsx       # Root layout defining routing animations and auth hydration logic
│   └── index.tsx         # Gateway entry point to redirect users based on login state
│
├── assets/               # Branding assets, fonts, icons, Lottie animations, and splash screens
│
├── components/           # Reusable UI component building blocks categorized by feature
│   ├── bodymap/          # 3D anatomical map canvas and interactive zone highlight widgets
│   ├── chat/             # Chat bubbles, system notes, and inputs for the AI Health Assistant
│   ├── heatmap/          # Zone-specific symptom assessment cards and detail panels
│   ├── home/             # Family profile grids, smartwatch indicators, and risk gauge widgets
│   ├── shared/           # Common screen wrappers
│   └── ui/               # Standard UI elements (custom Card, Badge, buttons, and skeleton loaders)
│
├── config/               # App configuration files
│   ├── api.ts            # Dynamic backend URLs and API route constants
│   └── supabase.ts       # Mock Supabase client configuration for offline persistence
│
├── constants/            # Common app constants
│
├── data/                 # Static data configurations (e.g. body zone definitions, coordinates, and recommendations)
│
├── hooks/                # Custom React hooks
│
├── services/             # API connection and data logic services
│   ├── auth.service.ts   # Persistent local profile and family group queries (AsyncStorage-based)
│   ├── backend.service.ts# Mock API endpoints (chat orchestration, Lipid/glucose report parser, store finder)
│   ├── medicine.service.ts# Medication scheduling helpers
│   ├── schemes.service.ts# Government healthcare scheme matching helpers
│   └── vitals.mock.ts    # Generated mock sensor streams
│
├── store/                # Zustand global state management
│   └── auth.store.ts     # Global user authentication and profile hydrated state
│
├── theme/                # Theme tokens (colors, typography, spacing definitions)
│
├── types/                # TypeScript interface declarations
│
├── .env                  # Local client environment variables (Supabase URL / Anon Keys)
├── .env.example          # Template showing variable names for development setup
├── app.json              # Expo application configurations (permissions, camera settings, bundler packages)
├── package.json          # Node dependencies and build scripts
└── tsconfig.json         # TypeScript configuration rules
```

---

## Key Directories Explained

### 1. File-Based Routing (`app/app/`)
Expo Router dynamically translates the file tree in this directory into pages:
- **Groups**: Folders enclosed in parentheses (e.g., `(tabs)`) configure layouts without adding segments to the URL path.
- **Tabs**: Layout in `(tabs)/_layout.tsx` coordinates bottom tab navigation switching.

### 2. Feature Components (`app/components/`)
Contains visual primitives and widgets. All styling adheres strictly to our central design system in `theme/`. Placeholders and static cards mimic live clinical systems.

### 3. Persisted Local Services (`app/services/`)
Coordinates data retrieval. We use a mock offline-first pattern:
- **`auth.service.ts`**: Implements offline CRUD operations on `AsyncStorage` to mimic user registration and joining families locally.
- **`backend.service.ts`**: Returns delayed static mock promises to simulate fast server endpoints for AI chat and diagnostic document scanning.
