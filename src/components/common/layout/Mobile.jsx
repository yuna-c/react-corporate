import "./Mobile.scss";
import { NavLink, Link } from "react-router-dom";

export default function Mobile() {
  return (
    <div className="Mobile">
      <div className="gnb-layout">
        <ul>
          <li>
            <NavLink to="/aboutUs" activeClassName={"on"}>
              AboutUs
            </NavLink>
          </li>
          <li>
            <NavLink to="/youtube" activeClassName={"on"}>
              Youtube
            </NavLink>
          </li>
          <li>
            <NavLink to="/gallery" activeClassName={"on"}>
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink to="/community" activeClassName={"on"}>
              Community
            </NavLink>
          </li>
          <li>
            <NavLink to="/members" activeClassName={"on"}>
              Members
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" activeClassName={"on"}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
