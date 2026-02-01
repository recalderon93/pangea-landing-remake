# Testing Rules (Optional)

Load this rule when writing tests.

## Vitest Configuration

### Test Environments

Vitest automatically selects environment based on file extension:

| Pattern      | Environment | Use For                      |
| ------------ | ----------- | ---------------------------- |
| `*.test.ts`  | Node        | Utils, logic, pure functions |
| `*.test.tsx` | jsdom       | React components             |
| `*.spec.ts`  | Node        | Astro components             |

### Running Tests

```bash
# Run all tests once
npm test

# Watch mode (re-run on changes)
npm run test:watch

# With coverage
npm run test:coverage

# CI mode
npm run test:ci

# Run specific test
npm test -- src/i18n/t.test.ts

# Run tests matching pattern
npm test -- --grep "ContactUs"
```

## React Testing Library

### Basic Component Test

```typescript
import { describe, test, expect } from 'vitest';
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

### Query Priority

Use queries in this order (most to least preferred):

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

```typescript
// ✅ Good: Use accessible queries
screen.getByRole("button", { name: "Submit" });
screen.getByLabelText("Email");
screen.getByText("Welcome");

// ❌ Avoid: Test IDs (unless necessary)
screen.getByTestId("submit-button");
```

### User Interactions

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

  // Select option
  await userEvent.selectOptions(
    screen.getByRole('combobox'),
    'option-value'
  );
});
```

### Async Testing

```typescript
import { waitFor } from '@testing-library/react';

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

## Hook Testing

```typescript
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

## Astro Component Testing

```typescript
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
});
```

## Mocking

### Mock Functions

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

### Mock Modules

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

### Mock Zustand Store

```typescript
import { vi } from "vitest";
import { useExampleStore } from "@store/example/store";

beforeEach(() => {
  // Reset store before each test
  useExampleStore.setState({ count: 0, name: "" });
});

test("should use store", () => {
  const { result } = renderHook(() => useExampleStore());
  expect(result.current.count).toBe(0);
});
```

## Test Structure

### AAA Pattern (Arrange-Act-Assert)

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

### Descriptive Test Names

```typescript
// ❌ Bad: Vague
test('works', () => { ... });
test('test 1', () => { ... });

// ✅ Good: Descriptive
test('should display error message when email is invalid', () => { ... });
test('should disable submit button while loading', () => { ... });
```

### One Concept Per Test

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

## Common Matchers

### Equality

```typescript
expect(value).toBe(expected); // Strict equality (===)
expect(value).toEqual(expected); // Deep equality
expect(value).toStrictEqual(expected); // Strict deep equality
```

### Truthiness

```typescript
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();
```

### Numbers

```typescript
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThan(10);
expect(value).toBeCloseTo(0.3); // Floating point
```

### Strings

```typescript
expect(string).toMatch(/pattern/);
expect(string).toContain("substring");
```

### Arrays

```typescript
expect(array).toContain(item);
expect(array).toHaveLength(3);
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

### 3. Avoid Testing Third-Party Libraries

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

### 4. Clean Up After Tests

```typescript
import { beforeEach, afterEach } from "vitest";

beforeEach(() => {
  // Setup before each test
  vi.useFakeTimers();
});

afterEach(() => {
  // Cleanup after each test
  vi.restoreAllMocks();
  vi.clearAllTimers();
});
```

### 5. Use Descriptive Variables

```typescript
// ❌ Bad: Unclear variables
test('test', () => {
  const x = render(<Button />);
  const y = screen.getByRole('button');
  expect(y).toBeInTheDocument();
});

// ✅ Good: Clear variables
test('should render button', () => {
  render(<Button />);
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
});
```

## Coverage Goals

| Type        | Target         |
| ----------- | -------------- |
| Utils/Hooks | 90%+           |
| Components  | 80%+           |
| Integration | Critical paths |

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

### 2. Querying Too Early

```typescript
// ❌ Bad: Query before render
const button = screen.getByRole('button');
render(<Component />);

// ✅ Good: Query after render
render(<Component />);
const button = screen.getByRole('button');
```

### 3. Not Cleaning Up Timers

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

## Reference

See `docs/TESTING.md` for complete testing guide.
