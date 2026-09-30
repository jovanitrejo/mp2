import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

export function CustomNavbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggle = (): void => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar expand="md">
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto" navbar>
                        <NavItem>
                            <NavLink href="/">
                                Search
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/">
                                Recommended
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/">
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