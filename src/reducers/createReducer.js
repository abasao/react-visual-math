import {
  CREATE_BLOCK_ACTION,
  TARGET_BLOCK_ACTION,
  REMOVE_BLOCK_ACTION,
  ERASE_BLOCK_ACTION,
  ENTER_BLOCK_ACTION,
  CREATE_NUMBER_ACTION
} from '../actions/actionTypes';

import { createNumber } from '../assets/JS/number';
import methods from '../assets/JS/methods';
import createMethod, { filterEmpty } from '../assets/JS/createMethods';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_BLOCK_ACTION:
      return {
        ...state,
        ...createMethod(state.createExpression, action.payload)
      };
    case CREATE_NUMBER_ACTION:
      const GenN = action.payload.add
        ? methods.nGen(state.genState)
        : methods.xGen(state.genState - 1);
      return {
        ...state,
        createExpression: [...state.createExpression, new createNumber(GenN())],
        genExpression: [...state.genExpression, GenN]
      };
    case TARGET_BLOCK_ACTION:
      return {
        ...state,
        target: action.payload.target
      };
    case ERASE_BLOCK_ACTION:
      return {
        ...state,
        createExpression: state.createExpression.slice(0, -1),
        genExpression: state.genExpression.slice(0, -1)
      };
    case ENTER_BLOCK_ACTION:
      // console.log('enter action, creator is not deleted', state);
      return {
        ...state
      };
    case REMOVE_BLOCK_ACTION:
      return {
        ...state,
        createExpression: []
      };
    default:
      return state;
  }
};
