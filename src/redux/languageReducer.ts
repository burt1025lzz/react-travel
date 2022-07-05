import i18n from "i18next";

export interface LanguageState {
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

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'change_language':
      // 这样处理不标准, 存在副作用
      i18n.changeLanguage(action.payload).then(() => null)
      return {...state, language: action.payload}
    case 'add_language':
      return {...state, languageList: [...state.languageList, action.payload]}
    default:
      return state
  }
}
