import api from "./api";

export const ACTION_TYPES = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  FETCH_ALL: "FETCH_ALL",
  FETCH_AVAILABLE: "FETCH_AVAILABLE",
  BOOK: "BOOK",
};

const formateData = (data) => ({
  ...data,
  isAvailable: data.isAvailable ? data.isAvailable : false,
});

export const fetchAll = () => (dispatch) => {
  api
    .car()
    .fetchAll()
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};

export const fetchAvailable = (startDate, endDate) => (dispatch) => {
  api
    .car()
    .fetchAvailable(startDate, endDate)
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.FETCH_AVAILABLE,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};

export const create = (data, onSuccess) => (dispatch) => {
  data = formateData(data);
  api
    .car()
    .create(data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const book = (id, data, onSuccess) => (dispatch) => {
  api
    .car()
    .book(id, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.BOOK,
        payload: { id, startDate: data.startDate, endDate: data.endDate },
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const update = (id, data, onSuccess) => (dispatch) => {
  data = formateData(data);
  api
    .car()
    .update(id, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UPDATE,
        payload: { id, ...data },
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const Delete = (id, onSuccess) => (dispatch) => {
  api
    .car()
    .delete(id)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.DELETE,
        payload: id,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
