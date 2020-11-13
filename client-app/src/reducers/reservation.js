import { ACTION_TYPES } from "../actions/reservation";
const initialState = {
  list: [],
};

export const reservation = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ALL_RESERVATIONS:
      return {
        ...state,
        list: [...action.payload],
      };

    case ACTION_TYPES.CREATE_RESERVATION:
      return {
        ...state,
        list: [...state.list, action.payload],
      };

    case ACTION_TYPES.UPDATE_RESERVATION:
      return {
        ...state,
        list: state.list.map((x) =>
          x.id == action.payload.id ? action.payload : x
        ),
      };

    case ACTION_TYPES.DELETE_RESERVATION:
      return {
        ...state,
        list: state.list.filter((x) => x.id != action.payload),
      };

    default:
      return state;
  }
};
