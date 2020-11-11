import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/admin";
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
  Checkbox,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import BoardAdminForm from "./BoardAdminForm";

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

export const BoardAdmin = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.fetchAllUsers();
  }, []); //componentDidMount

  //toast msg.
  const { addToast } = useToasts();

  const onDeleteUser = (id) => {
    if (window.confirm("Are you sure to delete this record?"))
      props.deleteUser(id, () =>
        addToast("Deleted successfully", { appearance: "info" })
      );
  };
  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container>
        <Grid item xs={6}>
          <BoardAdminForm {...{ currentId, setCurrentId }} />
        </Grid>
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>isAdmin</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.userList.map((record, index) => {
                  return (
                    <TableRow key={index} hover>
                      <TableCell>{record.username}</TableCell>
                      <TableCell>{record.email}</TableCell>
                      <TableCell>
                        <Checkbox checked={record.isAdmin} disabled />
                      </TableCell>
                      <TableCell>
                        <ButtonGroup variant="text">
                          <Button>
                            <EditIcon
                              color="primary"
                              onClick={() => {
                                setCurrentId(record.id);
                              }}
                            />
                          </Button>
                          <Button>
                            <DeleteIcon
                              color="secondary"
                              onClick={() => onDeleteUser(record.id)}
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
  userList: state.admin.list,
});

const mapActionToProps = {
  fetchAllUsers: actions.fetchAllUsers,
  deleteUser: actions.DeleteUser,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(BoardAdmin));
