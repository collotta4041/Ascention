import { useEffect, useState } from 'react'
import AuthScreen from './components/AuthScreen'
import Dashboard from './components/Dashboard'
import WorkoutLibrary from './components/WorkoutLibrary'
import './App.css'

export default function App() {
  const [screen, setScreen] = useState(() => (
    window.location.pathname === '/workouts' ? 'workouts' : 'login'
  ))

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/workouts') {
        setScreen('workouts')
      } else {
        setScreen((currentScreen) => currentScreen === 'workouts' ? 'dashboard' : currentScreen)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (path, nextScreen) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path)
    }
    setScreen(nextScreen)
  }

  const signOut = () => {
    if (window.location.pathname !== '/') {
      window.history.replaceState({}, '', '/')
    }
    setScreen('login')
  }

  if (screen === 'workouts') {
    return (
      <WorkoutLibrary
        onNavigateHome={() => navigate('/', 'dashboard')}
        onSignOut={signOut}
      />
    )
  }

  if (screen === 'dashboard') {
    return (
      <Dashboard
        onNavigateWorkouts={() => navigate('/workouts', 'workouts')}
        onSignOut={signOut}
      />
    )
  }

  return <AuthScreen onLogin={() => setScreen('dashboard')} />
}
