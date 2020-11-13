import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/reservation";
import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

const styles = (theme) => ({
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem",
    },
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});

const Reservations = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.fetchAllReservations();
  }, []); //componentDidMount

  //toast msg.
  const { addToast } = useToasts();

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteReservation(id, () =>
        addToast("Deleted successfully", { appearance: "info" })
      );
  };
  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container>
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Car ID</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.reservationList.map((record, index) => {
                  return (
                    <TableRow key={index} hover>
                      <TableCell>{record.startDate}</TableCell>
                      <TableCell>{record.endDate}</TableCell>
                      <TableCell>{record.carId}</TableCell>
                      <TableCell>
                        <ButtonGroup variant="text">
                          <Button>
                            <DeleteIcon
                              color="secondary"
                              onClick={() => onDelete(record.id)}
                            />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  reservationList: state.reservation.list,
});

const mapActionToProps = {
  fetchAllReservations: actions.fetchAllReservations,
  deleteReservation: actions.DeleteReservation,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Reservations));
