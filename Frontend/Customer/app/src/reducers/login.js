import { IS_LOGIN } from "../constants/ActionTypes";

  const initialState = {
    isLogin: false
  }

  export default function loginReducer(state = initialState, action) {
    switch (action.type) {
      case IS_LOGIN: 
        return {
          ...state,
          isLogin: action.isLogin
        }
        default:
            return state;
    }
  }
