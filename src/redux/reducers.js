// src/redux/reducers.js
import { SET_ACTIVE_BOX } from './actions';

const initialState = {
  activeBox: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_BOX:
      return {
        ...state,
        activeBox: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
