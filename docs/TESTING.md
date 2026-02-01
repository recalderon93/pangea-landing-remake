# Testing Guide

This document describes the testing strategy, setup, and best practices for this project.

## Testing Stack

- **Test Runner**: Vitest 3.2
- **Component Testing**: React Testing Library 16.3
- **Assertions**: Vitest (Jest-compatible API)
- **DOM Environment**: jsdom
- **Matchers**: @testing-library/jest-dom

## Test File Organization

### Naming Conventions

- **Unit tests** (utils, logic): `*.test.ts`
- **Component tests** (React): `*.test.tsx`
- **Astro component tests**: `*.spec.ts`

### Location

Tests are **co-located** with source files:

```
src/
├── i18n/
│   ├── t.ts
│   └── t.test.ts              ✅ Co-located
├── components/
│   └── icons/
│       └── socials/
│           ├── SocialIcons.astro
│           └── SocialIcons.spec.ts  ✅ Co-located
└── hooks/
    ├── useCarousel.tsx
    └── useCarousel.test.tsx    ✅ Co-located
```

## Test Environments

Vitest automatically selects the environment based on file extension:

| Pattern      | Environment | Use For                      |
| ------------ | ----------- | ---------------------------- |
| `*.test.ts`  | Node        | Utils, logic, pure functions |
| `*.test.tsx` | jsdom       | React components             |
| `*.spec.ts`  | Node        | Astro components             |

Configured in `vitest.config.ts`:

```typescript
environmentMatchGlobs: [
  ["**/*.test.tsx", "jsdom"],
  ["**/*.spec.ts", "node"],
];
```

## Running Tests

```bash
# Run all tests once
npm test

# Watch mode (re-run on changes)
npm run test:watch

# With coverage
npm run test:coverage

# CI mode
npm run test:ci

# Run specific test file
npm test -- src/i18n/t.test.ts

# Run tests matching pattern
npm test -- --grep "ContactUs"
```

## Writing Tests

### 1. Unit Tests (Pure Functions)

**File**: `*.test.ts`

```typescript
// src/utils/formatDate.ts
export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

// src/utils/formatDate.test.ts
import { describe, test, expect } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  test("should format date to YYYY-MM-DD", () => {
    const date = new Date("2024-01-15T10:30:00Z");
    expect(formatDate(date)).toBe("2024-01-15");
  });

  test("should handle edge cases", () => {
    const date = new Date("2024-12-31T23:59:59Z");
    expect(formatDate(date)).toBe("2024-12-31");
  });
});
```

### 2. Component Tests (React)

**File**: `*.test.tsx`

```typescript
// src/components/Button.test.tsx
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  test('should render with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  test('should call onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    await userEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### 3. Hook Tests

**File**: `*.test.tsx`

```typescript
// src/hooks/useCounter.test.tsx
import { describe, test, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

describe("useCounter", () => {
  test("should initialize with default value", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  test("should increment count", () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test("should initialize with custom value", () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });
});
```

### 4. Astro Component Tests

**File**: `*.spec.ts`

```typescript
// src/components/icons/socials/SocialIcons.spec.ts
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, test, expect } from "vitest";
import SocialIcon from "./SocialIcons.astro";

describe("SocialIcons", () => {
  test("should render Instagram icon", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SocialIcon, {
      props: { type: "instagram" },
    });

    expect(result).toContain('data-testid="instagram-icon"');
  });

  test("should render LinkedIn icon", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SocialIcon, {
      props: { type: "linkedin" },
    });

    expect(result).toContain('data-testid="linkedin-icon"');
  });
});
```

### 5. Integration Tests (Complex Flows)

**File**: `*.test.tsx`

```typescript
// src/features/ContactUs/ContactUsForm.test.tsx
import { describe, test, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactUsForm from './ContactUsForm';

describe('ContactUsForm - Integration', () => {
  test('should complete full form flow', async () => {
    const onSubmit = vi.fn();
    render(<ContactUsForm onSubmit={onSubmit} locale="en" />);

    // Step 1: Fill name
    await userEvent.type(
      screen.getByLabelText('Full Name'),
      'John Doe'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));

    // Step 2: Fill email
    await userEvent.type(
      screen.getByLabelText('Email'),
      'john@example.com'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Next' }));

    // ... more steps ...

    // Final step: Submit
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        fullName: 'John Doe',
        email: 'john@example.com',
        // ... other fields
      });
    });
  });
});
```

## Testing Patterns

### Arrange-Act-Assert (AAA)

```typescript
test("should do something", () => {
  // Arrange: Set up test data and conditions
  const input = "test";
  const expected = "TEST";

  // Act: Execute the code being tested
  const result = toUpperCase(input);

  // Assert: Verify the result
  expect(result).toBe(expected);
});
```

### Testing User Interactions

```typescript
import userEvent from '@testing-library/user-event';

