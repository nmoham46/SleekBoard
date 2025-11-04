import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Button from '@mui/material/Button'
import UserStoryForm from './components/UserStoryForm'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UserStoryForm />
    </>
  )
}

export default App
