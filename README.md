# React Testing Basics
https://www.youtube.com/watch?v=T2sv8jXoP4s&list=PLC3y8-rFHvwirqe1KHFCHJ0RqNuN61SJd

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

### Writing a Basic Test
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
- test() or it()
- test.only() or fit()
- test.skip() or xit()

Jest Matchers and Jest DOM
```typescript
expect(textElement).toBeInTheDocument(); // assertion with a matcher
```
- Jest Matchers
>https://jestjs.io/ja/docs/using-matchers
- Jest DOM
  - imported in setupTest.ts
>https://github.com/testing-library/jest-dom

### Code Coverage
- Statement coverage: how many of statements have been executed
- Branches coverage: how many of the branches of the control structure have been executed
- Function coverage: how many of the functions defined have been called
- Line coverage: how many of lines of source code have been tested

```json
...
"scripts": {
  ...
  "coverage": "yarn test --coverage --watchAll --collectCoverageFrom='src/components/**/*.{ts,tsx}' --collectCoverageFrom='!src/components/**/*.{types,stories,constants,test,spec}.{ts,tsx}'"
},
...
```

## React Testing
### What to Test?
Basic overview:
- Test component renders
- Test component renders with props
- Test component renders in different states
- Test component reacts to events

What not to test:
- Implementation details (test behavior, not how)
- Third party code
- Code that is not important from a user POV

### RTL Queries
Every test we write generally involves the following:
1. Render the component (rendering method from RTL)
2. Find an element rendered by the component (RTL Queries)
3. Assert against the element found in 2. which will pass or fail the test (expect passing with matcher function from Jest or Jest-DOM)

To find elements on page:
- getBy.. (getAllBy..)
  - return the matching node for a query, and throw a descriptive error if no elements match or if more than one match is found.
- queryBy.. (queryAllBy..)
- findBy.. (findAllBy..)

where .. is the suffix of Role, LabelText, PlaceHolderText, Text, DisplayValue, AltText, Title and TestId

```ByRole```
https://testing-library.com/docs/queries/byrole/
```typescript
const sectionHeading = screen.getByRole("heading", {
  name: "Section 1",
  level: 2,
});
expect(sectionHeading).toBeInTheDocument();
```
- Many semantic elements in HTML have a role (button, checkbox, etc.)
- Should be top preference for query

```ByLabelText```
https://testing-library.com/docs/queries/bylabeltext
```typescript
const nameEle2 = screen.getByLabelText("Name", {
  selector: "input",
});
expect(nameEle2).toBeInTheDocument();
```

```ByPlaceholderText```
https://testing-library.com/docs/queries/byplaceholdertext
```typescript
const nameEle3 = screen.getByPlaceholderText("Fullname");
expect(nameEle3).toBeInTheDocument();
```

```ByText```
https://testing-library.com/docs/queries/bytext
```typescript
const paragraphEle = screen.getByText("All fields are mandatory");
expect(paragraphEle).toBeInTheDocument();
```
- Search for elements that have a text node with textContent matching the given text

```ByDisplayValue```
https://testing-library.com/docs/queries/bydisplayvalue
```typescript
const paragraphEle = screen.getByText("All fields are mandatory");
expect(paragraphEle).toBeInTheDocument();
```
- Returns the input, textarea, or select element that has the matching display value