test('should handle user input', async () => {
  render(<TextInput />);
  const input = screen.getByRole('textbox');

  // Type text
  await userEvent.type(input, 'Hello');
  expect(input).toHaveValue('Hello');

  // Clear text
  await userEvent.clear(input);
  expect(input).toHaveValue('');

  // Click button
  await userEvent.click(screen.getByRole('button'));
});
```

### Testing Async Code

```typescript
test('should load data', async () => {
  render(<DataComponent />);

  // Wait for element to appear
  const element = await screen.findByText('Loaded data');
  expect(element).toBeInTheDocument();

  // Or use waitFor
  await waitFor(() => {
    expect(screen.getByText('Loaded data')).toBeInTheDocument();
  });
});
```

### Mocking Functions

```typescript
import { vi } from 'vitest';

test('should call callback', () => {
  const callback = vi.fn();

  render(<Button onClick={callback}>Click</Button>);
  fireEvent.click(screen.getByRole('button'));

  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith(expect.any(Object));
});
```

### Mocking Modules

```typescript
import { vi } from "vitest";

// Mock entire module
vi.mock("@/api/client", () => ({
  fetchData: vi.fn(() => Promise.resolve({ data: "mocked" })),
}));

// Mock specific function
vi.mock("@/utils/date", () => ({
  getCurrentDate: vi.fn(() => new Date("2024-01-01")),
}));
```

## Query Priority

Use queries in this order (React Testing Library best practices):

1. **Accessible queries** (preferred):

   - `getByRole` - Buttons, links, inputs, etc.
   - `getByLabelText` - Form fields
   - `getByPlaceholderText` - Inputs with placeholders
   - `getByText` - Non-interactive elements
   - `getByDisplayValue` - Form elements with values

2. **Semantic queries**:

   - `getByAltText` - Images
   - `getByTitle` - Elements with title attribute

3. **Test IDs** (last resort):
   - `getByTestId` - When no other option works

**Example**:

```typescript
// ✅ Good: Use accessible queries
screen.getByRole("button", { name: "Submit" });
screen.getByLabelText("Email");
screen.getByText("Welcome");

// ❌ Avoid: Test IDs (unless necessary)
screen.getByTestId("submit-button");
```

## Assertions

### Common Matchers

```typescript
// Equality
expect(value).toBe(expected); // Strict equality (===)
expect(value).toEqual(expected); // Deep equality

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThan(10);
expect(value).toBeCloseTo(0.3); // Floating point

// Strings
expect(string).toMatch(/pattern/);
expect(string).toContain("substring");

// Arrays
expect(array).toContain(item);
expect(array).toHaveLength(3);

// Objects
expect(object).toHaveProperty("key");
expect(object).toMatchObject({ key: "value" });

// Functions
expect(fn).toHaveBeenCalled();
expect(fn).toHaveBeenCalledTimes(2);
expect(fn).toHaveBeenCalledWith(arg1, arg2);
```

### DOM Matchers (jest-dom)

```typescript
// Presence
expect(element).toBeInTheDocument();
expect(element).toBeVisible();
expect(element).toBeEmptyDOMElement();

// State
expect(element).toBeDisabled();
expect(element).toBeEnabled();
expect(element).toBeChecked();
expect(element).toHaveValue("text");

// Attributes
expect(element).toHaveAttribute("href", "/path");
expect(element).toHaveClass("active");
expect(element).toHaveStyle({ color: "red" });

// Content
expect(element).toHaveTextContent("Hello");
expect(element).toContainElement(child);
```

## Coverage

### Running Coverage

```bash
# Generate coverage report
npm run test:coverage

