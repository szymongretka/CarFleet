import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
  Checkbox,
  TableCell,
} from "@material-ui/core";
import useForm from "../useForm";
import { connect } from "react-redux";
import * as actions from "../../actions/admin";
import { useToasts } from "react-toast-notifications";

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 230,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin: {
    margin: theme.spacing(1),
  },
});

const initialFieldValues = {
  username: "",
  email: "",
  password: "",
  isAdmin: false,
};

const BoardAdminForm = ({ classes, ...props }) => {
  //toast msg.
  const { addToast } = useToasts();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("username" in fieldValues)
      temp.username = fieldValues.username ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = fieldValues.email ? "" : "This field is required.";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFieldValues, validate, props.setCurrentId);

  //material-ui select
  const inputLabel = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Submitted successfully", { appearance: "success" });
      };
      if (props.currentId == 0) {
        props.createUser(values, onSuccess);
      } else {
        props.updateUser(props.currentId, values, onSuccess);
      }
    }
  };

  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.userList.find((x) => x.id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);
  console.log(typeof values.isAdmin);
  return (
    <form
      autoComplete="off"
      noValidate
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <Grid container>
        <Grid item xs={6}>
          <TextField
            name="username"
            variant="outlined"
            label="username"
            value={values.username}
            onChange={handleInputChange}
            {...(errors.username && {
              error: true,
              helperText: errors.username,
            })}
          />
          <TextField
            name="email"
            variant="outlined"
            label="email"
            value={values.email}
            onChange={handleInputChange}
            {...(errors.email && { error: true, helperText: errors.email })}
          />
          <TextField
            name="password"
            variant="outlined"
            label="password"
            value={values.password}
            type="password"
            onChange={handleInputChange}
            {...(errors.password && {
              error: true,
              helperText: errors.password,
            })}
          />
          <TableCell>
            Is Admin:
            <Checkbox checked={values.isAdmin} onChange={handleInputChange} />
          </TableCell>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.smMargin}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            className={classes.smMargin}
            onClick={resetForm}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = (state) => ({
  userList: state.admin.list,
});

const mapActionToProps = {
  createUser: actions.createUser,
  updateUser: actions.updateUser,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(BoardAdminForm));
