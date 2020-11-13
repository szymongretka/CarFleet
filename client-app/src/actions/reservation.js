import api from "./api";

export const ACTION_TYPES = {
  CREATE_RESERVATION: "CREATE_RESERVATION",
  UPDATE_RESERVATION: "UPDATE_RESERVATION",
  DELETE_RESERVATION: "DELETE_RESERVATION",
  FETCH_ALL_RESERVATIONS: "FETCH_ALL_RESERVATIONS",
};

export const fetchAllReservations = () => (dispatch) => {
  api
    .reservation()
    .fetchAllReservations()
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.FETCH_ALL_RESERVATIONS,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};

export const createReservation = (data, onSuccess) => (dispatch) => {
  api
    .reservation()
    .createReservation(data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE_RESERVATION,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const updateReservation = (id, data, onSuccess) => (dispatch) => {
  api
    .reservation()
    .updateReservation(id, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_RESERVATION,
        payload: { id, ...data },
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const DeleteReservation = (id, onSuccess) => (dispatch) => {
  api
    .reservation()
    .deleteReservation(id)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.DELETE_RESERVATION,
        payload: id,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
