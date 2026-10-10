import { useState } from 'react'
import AuthScreen from './components/AuthScreen'
import Dashboard from './components/Dashboard'
import './App.css'

export default function App() {
  const [screen, setScreen] = useState('login')

  if (screen === 'dashboard') {
    return <Dashboard onSignOut={() => setScreen('login')} />
  }

  return <AuthScreen onLogin={() => setScreen('dashboard')} />
}
