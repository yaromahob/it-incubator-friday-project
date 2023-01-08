import React from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'

import Login from '../features/Login/Login'
import NewPassword from '../features/NewPassword/NewPassword'
import NotFound from '../features/NotFound/NotFound'
import Profile from '../features/Profile/Profile'
import RecoveryPassword from '../features/RecoveryPassword/RecoveryPassword'
import SuperComponents from '../features/TestStand/SuperComponents'
import { SignUp } from '../features/SignUp/SignUp'
import { Header } from '../features/Header/Header'
import { ErrorSnackbar } from '../features/ErrorSnackbar/ErrorSnackbar'

function App() {
  return (
    <div className="App">
      <ErrorSnackbar />
      <Header />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/newPassword" element={<NewPassword />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/recoveryPassword" element={<RecoveryPassword />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/superComponents" element={<SuperComponents />} />
      </Routes>
    </div>
  )
}

export default App
