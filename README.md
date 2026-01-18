Contract Management Platform (Frontend)

A frontend-only Contract Management Platform built from scratch to demonstrate product thinking, UI design, controlled state management, and clean code architecture.
This project simulates how contracts are created from reusable templates (Blueprints) and managed through a strict lifecycle  without relying on a backend.

 Live Demo
Runs locally using mocked data and demo authentication.
Tech Stack
React (Vite)
TypeScript
Context API for state management
Inline CSS (no external UI library)
Mocked persistence (in-memory state)
Backend was intentionally excluded as per assignment instructions.

 Key Features
1 Blueprint Management
Create reusable Blueprints (contract templates)
Each blueprint supports configurable fields:
Text
Date
Signature
Checkbox
Field metadata stored:
Type
Label
Position (basic coordinates)
Blueprints are stored in mocked local state

2️ Contract Creation from Blueprint
Select any existing blueprint
Generate a contract from it
Contract automatically inherits all fields from the blueprint
Users can fill contract fields in a View Contract modal
Editing is disabled when a contract is Locked or Revoked

3️ Contract Lifecycle (Strictly Enforced)
Each contract follows this lifecycle:
Copy code

Created → Approved → Sent → Signed → Locked
Revoked can occur after:
Created
Sent
Rules enforced:
 No skipping lifecycle steps
 Locked contracts cannot be edited
 Revoked contracts cannot proceed further
UI only shows valid actions based on current state

4️ Contract Dashboard
Tabular contract listing
Filter contracts by status:
All
Active
Pending
Signed
Dashboard shows:
Contract name
Blueprint name
Status (with color badges)
Created date
Contextual action buttons
Summary cards show total counts (Total, Active, Pending, Signed)

5️ Authentication (Mocked)
Frontend-only mock authentication
No backend or real user management
Demo Credentials
Copy code

Email: admin@gmail.com
Password: admin123
Auto-login for Evaluators
“Continue as Demo User” button allows instant access
Designed to make evaluation frictionless

 UI Highlights
Clean dashboard layout with sidebar navigation
Status badges for quick visual clarity
Modal-based contract viewing and field filling
Premium login UI with:
Validation
Password show/hide
Loading animation
Demo login option

📁 Project Structure

src/
│
├── components/
│   ├── blueprint/
│   │   └── BlueprintBuilder.tsx
│   │
│   ├── contract/
│   │   └── ContractPage.tsx
│   │
│   ├── common/
│   │   └── ContractViewModal.tsx
│   │
│   └── LoginMock.tsx
│
├── store/
│   ├── BlueprintContext.tsx
│   └── ContractContext.tsx
│
├── App.tsx
└── main.tsx

 Architecture & Design Decisions
Context API was chosen for global state (Blueprints & Contracts) due to predictable data flow and simplicity.
Lifecycle rules are enforced both in UI and logic, preventing invalid state transitions.
Components are grouped by responsibility (blueprint, contract, common).
No external UI library used to demonstrate core React + CSS skills.
Modals are used instead of routing to keep interaction focused and simple.

Assumptions & Limitations
No backend or database all data is stored in memory
Page refresh will reset data
Authentication is mocked (clearly documented)
Field positioning is basic (x, y values, no drag-and-drop)

Setup Instructions

1. Clone Repository
git clone <https://github.com/Yashfeen-Fatma13/Contract-Management-Platform>
cd contract-management-platform
2. Install Dependencies
npm install
3. Run Application
npm run dev
4. Open in Browser
http://localhost:5173

 How to Test as Evaluator

Option 1: Use demo credentials
admin@gmail.com / admin123
Option 2: Click “Continue as Demo User” on login screen

 Conclusion
This project demonstrates:
Clear product thinking
Controlled contract lifecycle management
Reusable UI and state architecture
Practical frontend engineering without backend dependency
It is designed to be easy to evaluate, easy to extend, and easy to understand.
