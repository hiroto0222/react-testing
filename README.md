# React Testing Basics

## Introduction
### Jest and React Testing Library
- Jest is a Javascript testing framework
- RTL is a Javascript testing utility that provides a virtual DOM for testing React components
- Jest and RTL are used in combination for React automated tests

### Types of Tests
- Unit Tests
  - Focus is on testing the individual building blocks of an application such as a class, function or component
  - Each unit is tested in isolation
  - Dependencies are mocked
- Integration Tests
  - Focus is on testing a combination of units and ensuring they work together
- E2E Tests
  - Focus is on testing the entire application flow and ensuring it works as designed from start to finish
  - Involves real UI, backend database, services, etc.
  - Resemble the way a user would interact with the component

RTL Philsophy
> "The more your tests resemble the way your software is used, the more confidence they can give you."
- With RTL, we are not concerned about the implementation details of a component
- Instead we are testing how the component behaves when a user interacts with it
- RTL strikes a balance between unit and E2E tests

## Writing Tests
A simple unit test for a Greet component

```typescript
// Greet.tsx
export const Greet = () => {
  return <div>Hello</div>;
};

// Greet.test.tsx
test("Greet renders correctly", () => {
  render(<Greet />); // virtual dom from RTL
  const textElement = screen.getByText(/hello/i); // grab element from virtual DOM
  expect(textElement).toBeInTheDocument(); // expected assertions using Jest
});
```
