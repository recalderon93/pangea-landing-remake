# State Management

This document explains state management patterns in this project using Zustand.

## Overview

This project uses **Zustand** for minimal, lightweight client-side state management.

**When to use Zustand**:

- State shared across multiple components
- State that persists across route changes
- Client-side only state (not SEO-critical)

**When NOT to use Zustand**:

- Form state (use React Hook Form)
- Server-side data (use Astro props)
- Component-local state (use useState)

## Current Stores

### Header Store

**File**: `src/store/header/store.ts`

**Purpose**: Manages header UI state (mobile menu, solutions dropdown)

**State**:

```typescript
{
  showMobileMenu: boolean;
  showSolutions: boolean;
  showMobileSolutions: boolean;
}
```

**Actions**:

```typescript
{
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  openSolutions: () => void;
  closeSolutions: () => void;
  toggleSolutions: () => void;
  openMobileSolutions: () => void;
  closeMobileSolutions: () => void;
  toggleMobileSolutions: () => void;
}
```

## Store Pattern

### Basic Structure

```typescript
// src/store/example/store.ts
import { create } from "zustand";

// 1. Define state type
export type ExampleState = {
  count: number;
  name: string;
};

// 2. Define actions type
export type ExampleActions = {
  actions: {
    increment: () => void;
    decrement: () => void;
    setName: (name: string) => void;
    reset: () => void;
  };
};

// 3. Combine types
export type ExampleStore = ExampleState & ExampleActions;

// 4. Create store
export const useExampleStore = create<ExampleStore>()((set) => ({
  // Initial state
  count: 0,
  name: "",

  // Actions
  actions: {
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    setName: (name) => set({ name }),
    reset: () => set({ count: 0, name: "" }),
  },
}));

// 5. Create selector hooks (recommended)
export const useCount = () => useExampleStore((state) => state.count);
export const useName = () => useExampleStore((state) => state.name);
export const useExampleActions = () =>
  useExampleStore((state) => state.actions);
```

### Why This Pattern?

1. **Type Safety**: Full TypeScript support
2. **Separation**: State and actions are clearly separated
3. **Selectors**: Prevent unnecessary re-renders
4. **Testability**: Easy to test actions and state
5. **Consistency**: Same pattern across all stores

## Using Stores

### In Components

