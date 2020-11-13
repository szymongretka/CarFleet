import "./AvailableCarsModal.css";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ButtonGroup,
  Checkbox,
  CircularProgress,
} from "@material-ui/core";
import { connect } from "react-redux";
import * as actions from "../../actions/car";
import { useToasts } from "react-toast-notifications";

import CancelIcon from "@material-ui/icons/Cancel";

export const Modal = ({ handleClose, show, startDate, endDate, props }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const { addToast } = useToasts();
  const handleBook = (id) => {
    const arr = {
      startDate: startDate,
      endDate: endDate,
    };
    const onSuccess = () => {
      addToast("Submitted successfully", { appearance: "success" });
    };
    props.book(id, arr, onSuccess);
    handleClose();
  };
  // if (!availableList && show) return <CircularProgress />;
  // else
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <Grid container justify="center">
          <Grid>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Brand</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>isAvailable</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.availableList.length != 0 ? (
                    props.availableList.map((record, index) => {
                      return (
                        <TableRow key={index} hover>
                          <TableCell>{record.brand}</TableCell>
                          <TableCell>{record.model}</TableCell>

                          <TableCell>
                            <Checkbox checked={record.isAvailable} disabled />
                          </TableCell>
                          <TableCell>
                            <ButtonGroup variant="text">
                              <Button
                                onClick={() => handleBook(record.id)}
                                style={{ color: "blue" }}
                              >
                                {" "}
                                Book!
                              </Button>
                            </ButtonGroup>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow hover>
                      <TableCell>There are no available vehicles !</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        <Button onClick={handleClose}>
          <CancelIcon color="primary" />
          Close
        </Button>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  availableList: state.car.availableList,
});

const mapActionToProps = {
  book: actions.book,
};

export default connect(mapStateToProps, mapActionToProps)(Modal);
