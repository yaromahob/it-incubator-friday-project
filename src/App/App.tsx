import React, { useEffect } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import NotFound from 'features/NotFound/NotFound'
import Profile from 'features/Profile/Profile'
import RecoveryPassword from 'features/RecoveryPassword/RecoveryPassword'
import { SuperComponents } from 'features/TestStand/SuperComponents'
import { SignUp } from 'features/SignUp/SignUp'
import { Header } from 'features/Header/Header'
import { ErrorSnackbar } from 'common/ErrorSnackbar'
import { CheckEmail } from 'features/CheckEmail/CheckEmail'
import Login from 'features/Login/Login'
import { NewPassword } from 'features/NewPassword/NewPassword'
import { setAuthApiTC } from './app-reducer'
import { useAppDispatch, useAppSelector } from './store'
import { PackList } from 'features/PackList/PackList'
import { Cards } from 'features/CardList/Cards'
import { EmptyPack } from 'features/PackList/EmptyPack/EmptyPack'
import { Learn } from 'features/Learn/Learn'
import { PATH } from '../root'
import { EmptyCard } from 'features/PackList/EmptyCard/EmptyCard'

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
        <Route path={PATH.MAIN} element={<Navigate to="/profile" />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.LEARN + '/:packId'} element={<Learn />} />
        <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
        <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
        <Route path={PATH.PACK_LIST} element={<PackList />} />
        <Route path={PATH.EMPTY_PACK} element={<EmptyPack />} />
        <Route path={PATH.EMPTY_CARD + '/:packOwner/:packId'} element={<EmptyCard />} />
        <Route path={PATH.CARD_LIST + '/:packOwner/:packId'} element={<Cards />} />
        <Route path={PATH.ERROR} element={<NotFound />} />
        <Route path={PATH.RECOVERY_PASSWORD} element={<RecoveryPassword />} />
        <Route path={PATH.SIGNUP} element={<SignUp />} />
        <Route path={PATH.SUPER_COMPONENTS} element={<SuperComponents />} />
      </Routes>
    </div>
  )
}

export default App
