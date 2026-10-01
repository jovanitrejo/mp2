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
    const closeToggle = (): void => setIsOpen(false);

    const LINKS: { title: string; ref: string }[] = [
        { title: "Search", ref: "/search" },
        { title: "Recommended", ref: "/recommended" },
        { title: "Trending", ref: "/trending" },
    ]

    return (
        <div>
            <Navbar expand="md">
                <NavbarBrand to="/" tag={Link} onClick={closeToggle} >Entertainment Discovery Service</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto" navbar>
                        {LINKS.map(link => (
                            <NavItem key={link.ref}>
                                <NavLink tag={Link} to={link.ref} onClick={closeToggle} >
                                    {link.title}
                                </NavLink>
                            </NavItem>
                        ))}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default CustomNavbar;