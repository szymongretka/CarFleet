import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/navbar.css";

export default class Nav extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <NavLink
          exact
          activeClassName="navbar__link--active"
          className="navbar__link"
          to="/home"
        >
          Home
        </NavLink>
        <NavLink
          exact
          activeClassName="navbar__link--active"
          className="navbar__link"
          to="/cars"
        >
          Cars
        </NavLink>
        <NavLink
          activeClassName="navbar__link--active"
          className="navbar__link"
          to="/products"
        >
          Products
        </NavLink>
        <NavLink
          activeClassName="navbar__link--active"
          className="navbar__link"
          to="/contacts"
        >
          Contacts
        </NavLink>
      </nav>
      // <nav className="Nav">
      //   <div className="Nav__container">
      //     <Link to="/" className="Nav__brand">
      //       <img src="logo.svg" className="Nav__logo" />
      //     </Link>

      //     <div className="Nav__right">
      //       <ul className="Nav__item-wrapper">
      //         <li className="Nav__item">
      //           <Link className="Nav__link" to="/cars">
      //             Cars
      //           </Link>
      //         </li>
      //         <li className="Nav__item">
      //           <Link className="Nav__link" to="/path2">
      //             Link 2
      //           </Link>
      //         </li>
      //         <li className="Nav__item">
      //           <Link className="Nav__link" to="/path3">
      //             Link 3
      //           </Link>
      //         </li>
      //       </ul>
      //     </div>
      //   </div>
      // </nav>
    );
  }
}
