import { useState } from 'react'
import './App.css'
import Students from './pages/Students'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className="container mt-4">
      <h2 className="text-center mb-4">Student Management</h2>
      <Students/>
    </div>
    </>
  )
}

export default App
