import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import Canvas from './Components/Canvas'

function App() {
  const [activeTool, setActiveTool] = useState(null);
  return (
    <>
      <Navbar setActiveTool={setActiveTool} />
      <Canvas activeTool={activeTool} />

    </>
  )
}

export default App
