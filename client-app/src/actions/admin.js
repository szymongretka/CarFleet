import api from "./api";

export const ACTION_TYPES = {
  CREATE_USER: "CREATE_USER",
  UPDATE_USER: "UPDATE_USER",
  DELETE_USER: "DELETE_USER",
  FETCH_ALL_USERS: "FETCH_ALL_USERS",
};

const formateData = (data) => ({
  ...data,
  isAdmin: data.isAvailable ? data.isAvailable : false,
});

export const fetchAllUsers = () => (dispatch) => {
  api
    .admin()
    .fetchAllUsers()
    .then((response) => {
      dispatch({
        type: ACTION_TYPES.FETCH_ALL_USERS,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};

export const createUser = (data, onSuccess) => (dispatch) => {
  data = formateData(data);
  api
    .admin()
    .createUser(data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.CREATE_USER,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const updateUser = (id, data, onSuccess) => (dispatch) => {
  data = formateData(data);
  api
    .admin()
    .updateUser(id, data)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.UPDATE_USER,
        payload: { id, ...data },
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const DeleteUser = (id, onSuccess) => (dispatch) => {
  api
    .admin()
    .deleteUser(id)
    .then((res) => {
      dispatch({
        type: ACTION_TYPES.DELETE_USER,
        payload: id,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};
