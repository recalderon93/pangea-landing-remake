# Forms & Validation Rules (Optional)

Load this rule when working on forms or form-related features.

## React Hook Form Pattern

### Basic Setup

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 1. Define schema
const schema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().min(2, "Name too short"),
});

// 2. Create form
const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: {
    email: "",
    name: "",
  },
});

// 3. Handle submit
const onSubmit = (data) => {
  console.log(data); // Validated data
};

// 4. Render form
<form onSubmit={form.handleSubmit(onSubmit)}>
  <input {...form.register("email")} />
  {form.formState.errors.email && (
    <span>{form.formState.errors.email.message}</span>
  )}
  <button type="submit">Submit</button>
</form>
```

### Nested Components

Use `useFormContext()` for nested components:

```typescript
// Parent component
import { FormProvider, useForm } from "react-hook-form";

function ParentForm() {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <NestedInput />
      </form>
    </FormProvider>
  );
}

// Nested component
import { useFormContext } from "react-hook-form";

function NestedInput() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
    </div>
  );
}
```

### Custom Inputs with useController

For custom input components:

```typescript
import { useController, useFormContext } from "react-hook-form";

function CustomInput({ name, label }) {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <div>
      <label>{label}</label>
      <input
        {...field}
        className={error ? "error" : ""}
      />
      {error && <span>{error.message}</span>}
    </div>
  );
}

// Usage
<CustomInput name="email" label="Email" />
```

## Zod Validation

### Schema Definition

```typescript
import { z } from "zod";
import { t, type Locale } from "@/i18n";

// Localized validation
export const getFormValidator = (locale: Locale) =>
  z.object({
    // Required string
    email: z
      .string({
        message: t(locale, "errors.required.email"),
      })
      .email(t(locale, "errors.email-format")),

    // String with length
    name: z
      .string({
        message: t(locale, "errors.required.name"),
      })
      .min(2, t(locale, "errors.name-length")),

    // Optional string
    company: z.string().optional(),

    // Number with range
    age: z.number().min(18, "Must be 18+").max(100, "Invalid age"),

    // Array with constraints
    tags: z
      .array(z.string())
      .min(1, "At least one tag required")
      .max(5, "Maximum 5 tags"),

    // File validation
    file: z
      .instanceof(File)
      .refine(
        (file) => file.size <= 5 * 1024 * 1024,
        "File must be less than 5MB",
      )
      .refine(
        (file) => ["image/jpeg", "image/png"].includes(file.type),
        "Only JPEG and PNG allowed",
      ),
  });
```

### Conditional Validation

Use `refine()` for conditional validation:

```typescript
const schema = z
  .object({
    contactReason: z.string(),
    duration: z.string().optional(),
  })
  .refine(
    (data) => {
      // If contactReason is "build-something", duration is required
      if (data.contactReason === "build-something") {
        return data.duration && data.duration.trim().length > 0;
      }
      return true;
    },
    {
      message: "Duration is required",
      path: ["duration"], // Error path
    },
  );
```

### Transform and Preprocess

```typescript
const schema = z.object({
  // Transform to lowercase
  email: z
    .string()
    .email()
    .transform((val) => val.toLowerCase()),

  // Preprocess (coerce)
  age: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z.number().min(18),
  ),

  // Trim whitespace
  name: z.string().transform((val) => val.trim()),
});
```

## Multi-Step Forms

Pattern used in `src/features/ContactUs/`:

```typescript
function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const form = useForm();

  const steps = [
    <Step1 setCurrentStep={setCurrentStep} />,
    <Step2 setCurrentStep={setCurrentStep} />,
    <Step3 setCurrentStep={setCurrentStep} />,
  ];

  return (
    <FormProvider {...form}>
      <form>
        {steps[currentStep]}
      </form>
    </FormProvider>
  );
}

