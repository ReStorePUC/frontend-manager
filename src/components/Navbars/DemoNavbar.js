import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  NavbarBrand,
  Navbar,
  Container,
} from "reactstrap";

import { getValue } from "../../service/storage"


class DemoNavbar extends React.Component {
  state = {
    collapseClasses: "",
    collapseOpen: false,
  };
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };

  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
    
    let user = getValue()
    if (user.IsMasterAdimin) {
      this.setState({
        isAdmin: true,
      })
    }
  }

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out",
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: "",
    });
  };

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to={this.state.isAdmin ? '/admin' : '/loja'} tag={Link}>
                <img
                  alt="..."
                  src={require("assets/img/brand/logo.png")}
                  style={{ width: "150px", height: "50px" }}
                />
              </NavbarBrand>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default DemoNavbar;
