import { useState } from 'react'
import './App.css'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function AscentMark({ compact = false }) {
  return (
    <svg
      className={compact ? 'ascent-mark ascent-mark--compact' : 'ascent-mark'}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <path d="M10 49 25 34l8 8L54 21" />
      <path d="M39 21h15v15" />
      <path className="ascent-mark__step" d="M12 55h12M25 48h12M38 41h12" />
    </svg>
  )
}

function Field({ id, label, type = 'text', value, error, onChange, autoComplete }) {
  return (
    <div className="field-group">
      <label htmlFor={id}>{label}</label>
      <div className={error ? 'input-shell input-shell--error' : 'input-shell'}>
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          <span aria-hidden="true">!</span>
          {error}
        </p>
      )}
    </div>
  )
}

function App() {
  const [mode, setMode] = useState('login')
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [formMessage, setFormMessage] = useState('')

  const isSignUp = mode === 'signup'

  const changeMode = (nextMode) => {
    setMode(nextMode)
    setErrors({})
    setFormMessage('')
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((currentValues) => ({ ...currentValues, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: undefined }))
    setFormMessage('')
  }

  const validate = () => {
    const nextErrors = {}

    if (isSignUp && !values.name.trim()) {
      nextErrors.name = 'Please enter your name.'
    }
    if (!values.email.trim()) {
      nextErrors.email = 'Please enter your email address.'
    } else if (!emailPattern.test(values.email)) {
      nextErrors.email = 'Enter a valid email address, like you@domain.com.'
    }
    if (!values.password) {
      nextErrors.password = 'Please enter a password.'
    } else if (values.password.length < 8) {
      nextErrors.password = 'Your password must be at least 8 characters.'
    }
    if (isSignUp) {
      if (!values.confirmPassword) {
        nextErrors.confirmPassword = 'Please confirm your password.'
      } else if (values.password !== values.confirmPassword) {
        nextErrors.confirmPassword = 'Passwords do not match yet.'
      }
    }

    return nextErrors
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setFormMessage(
        isSignUp
          ? 'Your details pass the demo checks. Account creation is not connected yet.'
          : 'Your details pass the demo checks. Login is not connected yet.',
      )
    }
  }

  return (
    <main className="auth-page">
      <section className="brand-panel" aria-label="Ascend Fitness introduction">
        <a className="brand" href="#top" aria-label="Return to login" onClick={() => changeMode('login')}>
          <span className="brand__mark"><AscentMark compact /></span>
          <span>ASCEND</span>
        </a>

        <div className="brand-panel__content">
          <p className="eyebrow"><span></span> Forged by consistency</p>
          <h1>Stronger<br />with every <em>step.</em></h1>
          <p className="brand-copy">
            Show up, push forward, and become the person who does not back down.
          </p>
        </div>

        <div className="discipline-graphic" aria-hidden="true">
          <div className="discipline-graphic__halo"></div>
          <svg viewBox="0 0 360 250" fill="none">
            <path className="discipline-graphic__frame" d="M180 22 275 59v64c0 55-35 92-95 113-60-21-95-58-95-113V59l95-37Z" />
            <path className="discipline-graphic__inner" d="M180 48 247 74v49c0 38-23 65-67 82-44-17-67-44-67-82V74l67-26Z" />
            <path className="discipline-graphic__bars" d="M142 93h76M142 119h76M142 145h76" />
            <circle className="discipline-graphic__core" cx="180" cy="173" r="17" />
            <path className="discipline-graphic__commitment" d="m171 173 6 6 13-15" />
          </svg>
          <div className="discipline-graphic__caption">
            <span>DISCIPLINE</span>
            <strong>the standard you keep</strong>
          </div>
        </div>

        <p className="brand-panel__footer">© 2026 Ascend Fitness</p>
      </section>

      <section className="form-panel" id="top">
        <div className="form-panel__inner">
          <div className="mobile-brand">
            <span className="brand__mark"><AscentMark compact /></span>
            <span>ASCEND</span>
          </div>

          <div className="form-intro">
            <div className="form-intro__icon"><AscentMark /></div>
            <p className="eyebrow">{isSignUp ? 'Start your ascent' : 'Welcome back'}</p>
            <h2>{isSignUp ? 'Claim your next level.' : 'Keep climbing.'}</h2>
            <p>
              {isSignUp
                ? 'Create your training space and make every rep count.'
                : 'Your goals are waiting. Let’s get after them.'}
            </p>
          </div>

          <form noValidate onSubmit={handleSubmit}>
            {isSignUp && (
              <Field
                id="name"
                label="Name"
                value={values.name}
                error={errors.name}
                onChange={handleChange}
                autoComplete="name"
              />
            )}
            <Field
              id="email"
              label="Email"
              type="email"
              value={values.email}
              error={errors.email}
              onChange={handleChange}
              autoComplete="email"
            />
            <Field
              id="password"
              label="Password"
              type="password"
              value={values.password}
              error={errors.password}
              onChange={handleChange}
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
            />
            {isSignUp && (
              <Field
                id="confirmPassword"
                label="Confirm password"
                type="password"
                value={values.confirmPassword}
                error={errors.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
            )}

            <button className="submit-button" type="submit">
              <span>{isSignUp ? 'Create account' : 'Log in'}</span>
              <span aria-hidden="true">→</span>
            </button>
            {formMessage && <p className="form-message" role="status">{formMessage}</p>}
          </form>

          <p className="switch-copy">
            {isSignUp ? 'Already part of the climb?' : 'New to Ascend?'}{' '}
            <button type="button" onClick={() => changeMode(isSignUp ? 'login' : 'signup')}>
              {isSignUp ? 'Log in' : 'Create an account'}
              <span aria-hidden="true"> ↗</span>
            </button>
          </p>
        </div>
      </section>
    </main>
  )
}

export default App
