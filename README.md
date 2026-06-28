# AbroadEase – Anmeldung Digital Assistant

Welcome to the AbroadEase project repository! This is Phase 1 of a larger platform aimed at helping international students and workers navigate German bureaucracy.

This phase focuses exclusively on the **Anmeldung (city registration)** workflow, providing step-by-step guidance, required documents, and official appointment links.

## Project Structure

The project is structured as a full-stack web application:

- **`backend/`**: A Flask-based REST API that serves data and performs automated URL validation on startup.
- **`frontend/`**: A React application built with Vite and TailwindCSS that consumes the API and presents the information in a clean, step-by-step UI.

## Data and Validation

A key feature of AbroadEase is **data reliability**. All informational data is stored in JSON files under `backend/data/`:
- `anmeldung_steps.json`
- `documents.json`
- `cities.json`

Every dataset must include a `last_validated_at` timestamp and a `source_url`. The backend automatically validates this data upon startup to ensure all URLs point to official German domains (`*.de`) and use HTTPS.

### How to Update Data
1. Open the relevant JSON file in `backend/data/`.
2. Update the steps, documents, or city links.
3. Update the `last_validated_at` timestamp to the current ISO-8601 date.
4. Update the `source_url` to the official government page you verified the information against.

## Running the Application Locally

### 1. Backend Setup
Requires Python 3.x.

```bash
cd backend
pip install -r requirements.txt
flask run
```
The backend API will be available at `http://127.0.0.1:5000/`.

### 2. Frontend Setup
Requires Node.js and npm.

```bash
cd frontend
npm install
npm run dev
```
The React frontend will be available at `http://127.0.0.1:5173/` (or the port specified by Vite).

## Future Extensions
This is Phase 1. Future iterations are planned to include:
- Visas and Residence Permits
- Blocked Accounts guidance
- Health Insurance comparisons
- Automated Reminders and User Accounts
- Multilingual Support
