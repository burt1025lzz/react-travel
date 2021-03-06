// import {createStore, applyMiddleware} from 'redux'
// import thunk from "redux-thunk";
import languageReducer from './language/languageReducer'
import recommendProductReducer from './recommendProduct/recommendProductReducer'
import {actionLog} from "./middleware/actionLog";
import {actionLanguage} from "./middleware/actionLanguage";
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {productDetailSlice} from "./productDetail/slice";
import {productSearchSlice} from './productSearch/slice'
import {userSlice} from "./user/slice";
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProduct: recommendProductReducer,
  productDetail: productDetailSlice.reducer,
  productSearch: productSearchSlice.reducer,
  user: userSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog, actionLanguage))
const store = configureStore({
  reducer: persistedReducer,
  // middleware: getDefaultMiddleware => ([...getDefaultMiddleware(), actionLog, actionLanguage]),
  middleware: getDefaultMiddleware => [...getDefaultMiddleware({
    serializableCheck: false
  }), actionLog, actionLanguage],
  devTools: true
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>

export default {store, persistor}
