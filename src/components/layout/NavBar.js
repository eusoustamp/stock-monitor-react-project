import React, {useState} from 'react';
import { Link } from 'react-router-dom';
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from 'reactstrap';
import logo from '../../logo.png';
import '../../App.css';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
          <Navbar  light expand="md">
            <NavbarBrand><Link exact to = '/' style={{ textDecoration: 'none' }}><img src={logo} /></Link></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink active>
                    <Link to = '/stocks'>Search for Stocks</Link>
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
    )
}