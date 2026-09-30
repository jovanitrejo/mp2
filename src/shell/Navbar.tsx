import { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import { Link } from 'react-router';

export function CustomNavbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggle = (): void => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar expand="md">
                <NavbarBrand to="/" tag={Link} >Entertainment Discovery Service</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/search">
                                Search
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/recommended">
                                Recommended
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/trending">
                                Trending
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default CustomNavbar;