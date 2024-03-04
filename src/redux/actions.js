// src/redux/actions.js
export const SET_ACTIVE_BOX = 'SET_ACTIVE_BOX';

export const setActiveBox = (boxId) => ({
  type: SET_ACTIVE_BOX,
  payload: boxId
});
