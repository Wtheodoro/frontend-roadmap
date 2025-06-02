# Event Handling and Forms

## 📚 Understanding Events in React

React events are similar to DOM events but with some key differences:

- Events are named using camelCase
- Events are passed as props
- Event handlers receive a synthetic event object
- Events bubble up through the component tree

## 🎯 Basic Event Handling

### Click Events

```jsx
// JavaScript Version
function Button() {
  const handleClick = (e) => {
    console.log('Button clicked!', e)
  }

  return <button onClick={handleClick}>Click me</button>
}
```

```tsx
// TypeScript Version
function Button() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked!', e)
  }

  return <button onClick={handleClick}>Click me</button>
}
```

### Input Events

```jsx
// JavaScript Version
function Input() {
  const handleChange = (e) => {
    console.log('Input value:', e.target.value)
  }

  return <input type='text' onChange={handleChange} />
}
```

```tsx
// TypeScript Version
function Input() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input value:', e.target.value)
  }

  return <input type='text' onChange={handleChange} />
}
```

### Form Events

```jsx
// JavaScript Version
function Form() {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted!')
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type='submit'>Submit</button>
    </form>
  )
}
```

```tsx
// TypeScript Version
function Form() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted!')
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type='submit'>Submit</button>
    </form>
  )
}
```

## 📝 Form Handling

### Controlled Components

```jsx
// JavaScript Version
function ControlledForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form data:', formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name='username'
        value={formData.username}
        onChange={handleChange}
        placeholder='Username'
      />
      <input
        name='email'
        type='email'
        value={formData.email}
        onChange={handleChange}
        placeholder='Email'
      />
      <input
        name='password'
        type='password'
        value={formData.password}
        onChange={handleChange}
        placeholder='Password'
      />
      <button type='submit'>Submit</button>
    </form>
  )
}
```

```tsx
// TypeScript Version
function ControlledForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form data:', formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name='username'
        value={formData.username}
        onChange={handleChange}
        placeholder='Username'
      />
      <input
        name='email'
        type='email'
        value={formData.email}
        onChange={handleChange}
        placeholder='Email'
      />
      <input
        name='password'
        type='password'
        value={formData.password}
        onChange={handleChange}
        placeholder='Password'
      />
      <button type='submit'>Submit</button>
    </form>
  )
}
```

### Form Validation

```jsx
// JavaScript Version
function ValidatedForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.username) {
      newErrors.username = 'Username is required'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Form is valid:', formData)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name='username'
          value={formData.username}
          onChange={handleChange}
          placeholder='Username'
        />
        {errors.username && <span className='error'>{errors.username}</span>}
      </div>
      <div>
        <input
          name='email'
          type='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Email'
        />
        {errors.email && <span className='error'>{errors.email}</span>}
      </div>
      <div>
        <input
          name='password'
          type='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='Password'
        />
        {errors.password && <span className='error'>{errors.password}</span>}
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}
```

```tsx
// TypeScript Version
interface FormErrors {
  username?: string
  email?: string
  password?: string
}

function ValidatedForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.username) {
      newErrors.username = 'Username is required'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Form is valid:', formData)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name='username'
          value={formData.username}
          onChange={handleChange}
          placeholder='Username'
        />
        {errors.username && <span className='error'>{errors.username}</span>}
      </div>
      <div>
        <input
          name='email'
          type='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Email'
        />
        {errors.email && <span className='error'>{errors.email}</span>}
      </div>
      <div>
        <input
          name='password'
          type='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='Password'
        />
        {errors.password && <span className='error'>{errors.password}</span>}
      </div>
      <button type='submit'>Submit</button>
    </form>
  )
}
```

## 🎮 Advanced Form Handling

### Custom Form Hook

```jsx
// JavaScript Version
function useForm({ initialValues, validate, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate) {
      const validationErrors = validate(values)
      setErrors(validationErrors)
      if (Object.keys(validationErrors).length === 0) {
        onSubmit(values)
      }
    } else {
      onSubmit(values)
    }
  }

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  }
}

// Usage
function LoginForm() {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useForm({
      initialValues: {
        email: '',
        password: '',
      },
      validate: (values) => {
        const errors = {}
        if (!values.email) errors.email = 'Email is required'
        if (!values.password) errors.password = 'Password is required'
        return errors
      },
      onSubmit: (values) => {
        console.log('Form submitted:', values)
      },
    })

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name='email'
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Email'
        />
        {touched.email && errors.email && (
          <span className='error'>{errors.email}</span>
        )}
      </div>
      <div>
        <input
          name='password'
          type='password'
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Password'
        />
        {touched.password && errors.password && (
          <span className='error'>{errors.password}</span>
        )}
      </div>
      <button type='submit'>Login</button>
    </form>
  )
}
```

