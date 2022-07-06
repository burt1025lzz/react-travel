import {Middleware} from "redux";

export const actionLog: Middleware = (state) => (next) => (action) => {
  console.log("state 当前", state.getState())
  console.log("first action: ", action)
  next(action)
  console.log("state 更新", state.getState())
}
