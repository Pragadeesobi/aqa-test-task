# QA Automation Tests for Vikunja

This project contains automated tests for the Vikunja to-do application using TypeScript and Playwright, focusing on Teams functionality.

## Playwright Version
- Playwright: 1.58.2

## Prerequisites
- Node.js 18+
- Docker and Docker Compose (for running the application)

## Setup
1. Ensure the Vikunja application is running on http://localhost:8080
2. Install dependencies: `npm install`
3. Install Playwright browsers: `npx playwright install`

## Test Scope and Plan
### What to Cover and Why
- **User Authentication**: Registration and login are fundamental to access the app. Covers user onboarding and security.
- **CRUD for Teams**: Teams are a key feature in Vikunja. Implements Create, Read, Update, Delete to test full lifecycle, including name updates, member management, and deletion with confirmation.
- **UI Tests**: Simulate user interactions for realistic testing, including modal confirmations and form validations.

### Minimal Coverage
- User registration and login
- CRUD for teams (Create, Read, Update, Delete)

### Advanced Features Implemented
- **Page Object Model**: TeamsPage class with granular methods for all team operations, including error handling and logging.
- **Utility Functions**: uiUtils.ts with reusable functions like clickAndWait, fillAndAssert, and assertToast for consistent interactions.
- **Centralized Locators**: teamLocators.ts for all selectors, making maintenance easy.
- **Error Handling**: Try-catch blocks in all page methods with console logging for debugging.
- **Assertions**: Custom assertions for team visibility, edit views, and success toasts.
- **Modal Handling**: Support for confirmation dialogs, e.g., "Do it!" button for team deletion.
- **Environment Configuration**: .env file for base URL and credentials.
- **Global Setup**: hooks/globalSetup.ts for initial user registration.
- **Test Structure**: Fixtures for login, beforeEach setup, and individual CRUD tests.
- **HTML Reporting**: Playwright's built-in reporting.
- **CI-Friendly**: Commands for headless and headed runs.

## Running Tests
- Run all tests: `npm test`
- Run tests in headed mode: `npm run test:headed`
- Run tests with UI: `npm run test:ui`
- Generate report: `npx playwright show-report`
- Run specific test: `npx playwright test tests/teams.spec.ts --grep "test name"`

## Project Structure
- `tests/teams.spec.ts`: Test cases for team CRUD operations
- `pages/teamsPage.ts`: Page Object Model for Teams page interactions
- `utils/uiUtils.ts`: Utility functions for common UI actions
- `utils/apiHelper.ts`: API helper for backend interactions (if needed)
- `test-data/teamLocators.ts`: Centralized selectors for team elements
- `hooks/globalSetup.ts`: Global setup for user registration
- `fixtures.ts`: Test fixtures for login and setup
- `.env`: Environment variables for URL and credentials
- `playwright.config.ts`: Playwright configuration with headed default for debugging

## Implemented Features
- **Create Team**: Fill name and description, create, and verify.
- **Read Team**: Assert team visibility in list and edit view.
- **Update Team**: Edit team name and description, save, and verify changes.
- **Delete Team**: Click delete, confirm in modal, and verify removal.
- **Add Team Member**: Search and add users to teams.
- **Leave Team**: Remove self from team.
- **Assertions**: Team existence, edit headers, descriptions, members, success toasts.
- **Error Handling**: Comprehensive logging for all operations.

## Notes
- Tests are designed to be robust with retries and waits.
- Locators are updated based on actual HTML structure for accuracy.
- The project demonstrates advanced Playwright usage with POM and utilities.