Platform for Contract Management (Frontend)

A front-end-only contract management platform that was created from the ground up to showcase clean code architecture, controlled state management, UI design, and product thinking.
This project mimics the process of creating contracts using reusable templates (Blueprints) and managing them through a rigorous lifetime without the need for a backend.

 Real-Time Demo
uses demo authentication and fictitious data to run locally.
Tech Stack TypeScript React (Vite)
Context API for managing states
Inline CSS (no external user interface library)
Persistence mocking (in-memory state)
Backend was purposefully left out in accordance with the assignment guidelines.

 Important Features
 
1. Management of Blueprints
Make reusable contract templates, or blueprints.
Configurable fields are supported by every blueprint:
Date of Text
Signature
A checkbox
Type, Label, Position (basic coordinates), and other field details are recorded.
The mocked local state is where blueprints are kept.

2. Creating a Contract from the Blueprint
Choose any current blueprint.
Make a contract out of it.
All fields from the blueprint are automatically inherited by the contract.
In a View Contract popup, users can complete contract fields.
When a contract is locked or revoked, editing is not possible.

3. Strictly Enforced Contract Lifecycle
Every contract adheres to this lifecycle:

Designed, authorized, sent, signed, and locked
Revocation may take place following:
Sent Rules were created and enforced:
 Don't skip any lifecycle steps
 Contracts that are locked cannot be changed.
 Contracts that have been revoked cannot continue.
Based on the current condition, the UI only displays actions that are valid.

4. Contract Dashboard
Listing of tabular contracts
Sort contracts according to their status:
Every Active Pending Signed
The dashboard displays:
Name of contract
Name of the blueprint
Status (using color-coded badges)
Date of creation
Action buttons that are contextual
Total counts (Total, Active, Pending, Signed) are displayed on summary cards.

5. Verification (Mocked)
Mock authentication solely on the front end
Absence of a backend or actual user management
Sample Credentials
Copy the code

Password: admin123; email: admin@gmail.com
Evaluators' auto-login
The "Continue as Demo User" button provides immediate access.
Designed to minimize friction in evaluation

 UI Highlights
Sidebar navigation and a simple dashboard layout
Status badges for easy visual comprehension
Modal-based field filling and contract viewing
High-end login interface with: Verification
Show/hide the password and the loading animation
Demo option for logging in

 Architecture and Design Choices
Because of its simplicity and reliable data flow, the Context API was used for the global state (Blueprints & Contracts).
In order to prevent improper state transitions, lifecycle rules are followed in both logic and user interface.
The components (blueprint, contract, common) are arranged according to their respective responsibilities.
Core React + CSS skills were demonstrated without the usage of an extra UI package.
To keep interaction straightforward and focused, modals are employed in place of routing.

Limitations and Assumptions
There is no database or backend; all data is kept in memory.
Data will be reset upon page refresh.
The mocking of authentication is well known.
Simple field positioning (x, y values, no drag-and-drop)

Instructions for Setting Up

1. Clone the repository: git clone <https://github.com/Yashfeen-Fatma13/Contract-Management-Platform> cd contract-management-platform
2. Use npm install to install dependencies
3. Launch the application using npm run dev
4. Launch in a browser
http://localhost:5173

 How to Conduct Evaluations

Option 1: Use admin@gmail.com or admin123 as demo credentials.
Option 2: On the login screen, select "Continue as Demo User."

 In conclusion
This project illustrates:
Thinking clearly about the product
Managed contract lifecycle
Reusable state architecture and user interface
Frontend engineering in practice without reliance on the backend
It is made to be simple to assess, expand, and comprehend.
