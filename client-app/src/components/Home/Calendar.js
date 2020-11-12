import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import * as actions from "../../actions/car";
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
import { Modal } from "./AvailableCarsModal";

import useForm from "../useForm";

const Calendar = ({ ...props }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [showModal, setShowModal] = useState(false);
  const [activeModal, setActiveModal] = useState(false);

  const initialFieldValues = {
    startDate: null,
    endDate: null,
  };

  const validate = (fieldValues = values) => {
    if ((startDate != null, endDate != null)) return true;
    else return false;
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFieldValues, validate);

  const hideModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  const handleCheck = () => {
    if (validate()) {
      props.fetchAvailable(startDate, endDate);
      setActiveModal(true);
    }
  };

  useEffect(() => {
    if (activeModal) {
      setActiveModal(false);
      openModal();
    }
  }, [props.availableList]);

  return (
    <Grid container>
      <Grid item xs={2}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </Grid>
      <Button onClick={handleCheck}>CHECK</Button>
      <Modal
        show={showModal}
        handleClose={hideModal}
        props={props}
        startDate={startDate}
        endDate={endDate}
      />
    </Grid>
  );
};
const mapStateToProps = (state) => ({
  availableList: state.car.availableList,
});

const mapActionToProps = {
  fetchAvailable: actions.fetchAvailable,
  book: actions.book,
};

export default connect(mapStateToProps, mapActionToProps)(Calendar);
//export default Calendar;
