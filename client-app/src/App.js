import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { store } from "./actions/store";
import { Provider } from "react-redux";
import Cars from "./components/Car/Cars";
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Calendar from "./components/Home/Calendar";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route path="/home">
            <Calendar />
          </Route>
          <Route exact path="/cars">
            <Provider store={store}>
              <ToastProvider autoDismiss={true}>
                <Container maxWidth="lg">
                  <Cars />
                </Container>
              </ToastProvider>
            </Provider>
          </Route>
          <Route path="/about">{/* <About /> */}</Route>
          <Route path="/dashboard">{/* <Dashboard /> */}</Route>
        </Switch>
      </Router>
    );
  }
}
