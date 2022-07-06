import {Middleware} from "redux";
import {CHANGE_LANGUAGE} from "../language/languageActions";
import i18n from "i18next";

export const actionLanguage: Middleware = () => (next) => (action) => {
  if (action.type === CHANGE_LANGUAGE) {
    i18n.changeLanguage(action.payload).then(() => null)
  }
  next(action)
}
