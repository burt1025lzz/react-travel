import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import languageReducer from './language/languageReducer'
import recommendProductReducer from './recommendProduct/recommendProductReducer'

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProduct: recommendProductReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>

export default store