// Step component
function Step1({ setCurrentStep }) {
  const { control, trigger } = useFormContext();

  const handleNext = async () => {
    // Validate current step fields
    const isValid = await trigger(["email", "name"]);

    if (isValid) {
      setCurrentStep(1);
    }
  };

  return (
    <div>
      <CustomInput name="email" label="Email" />
      <CustomInput name="name" label="Name" />
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}
```

### Step Validation

Validate specific fields before proceeding:

```typescript
const handleNext = async () => {
  // Validate only current step fields
  const isValid = await trigger(["email", "name"]);

  if (isValid) {
    setCurrentStep((prev) => prev + 1);
  }
};
```

### Step Counter

Show progress:

```typescript
function StepCounter({ current, total }) {
  return (
    <div>
      Step {current + 1} of {total}
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${((current + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
```

## Form Patterns

### Loading State

```typescript
const [isSubmitting, setIsSubmitting] = useState(false);

const onSubmit = async (data) => {
  setIsSubmitting(true);
  try {
    await submitForm(data);
  } catch (error) {
    // Handle error
  } finally {
    setIsSubmitting(false);
  }
};

<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? "Submitting..." : "Submit"}
</button>
```

### Error Handling

```typescript
const [submitError, setSubmitError] = useState(null);

const onSubmit = async (data) => {
  setSubmitError(null);
  try {
    await submitForm(data);
  } catch (error) {
    setSubmitError(error.message);
  }
};

{submitError && (
  <div className="error-message">{submitError}</div>
)}
```

### Success State

```typescript
const [isSuccess, setIsSuccess] = useState(false);

const onSubmit = async (data) => {
  try {
    await submitForm(data);
    setIsSuccess(true);
    form.reset(); // Reset form
  } catch (error) {
    // Handle error
  }
};

{isSuccess && (
  <div className="success-message">
    Form submitted successfully!
  </div>
)}
```

### Reset Form

```typescript
// Reset to default values
form.reset();

// Reset to specific values
form.reset({
  email: "",
  name: "John",
});

// Reset after submit
const onSubmit = async (data) => {
  await submitForm(data);
  form.reset();
};
```

## Input Components

### Text Input

```typescript
type Props = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
};

function TextInput({ name, label, placeholder, type = "text" }: Props) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={error ? "error" : ""}
      />
      {error && <span className="error-message">{error.message}</span>}
    </div>
  );
}
```

### Select Input

```typescript
type Option = {
  value: string;
  label: string;
};

type Props = {
  name: string;
  label: string;
  options: Option[];
};

function SelectInput({ name, label, options }: Props) {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        {...register(name)}
        className={error ? "error" : ""}
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="error-message">{error.message}</span>}
    </div>
  );
}
```

### Radio Input

```typescript
type Props = {
  name: string;
  value: string;
  label: string;
};

function RadioInput({ name, value, label }: Props) {
  const { register } = useFormContext();

  return (
    <label>
      <input
        type="radio"
        value={value}
        {...register(name)}
      />
      <span>{label}</span>
    </label>
  );
}

// Usage
<div>
  <RadioInput name="size" value="small" label="Small" />
  <RadioInput name="size" value="medium" label="Medium" />
  <RadioInput name="size" value="large" label="Large" />
</div>
```

## Best Practices

### 1. Localize Error Messages

```typescript
// ✅ Good: Localized
const schema = z.object({
  email: z.string().email(t(locale, "errors.email-format")),
});

// ❌ Bad: Hardcoded
const schema = z.object({
  email: z.string().email("Invalid email"),
});
```

### 2. Validate on Blur

```typescript
const form = useForm({
  mode: "onBlur", // Validate on blur
  reValidateMode: "onChange", // Re-validate on change
});
```

### 3. Disable Submit While Invalid

```typescript
<button
  type="submit"
  disabled={!form.formState.isValid || isSubmitting}
>
  Submit
</button>
```

### 4. Show Field Errors

```typescript
// ✅ Good: Show specific error
{errors.email && <span>{errors.email.message}</span>}

// ❌ Bad: Generic error
{errors.email && <span>Error</span>}
```

### 5. Reset After Success

```typescript
const onSubmit = async (data) => {
  await submitForm(data);
  form.reset(); // Clear form
};
```

## Reference

See `src/features/ContactUs/` for complete multi-step form implementation.
