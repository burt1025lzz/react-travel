import i18n from "i18next";
import {CHANGE_LANGUAGE, ADD_LANGUAGE, LanguageActionTypes} from "./languageActions";

interface LanguageState {
  language: string
  languageList: { name: string, code: string }[]
}

const defaultState: LanguageState = {
  language: 'zh',
  languageList: [{
    name: '中文',
    code: 'zh'
  }, {
    name: 'English',
    code: 'en'
  }]
}

export default (state = defaultState, action: LanguageActionTypes) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      // 这样处理不标准, 存在副作用
      i18n.changeLanguage(action.payload).then(() => null)
      return {...state, language: action.payload}
    case ADD_LANGUAGE:
      return {...state, languageList: [...state.languageList, action.payload]}
    default:
      return state
  }
}
