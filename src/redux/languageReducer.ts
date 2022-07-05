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

export default (state = defaultState, action) => {
  if (action.type === 'change_language') {
    return {...state, language: action.payload}
  }
  return state
}