```typescript
import { useCount, useExampleActions } from "@store/example/store";

function Counter() {
  // Subscribe to specific state (re-renders only when count changes)
  const count = useCount();

  // Get actions (never causes re-render)
  const { increment, decrement } = useExampleActions();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

### Multiple State Values

```typescript
function Profile() {
  // Subscribe to multiple values
  const count = useCount();
  const name = useName();
  const { setName, reset } = useExampleActions();

  return (
    <div>
      <p>{name} has {count} points</p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Direct Store Access

```typescript
// ❌ Avoid: Subscribes to entire store (re-renders on any change)
function BadComponent() {
  const store = useExampleStore();
  return <div>{store.count}</div>;
}

// ✅ Good: Subscribe to specific value
function GoodComponent() {
  const count = useCount();
  return <div>{count}</div>;
}
```

## Advanced Patterns

### Computed Values

```typescript
export const useExampleStore = create<ExampleStore>()((set, get) => ({
  count: 0,
  multiplier: 2,

  actions: {
    // Computed value using get()
    getTotal: () => {
      const { count, multiplier } = get();
      return count * multiplier;
    },
  },
}));

// Usage
const { getTotal } = useExampleActions();
const total = getTotal(); // count * multiplier
```

### Async Actions

```typescript
export const useExampleStore = create<ExampleStore>()((set) => ({
  data: null,
  isLoading: false,
  error: null,

  actions: {
    fetchData: async () => {
      set({ isLoading: true, error: null });

      try {
        const response = await fetch("/api/data");
        const data = await response.json();
        set({ data, isLoading: false });
      } catch (error) {
        set({ error: error.message, isLoading: false });
      }
    },
  },
}));
```

### Middleware (Persistence)

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useExampleStore = create<ExampleStore>()(
  persist(
    (set) => ({
      count: 0,
      actions: {
        increment: () => set((state) => ({ count: state.count + 1 })),
      },
    }),
    {
      name: "example-storage", // localStorage key
    },
  ),
);
```

### Immer Middleware (Mutable Updates)

```typescript
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useExampleStore = create<ExampleStore>()(
  immer((set) => ({
    todos: [],
    actions: {
      addTodo: (text) =>
        set((state) => {
          // Mutable update (Immer handles immutability)
          state.todos.push({ id: Date.now(), text, done: false });
        }),
      toggleTodo: (id) =>
        set((state) => {
          const todo = state.todos.find((t) => t.id === id);
          if (todo) todo.done = !todo.done;
        }),
    },
  })),
);
```

## Testing Stores

### Unit Tests

```typescript
// src/store/example/store.test.ts
import { describe, test, expect, beforeEach } from "vitest";
import { useExampleStore } from "./store";

describe("ExampleStore", () => {
  beforeEach(() => {
    // Reset store before each test
    useExampleStore.setState({ count: 0, name: "" });
  });

  test("should increment count", () => {
    const { increment } = useExampleStore.getState().actions;

    increment();

    expect(useExampleStore.getState().count).toBe(1);
  });

  test("should set name", () => {
    const { setName } = useExampleStore.getState().actions;

    setName("John");

    expect(useExampleStore.getState().name).toBe("John");
  });

  test("should reset state", () => {
    const { increment, setName, reset } = useExampleStore.getState().actions;

    increment();
    setName("John");
    reset();

    const state = useExampleStore.getState();
    expect(state.count).toBe(0);
    expect(state.name).toBe("");
  });
});
```

### Component Tests

```typescript
// src/components/Counter.test.tsx
import { describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useExampleStore } from "@store/example/store";
import Counter from "./Counter";

describe("Counter", () => {
  beforeEach(() => {
    useExampleStore.setState({ count: 0 });
  });

  test("should display count", () => {
    render(<Counter />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  test("should increment count", async () => {
    render(<Counter />);

    await userEvent.click(screen.getByRole("button", { name: "+" }));

    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
```

## When to Create a New Store

### Create a new store when:

1. **State is shared across multiple features**

   - Example: User authentication state, theme preferences

2. **State persists across route changes**

   - Example: Shopping cart, user preferences

3. **State is complex and needs centralized logic**

   - Example: Multi-step form state, complex UI state

4. **State is client-side only**
   - Example: UI state, client preferences

### Don't create a store when:

1. **State is local to one component**

   - Use `useState` instead

2. **State is form-related**

   - Use React Hook Form instead

3. **State is server-side data**

   - Use Astro props or data fetching instead

4. **State is derived from other state**
   - Use computed values or useMemo instead

## Best Practices

### 1. Keep Stores Focused

```typescript
// ❌ Bad: One giant store
const useAppStore = create(() => ({
  user: {},
  cart: [],
  theme: "light",
  notifications: [],
  // ... 50 more properties
}));

// ✅ Good: Separate stores
const useUserStore = create(() => ({ user: {} }));
const useCartStore = create(() => ({ cart: [] }));
const useThemeStore = create(() => ({ theme: "light" }));
```

### 2. Use Selector Hooks

```typescript
// ❌ Bad: Direct store access
function Component() {
  const store = useExampleStore();
  return <div>{store.count}</div>; // Re-renders on any store change
}

// ✅ Good: Selector hook
function Component() {
  const count = useCount();
  return <div>{count}</div>; // Re-renders only when count changes
}
```

### 3. Separate State and Actions

```typescript
// ✅ Good: Clear separation
export type ExampleStore = {
  // State
  count: number;

  // Actions
  actions: {
    increment: () => void;
  };
};
```

### 4. Use TypeScript

```typescript
// ✅ Good: Fully typed
export const useExampleStore = create<ExampleStore>()((set) => ({
  count: 0,
  actions: {
    increment: () => set((state) => ({ count: state.count + 1 })),
  },
}));
```

### 5. Reset State in Tests

```typescript
beforeEach(() => {
  useExampleStore.setState({ count: 0, name: "" });
});
```

### 6. Avoid Nested State

```typescript
// ❌ Avoid: Deeply nested state
{
  user: {
    profile: {
      settings: {
        theme: "light";
      }
    }
  }
}

// ✅ Better: Flat state
{
  userTheme: "light";
}
```

## Common Patterns

### Loading State

```typescript
export const useDataStore = create<DataStore>()((set) => ({
  data: null,
  isLoading: false,
  error: null,

  actions: {
    fetchData: async () => {
      set({ isLoading: true, error: null });
      try {
        const data = await fetchFromAPI();
        set({ data, isLoading: false });
      } catch (error) {
        set({ error: error.message, isLoading: false });
      }
    },
  },
}));
```

### Toggle State

```typescript
export const useUIStore = create<UIStore>()((set) => ({
  isOpen: false,

  actions: {
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  },
}));
```

### List Management

```typescript
export const useTodosStore = create<TodosStore>()((set) => ({
  todos: [],

  actions: {
    addTodo: (text) =>
      set((state) => ({
        todos: [...state.todos, { id: Date.now(), text, done: false }],
      })),
    removeTodo: (id) =>
      set((state) => ({
        todos: state.todos.filter((t) => t.id !== id),
      })),
    toggleTodo: (id) =>
      set((state) => ({
        todos: state.todos.map((t) =>
          t.id === id ? { ...t, done: !t.done } : t,
        ),
      })),
  },
}));
```

## Debugging

### Zustand DevTools

```typescript
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useExampleStore = create<ExampleStore>()(
  devtools(
    (set) => ({
      count: 0,
      actions: {
        increment: () => set((state) => ({ count: state.count + 1 })),
      },
    }),
    { name: "ExampleStore" }, // Name in DevTools
  ),
);
```

### Logging

```typescript
export const useExampleStore = create<ExampleStore>()((set) => ({
  count: 0,
  actions: {
    increment: () => {
      console.log("Before:", useExampleStore.getState().count);
      set((state) => ({ count: state.count + 1 }));
      console.log("After:", useExampleStore.getState().count);
    },
  },
}));
```

## Migration Guide

### From useState to Zustand

```typescript
// Before: useState
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

// After: Zustand
function Counter() {
  const count = useCount();
  const { increment } = useExampleActions();
  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

### From Context to Zustand

```typescript
// Before: Context
const CountContext = createContext();

function CountProvider({ children }) {
  const [count, setCount] = useState(0);
  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}

// After: Zustand (no provider needed)
export const useCountStore = create(() => ({ count: 0 }));
```

## Further Reading

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Zustand Best Practices](https://github.com/pmndrs/zustand/wiki/Best-Practices)
- [React State Management](https://react.dev/learn/managing-state)