# View HTML report
open coverage/index.html
```

### Coverage Goals

| Type        | Target         |
| ----------- | -------------- |
| Utils/Hooks | 90%+           |
| Components  | 80%+           |
| Integration | Critical paths |

### Viewing Coverage

Coverage reports are generated in `coverage/`:

```
coverage/
├── index.html          # HTML report (open in browser)
├── lcov.info           # LCOV format (for CI tools)
└── coverage-final.json # JSON format
```

## Best Practices

### 1. Test Behavior, Not Implementation

```typescript
// ❌ Bad: Testing implementation details
test('should set state to true', () => {
  const { result } = renderHook(() => useToggle());
  act(() => result.current.toggle());
  expect(result.current.isOpen).toBe(true);
});

// ✅ Good: Testing behavior
test('should show content when toggled', () => {
  render(<Accordion />);
  userEvent.click(screen.getByRole('button'));
  expect(screen.getByText('Content')).toBeVisible();
});
```

### 2. Keep Tests Simple

```typescript
// ❌ Bad: Complex setup
test('should work', () => {
  const props = { ...defaultProps, ...overrides, ...moreStuff };
  const wrapper = createWrapper(props);
  const result = wrapper.find('.thing').at(0).prop('value');
  expect(result).toBe('expected');
});

// ✅ Good: Simple and clear
test('should display user name', () => {
  render(<UserProfile name="John" />);
  expect(screen.getByText('John')).toBeInTheDocument();
});
```

### 3. Use Descriptive Test Names

```typescript
// ❌ Bad: Vague
test('works', () => { ... });
test('test 1', () => { ... });

// ✅ Good: Descriptive
test('should display error message when email is invalid', () => { ... });
test('should disable submit button while loading', () => { ... });
```

### 4. One Assertion Per Test (When Possible)

```typescript
// ❌ Bad: Multiple unrelated assertions
test('button', () => {
  render(<Button />);
  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByRole('button')).toHaveClass('btn');
  expect(screen.getByRole('button')).not.toBeDisabled();
});

// ✅ Good: Separate tests
test('should render button', () => {
  render(<Button />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('should have correct class', () => {
  render(<Button />);
  expect(screen.getByRole('button')).toHaveClass('btn');
});
```

### 5. Avoid Testing Third-Party Libraries

```typescript
// ❌ Bad: Testing React Hook Form
test('should validate with react-hook-form', () => {
  // Testing library internals
});

// ✅ Good: Testing your validation logic
test('should show error for invalid email', () => {
  render(<EmailInput />);
  userEvent.type(screen.getByRole('textbox'), 'invalid');
  expect(screen.getByText('Invalid email')).toBeInTheDocument();
});
```

## Common Pitfalls

### 1. Not Awaiting Async Operations

```typescript
// ❌ Bad: Missing await
test('should load data', () => {
  render(<DataComponent />);
  expect(screen.getByText('Loaded')).toBeInTheDocument(); // Fails!
});

// ✅ Good: Await async operation
test('should load data', async () => {
  render(<DataComponent />);
  expect(await screen.findByText('Loaded')).toBeInTheDocument();
});
```

### 2. Not Cleaning Up

```typescript
// ❌ Bad: Timers not cleaned up
test("should debounce", () => {
  vi.useFakeTimers();
  // ... test code ...
  // Forgot to restore timers!
});

// ✅ Good: Clean up
test("should debounce", () => {
  vi.useFakeTimers();
  // ... test code ...
  vi.restoreAllMocks();
});
```

### 3. Querying Too Early

```typescript
// ❌ Bad: Query before render
const button = screen.getByRole('button');
render(<Component />);

// ✅ Good: Query after render
render(<Component />);
const button = screen.getByRole('button');
```

## Testing Checklist

Before marking a feature as complete:

- [ ] Unit tests for utilities and helpers
- [ ] Component tests for UI components
- [ ] Integration tests for complex flows
- [ ] Edge cases covered
- [ ] Error states tested
- [ ] Loading states tested
- [ ] Accessibility tested (roles, labels)
- [ ] Coverage meets targets (80%+)

## Further Reading

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
