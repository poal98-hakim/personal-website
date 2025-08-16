# Integration Tests

This folder contains black-box integration tests that validate complete user workflows and data flows through the application.

## Test Files

### `home-flow.integration.test.ts`

Tests the complete home page flow:

- Profile data loading and display

### `about-flow.integration.test.ts`

Tests the complete about page flow:

- Personal information integration
- Technologies loading and duplication for scrolling
- Social links integration

### `projects-flow.integration.test.ts`

Tests the complete projects list flow:

- Projects list page with professional and personal projects
- Data consistency between list and detail views

### `contact-flow.integration.test.ts`

Tests the complete contact page flow:

- Contact information display
- Social cards/links integration
- Icon validation and URL format checking

## Testing Approach

These tests use a **black-box testing approach** that:

- Tests entire presenter flows rather than individual units
- Validates complete user scenarios and data flows
- Tests integration between repositories, services, and presenters
- Ensures proper data structure for UI components
