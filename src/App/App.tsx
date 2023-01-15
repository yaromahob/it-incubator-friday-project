import React, { useEffect } from 'react'

import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import Login from '../features/Login/Login'

import NotFound from '../features/NotFound/NotFound'
import Profile from '../features/Profile/Profile'
import RecoveryPassword from '../features/RecoveryPassword/RecoveryPassword'
import SuperComponents from '../features/TestStand/SuperComponents'
import { SignUp } from '../features/SignUp/SignUp'
import { Header } from '../features/Header/Header'
import { ErrorSnackbar } from '../features/ErrorSnackbar/ErrorSnackbar'
import CheckEmail from '../features/CheckEmail/CheckEmail'
import Login2 from '../features/Login/Login2'
import { NewPassword } from '../features/NewPassword/NewPassword'
import { setAuthApiTC } from './app-reducer'
import { useAppDispatch } from './store'
import { PackList } from '../features/PackList/PackList'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setAuthApiTC())
  })

  return (
    <div className="App">
      <ErrorSnackbar />
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/profile" />} />
        <Route path="/login" element={<Login2 />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/packList" element={<PackList />} />
        <Route path="/CheckEmail" element={<CheckEmail />} />
        <Route path="/newPassword" element={<NewPassword />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/recoveryPassword" element={<RecoveryPassword />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/superComponents" element={<SuperComponents />} />
      </Routes>
    </div>
  )
}

export default App;
