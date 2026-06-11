# DevOps Local Verification Commands

This document lists all the CLI commands you can run locally to replicate the exact verification checks executed by our GitHub Actions CI pipelines.

---

## 📱 Frontend (App) Checks

Before committing frontend changes, navigate to the `app/` folder:
```bash
cd app
```

### 1. Dependency Sync
Ensure your dependencies are clean and match the lockfile:
```bash
npm ci
```

### 2. Security Audit
Scan installed packages for critical vulnerabilities:
```bash
npm audit --audit-level=critical
```

### 3. TypeScript Compilation check
Verify that there are no static typing errors:
```bash
npx tsc --noEmit
```

### 4. Code Style & Quality (ESLint)
Check for lint violations and code consistency:
```bash
npm run lint
```

### 5. Production Bundling Verification
Simulate web production compilation to verify that all imports resolve and bundle successfully:
```bash
npx expo export --platform web
```

---

## ⚙️ Backend Checks

Before committing backend changes, navigate to the `backend/` folder:
```bash
cd backend
```

### 1. Dependency Install
Sync environment dependencies (recommend using a virtual environment like `venv`):
```bash
pip install -r requirements.txt
```

### 2. Formatting Check (Black)
Ensure python files conform to the Black code formatter standards:
```bash
pip install black
black --check .
```
*(To auto-format files, you can run `black .` without the `--check` flag).*

### 3. Syntax & Variable Linting (Flake8)
Verify that there are no syntax errors or undefined variables:
```bash
pip install flake8
flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
```

### 4. Recursive Compilation Check
Recursively compile all python modules to check for syntax errors:
```python
python -m compileall .
```

### 5. Server Import Boot Check
Verify that the FastAPI main script imports successfully without crashing:
```bash
python -c "import main"
```

### 6. Run Test Suite
Run tests (if available):
```bash
python test_hf_load.py
```
