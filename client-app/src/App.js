import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { store } from "./actions/store";
import { Provider } from "react-redux";
import Cars from "./components/Car/Cars";
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Calendar from "./components/Home/Calendar";
import { connect } from "react-redux";
import Login from "./components/Auth/Login/login";
import Register from "./components/Auth/Register/register";
import Profile from "./components/Auth/Profile";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/auth";
import { createBrowserHistory } from "history";
import BoardAdmin from "./components/AdminPanel/BoardAdmin";
import Reservations from "./components/Reservation/Reservations";

export const history = createBrowserHistory();

// export default class App extends React.Component {
//   render() {
//     return (
//       <Router>
//         <Nav />
//         <Switch>
//           <Route path="/home">
//             <Calendar />
//           </Route>
//           <Route exact path="/cars">
//             <Provider store={store}>
//               <ToastProvider autoDismiss={true}>
//                 <Container maxWidth="lg">
//                   <Cars />
//                 </Container>
//               </ToastProvider>
//             </Provider>
//           </Route>
//           <Route path="/about">{/* <Abouast /> */}</Route>
//           <Route path="/dashboard">{/* <Dashboard /> */}</Route>
//         </Switch>
//       </Router>
//     );
//   }
// }
class App extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        // showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.isAdmin,
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/home"} className="navbar-brand">
              Car Fleet
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/reservations"} className="nav-link">
                  Reservations
                </Link>
              </li>
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/cars"} className="nav-link">
                    Cars
                  </Link>
                </li>
              )}
              {/* <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Profile
                </Link>
              </li> */}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Users
                  </Link>
                </li>
              )}

              {/* {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )} */}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    Log out
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]}>
                <ToastProvider autoDismiss={true}>
                  <Container maxWidth="lg">
                    <Calendar />
                  </Container>
                </ToastProvider>
              </Route>
              <Route exact path="/cars">
                <ToastProvider autoDismiss={true}>
                  <Container maxWidth="lg">
                    <Cars />
                  </Container>
                </ToastProvider>
              </Route>
              <Route exact path="/reservations">
                <ToastProvider autoDismiss={true}>
                  <Container maxWidth="lg">
                    <Reservations />
                  </Container>
                </ToastProvider>
              </Route>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              {/* <Route exact path="/profile" component={Profile} /> */}
              <Route exact path="/admin">
                <ToastProvider autoDismiss={true}>
                  <Container maxWidth="lg">
                    <BoardAdmin />
                  </Container>
                </ToastProvider>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
