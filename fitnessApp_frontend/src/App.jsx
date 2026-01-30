import { useState } from 'react'
import { AuthProvider } from './context/autContext'
import { ToastProvider } from './context/toastContext.jsx'
import './App.css'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import ToastContainer from './components/Toast.jsx'
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import WorkoutDetails from './pages/WorkoutDetails.jsx'
import Exercises from './pages/Exercises.jsx'
import Workouts from './pages/Workouts.jsx'

function App() {
 

  return (
    <>
      <AuthProvider>
        <ToastProvider>
          <ToastContainer />
          <BrowserRouter>
          <Routes>
            <Route path='/' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/exercises' element={<Exercises/>}/>
            <Route path='/workouts' element={<Workouts/>}/>
            <Route path='/workouts/:workoutId' element={<WorkoutDetails/>}/>
          </Routes>
        </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </>
  )
}

export default App
