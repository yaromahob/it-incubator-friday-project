import { combineReducers, legacy_createStore } from 'redux'

import { authReducer } from './reducers/authReducer'

const rootReducer = combineReducers({
  auth: authReducer,
})

export const store = legacy_createStore(rootReducer)