```tsx
// TypeScript Version
interface UseFormProps<T> {
  initialValues: T
  validate?: (values: T) => Partial<Record<keyof T, string>>
  onSubmit: (values: T) => void
}

function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validate) {
      const validationErrors = validate(values)
      setErrors(validationErrors)
      if (Object.keys(validationErrors).length === 0) {
        onSubmit(values)
      }
    } else {
      onSubmit(values)
    }
  }

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  }
}

// Usage
function LoginForm() {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useForm({
      initialValues: {
        email: '',
        password: '',
      },
      validate: (values) => {
        const errors: Record<string, string> = {}
        if (!values.email) errors.email = 'Email is required'
        if (!values.password) errors.password = 'Password is required'
        return errors
      },
      onSubmit: (values) => {
        console.log('Form submitted:', values)
      },
    })

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name='email'
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Email'
        />
        {touched.email && errors.email && (
          <span className='error'>{errors.email}</span>
        )}
      </div>
      <div>
        <input
          name='password'
          type='password'
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='Password'
        />
        {touched.password && errors.password && (
          <span className='error'>{errors.password}</span>
        )}
      </div>
      <button type='submit'>Login</button>
    </form>
  )
}
```

## 💡 Best Practices

1. **Event Handling**

   - Use TypeScript for event types
   - Keep event handlers pure
   - Use event delegation when appropriate
   - Handle errors gracefully

2. **Forms**

   - Use controlled components
   - Implement proper validation
   - Show meaningful error messages
   - Consider accessibility
   - Use proper HTML5 input types

3. **Performance**
   - Debounce input handlers
   - Memoize event handlers
   - Use proper form submission methods
   - Handle loading states

## 🎮 Hands-on Exercise

Create a registration form with:

- Username validation
- Password strength meter
- Email validation
- Terms and conditions checkbox
- Submit button with loading state

```jsx
// JavaScript Version
function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const getPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Registration successful:', formData)
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name='username'
          value={formData.username}
          onChange={handleChange}
          placeholder='Username'
          required
          minLength={3}
        />
      </div>
      <div>
        <input
          name='email'
          type='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Email'
          required
        />
      </div>
      <div>
        <input
          name='password'
          type='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='Password'
          required
        />
        <div className='password-strength'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`strength-bar ${
                i < getPasswordStrength(formData.password) ? 'active' : ''
              }`}
            />
          ))}
        </div>
      </div>
      <div>
        <input
          name='confirmPassword'
          type='password'
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder='Confirm Password'
          required
        />
      </div>
      <div>
        <label>
          <input
            name='acceptTerms'
            type='checkbox'
            checked={formData.acceptTerms}
            onChange={handleChange}
            required
          />
          I accept the terms and conditions
        </label>
      </div>
      <button type='submit' disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </form>
  )
}
```

```tsx
// TypeScript Version
interface RegistrationForm {
  username: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

function RegistrationForm() {
  const [formData, setFormData] = useState<RegistrationForm>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const getPasswordStrength = (password: string): number => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Registration successful:', formData)
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name='username'
          value={formData.username}
          onChange={handleChange}
          placeholder='Username'
          required
          minLength={3}
        />
      </div>
      <div>
        <input
          name='email'
          type='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Email'
          required
        />
      </div>
      <div>
        <input
          name='password'
          type='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='Password'
          required
        />
        <div className='password-strength'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`strength-bar ${
                i < getPasswordStrength(formData.password) ? 'active' : ''
              }`}
            />
          ))}
        </div>
      </div>
      <div>
        <input
          name='confirmPassword'
          type='password'
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder='Confirm Password'
          required
        />
      </div>
      <div>
        <label>
          <input
            name='acceptTerms'
            type='checkbox'
            checked={formData.acceptTerms}
            onChange={handleChange}
            required
          />
          I accept the terms and conditions
        </label>
      </div>
      <button type='submit' disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </form>
  )
}
```

## 📚 Additional Resources

- [React Events Documentation](https://react.dev/learn/responding-to-events)
- [React Forms Documentation](https://react.dev/learn/forms)
- [Form Validation Libraries](https://react-hook-form.com/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [React Patterns](https://reactpatterns.com/)
