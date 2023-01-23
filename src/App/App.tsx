import React, { useEffect } from 'react'
import './App.css'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import NotFound from '../features/NotFound/NotFound'
import Profile from '../features/Profile/Profile'
import RecoveryPassword from '../features/RecoveryPassword/RecoveryPassword'
import SuperComponents from '../features/TestStand/SuperComponents'
import { SignUp } from '../features/SignUp/SignUp'
import { Header } from '../features/Header/Header'
import { ErrorSnackbar } from '../features/ErrorSnackbar/ErrorSnackbar'
import CheckEmail from '../features/CheckEmail/CheckEmail'
import Login from '../features/Login/Login'
import { NewPassword } from '../features/NewPassword/NewPassword'
import { setAuthApiTC } from './app-reducer'
import { useAppDispatch, useAppSelector } from './store'
import { PackList } from '../features/PackList/PackList'
import { Cards } from '../features/CardList/Cards'
import { EmptyPack } from '../features/PackList/EmptyPack/EmptyPack'
import { Learn } from '../features/Learn/Learn'

function App() {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.app.isAuth)

  useEffect(() => {
    dispatch(setAuthApiTC())
  }, [])

  return (
    <div className="App">
      <ErrorSnackbar />
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/profile" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/checkEmail" element={<CheckEmail />} />
        <Route path="/newPassword" element={<NewPassword />} />
        <Route path="/packList" element={<PackList />} />
        <Route path="/emptyPack" element={<EmptyPack />} />
        <Route path="/cardList/:packId" element={<Cards />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/recoveryPassword" element={<RecoveryPassword />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/superComponents" element={<SuperComponents />} />
      </Routes>
      <footer>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/login'}>Login</NavLink>
        <NavLink to={'/profile'}>Profile</NavLink>
        <NavLink to={'/checkEmail'}>checkEmail</NavLink>
        <NavLink to={'/newPassword'}>newPassword</NavLink>
        <NavLink to={'/packList'}>packList</NavLink>
        <NavLink to={'/cardList'}>cardList</NavLink>
        <NavLink to={'/recoveryPassword'}>recoveryPassword</NavLink>
        <NavLink to={'/signUp'}>signUp</NavLink>
      </footer>
    </div>
  )
}

export default App
