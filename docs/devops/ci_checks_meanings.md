# CI Workflow Checks & Auto-Assignment Meanings

This document explains what each of the parallel checks in our GitHub CI pipelines verifies and how the automatic assignment/labeling system functions.

---

## 📱 Frontend (App) CI Jobs

The App CI runs four parallel jobs concurrently to validate frontend contributions:

### 1. `Dependency Audit`
- **What it does**: Scans the dependency tree (`package-lock.json`) for known vulnerabilities using the npm audit registry.
- **Why it matters**: Ensures no third-party package containing critical security bugs is merged into the codebase.

### 2. `TypeScript Check`
- **What it does**: Compiles the source files using `tsc --noEmit` to verify type assignments.
- **Why it matters**: Catches type mismatches, missing properties, incorrect imports, and bad function parameters before they can crash the app at runtime.

### 3. `ESLint Check`
- **What it does**: Inspects the code structure using `expo lint`.
- **Why it matters**: Enforces coding guidelines, highlights unused variables, detects missing React Hook dependencies, and checks for syntax anti-patterns.

### 4. `Production Export Build`
- **What it does**: Compiles and bundles the application for web using `npx expo export --platform web`.
- **Why it matters**: Acts as the ultimate verification that the code is release-ready. It ensures that Metro bundler can successfully resolve all module imports and compile the code into a production-ready package.

---

## ⚙️ Backend CI Jobs

The Backend CI runs five parallel jobs concurrently to validate FastAPI contributions:

### 1. `Code Style (Black)`
- **What it does**: Asserts that all python files comply with PEP 8 layout guidelines via Black check.
- **Why it matters**: Maintains a clean, uniform, and readable codebase layout across all contributors.

### 2. `Lint Check (Flake8)`
- **What it does**: Runs `flake8` specifically targeting critical syntax error checks (`E9`), invalid operations (`F63`), syntax constructs (`F7`), and undefined names (`F82`).
- **Why it matters**: Instantly halts the build if there are syntax errors or missing variable definitions that would cause Python to crash immediately when executing the files.

### 3. `Syntax Compile Check`
- **What it does**: Performs a recursive compile (`compileall`) on all python modules.
- **Why it matters**: Guarantees that every single python file in the directory has valid syntax, even if it is not currently imported by `main.py`.

### 4. `Server Import Boot Check`
- **What it does**: Runs `python -c "import main"`.
- **Why it matters**: Confirms the server can start up and boot its routers and service connections (using placeholder credentials when offline/CI) without raising unhandled exceptions or import errors.

### 5. `Unit Test Suite`
- **What it does**: Executes unit tests in the backend, such as `test_hf_load.py` for testing machine learning weights loading.
- **Why it matters**: Validates that core algorithms (RAG, risk profiling, embeddings) continue to compute output correctly.

---

## 🤖 Auto Assign & Labeling Workflows

We use two mechanisms to automate management of Pull Requests and Issues:

### 1. Pull Request Assignee & Review Request
- **Issue/PR Assignee**: Any opened PR or Issue is automatically assigned to `@indresh404`.
- **Author Guard Review Request**: If a PR is created by another contributor, it automatically requests a review from `@indresh404`. If `@indresh404` is the author of the PR, the workflow automatically skips requesting a review from them to avoid API errors.

### 2. Automatic Path-Based Labels
When a PR is opened, its changed files are inspected and the following labels are automatically applied:
- **`frontend`**: Touches files under the `app/` folder.
- **`backend`**: Touches files under the `backend/` folder.
- **`database`**: Modifies database schemas, supabase connections, or sql configurations.
- **`devops`**: Updates workflows, dockerfiles, lockfiles, or configurations (e.g. `eas.json`).
- **`docs`**: Modifies markdown files or files under the `docs/` folder.

### 3. Issue Keyword-Based Labels
When an issue is opened, its title and body are parsed for keywords, automatically adding matching labels:
- **`bug`**: Contains words like "bug", "error", or "crash".
- **`enhancement`**: Contains words like "feature", "suggest", or "enhancement".
- **`docs`**: Contains words like "docs", "documentation", or "document".
- **`database`**: Contains words like "db", "database", or "sql".
