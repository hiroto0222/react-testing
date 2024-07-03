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

## RTL Queries
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
- Returns the input, textarea, or select element that has the matching display value

```ByAltText```
https://testing-library.com/docs/queries/byalttext

```ByTitle```
https://testing-library.com/docs/queries/bytitle

```ByTestId```
https://testing-library.com/docs/queries/bytestid

### Priority Order for Queries
"Your test should resemble how users interact with your code as much as possible"
1. getByRole
2. getByLabelText
3. getByPlaceHolderText
4. getByText
5. getByDisplayValue
6. getByAltText
7. getByTitle
8. getByTestId

### Query Multiple Elements
```getAllByRole```
```typescript
describe("Skills", () => {
  const skills = ["HTML", "CSS", "JavaScript"];

  it("renders correctly", () => {
    render(<Skills skills={skills} />);

    const listElement = screen.getByRole("list");
    expect(listElement).toBeInTheDocument();
  });

  it("renders a list of skills", () => {
    render(<Skills skills={skills} />);

    const listItemElements = screen.getAllByRole("listitem");
    expect(listItemElements).toHaveLength(skills.length);
  });
});
```
### QueryBy
- Returns the matching node for a query, and return null if no elements match
- Useful for asserting an element that is not present
```typescript
it("doesnt render learning button when not logged in", () => {
  render(<Skills skills={skills} />);

  const startLearningButton = screen.queryByRole("button", {
    name: "Start Learning",
  });
  expect(startLearningButton).not.toBeInTheDocument();
});
```

### FindBy
- What if elements are not present in the DOM to begin with, but after some time. ie: fetched data.
- Returns a promise which resolves when an element is found which matches the given query. Default timeout of 1000ms.
```typescript
it("eventually renders start learning button", async () => {
  render(<Skills skills={skills} />);

  const startLearningButton = await screen.findByRole("button", {
    name: "Start Learning",
  });
  expect(startLearningButton).toBeInTheDocument();
});
```

### Testing Playground
https://testing-playground.com/


## User Interactions
- user-event library
  - Companion library for Testing Library
  - Alternative is fireEvent. However, user-event simulates full interactions, which may fire additional checks along the way.

```typescript
it("renders a count of 1 after clicking the increment button once", async () => {
  user.setup();
  render(<Counter />);

  const incrementButton = screen.getByRole("button", {
    name: "Increment",
  });
  await user.click(incrementButton);

  const countEle = screen.getByRole("heading");
  expect(countEle).toHaveTextContent("1");
});

it("renders a count of 10 after typing 10 in amount input and clicking the set button", async () => {
  user.setup();
  render(<Counter />);

  const amountInput = screen.getByRole("spinbutton");
  await user.type(amountInput, "10");
  expect(amountInput).toHaveValue(10);

  const setButton = screen.getByRole("button", {
    name: "Set",
  });
  await user.click(setButton);
  const countEle = screen.getByRole("heading");
  expect(countEle).toHaveTextContent("10");
});
```

## Providers
```typescript
describe("MuiMode", () => {
  it("renders text correctly", () => {
    render(<MuiMode />, {
      wrapper: AppProviders,
    });
    const headingElement = screen.getByRole("heading");
    expect(headingElement).toHaveTextContent("dark mode");
  });
});
```

## Custom Render Functions
Wrapper across all tests. Write a custom render function.
