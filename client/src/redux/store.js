import { configureStore, combineReducers } from '@reduxjs/toolkit'
import cartReducer from './cartRedux'
import userReducer, { logout } from './userRedux'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const appReducer = combineReducers({ user: userReducer, cart: cartReducer })

const rootReducer = (state, action) => {
  // clear the state on logout
  if (action.type === 'user/logout') {
    const { routing } = state
    state = { routing }
  }
  return appReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)
