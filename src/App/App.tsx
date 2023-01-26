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
import { useAppDispatch } from './store'
import { PackList } from '../features/PackList/PackList'
import { Cards } from '../features/CardList/Cards'
import { EmptyPack } from '../features/PackList/EmptyPack/EmptyPack'
import { Learn } from '../features/Learn/Learn'
import { PATH } from '../root'
import { EmptyCard } from '../features/PackList/EmptyCard/EmptyCard'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setAuthApiTC())
  }, [])

  return (
    <div className="App">
      <ErrorSnackbar />
      <Header />
      <Routes>
        <Route path={PATH.MAIN} element={<Navigate to="/profile" />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.LEARN + '/:packId'} element={<Learn />} />
        <Route path={PATH.CHECKEMAIL} element={<CheckEmail />} />
        <Route path={PATH.NEWPASSWORD} element={<NewPassword />} />
        <Route path={PATH.PACKLIST} element={<PackList />} />
        <Route path={PATH.EMPTYPACK} element={<EmptyPack />} />
        <Route path={PATH.EMPTYCARD + '/:id'} element={<EmptyCard />} />
        <Route path={PATH.CARDLIST + '/:packId'} element={<Cards />} />
        <Route path={PATH.ERROR} element={<NotFound />} />
        <Route path={PATH.RECOVERYPASSWORD} element={<RecoveryPassword />} />
        <Route path={PATH.SIGNUP} element={<SignUp />} />
        <Route path={PATH.SUPERCOMPONENTS} element={<SuperComponents />} />
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
