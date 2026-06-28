# Changelog

All notable changes to the **AbroadEase – Anmeldung Digital Assistant** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
*Placeholder for future changes.*

### Added
- 

### Changed
- 

### Fixed
- 

---

## [1.0.0] - 2026-06-05 (Phase 1 Initial Release)

### Added
- **Backend (Flask):**
  - Created robust JSON data structures for `anmeldung_steps.json`, `documents.json`, and `cities.json`.
  - Implemented `data_loader.py` to safely read JSON files.
  - Implemented `validation.py` to automatically verify data integrity on startup (checking ISO-8601 dates and secure `https://*.de` URLs).
  - Created RESTful API endpoints (`/api/steps`, `/api/documents`, `/api/cityinfo`, `/api/admin/data-status`).
  - Added CORS support to `app.py`.
- **Frontend (React/Vite):**
  - Bootstrapped a modern React application using Vite.
  - Configured **Tailwind CSS v4** for clean, responsive styling.
  - Created an `apiClient.js` service to communicate with the Flask backend.
  - Developed reusable UI components: `ValidationNote`, `StepList`, `DocumentList`, and `CityInfo`.
  - Built a `LandingPage` with disclaimers and a split-panel `WorkflowPage` for easy user interaction.
- **Documentation:**
  - Added a comprehensive `README.md` detailing how to run both the backend and frontend locally, and how to update data.
  - Created this `CHANGELOG.md` to track project history.

### Changed
- Updated `index.css` to use the new `@import "tailwindcss";` syntax required by Tailwind CSS v4.
- Re-configured `postcss.config.js` to correctly utilize `@tailwindcss/postcss`.

### Fixed
- Fixed backend routing logic in `documents.py` and `cityinfo.py` to correctly parse dictionary-based JSON structures, resolving a `500 Internal Server Error`.
- Updated the appointment URL in `cities.json` for Berlin from `https://service.berlin.de/terminvereinbarung/buergeramt/` to `https://service.berlin.de/terminvereinbarung/` to resolve a 404 error from the city portal.
