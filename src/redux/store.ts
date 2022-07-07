import {createStore, applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import languageReducer from './language/languageReducer'
import recommendProductReducer from './recommendProduct/recommendProductReducer'
import {actionLog} from "./middleware/actionLog";
import {actionLanguage} from "./middleware/actionLanguage";
import {combineReducers} from '@reduxjs/toolkit'
import {productDetailSlice} from "./productDetail/slice";

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProduct: recommendProductReducer,
  productDetail: productDetailSlice.reducer
})
const store = createStore(rootReducer, applyMiddleware(thunk, actionLog, actionLanguage))

export type RootState = ReturnType<typeof store.getState>

export default store
