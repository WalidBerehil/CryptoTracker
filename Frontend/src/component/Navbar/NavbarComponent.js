import React from 'react'
import {Container, Nav, Navbar} from 'react-bootstrap'
import {useHistory} from 'react-router-dom/cjs/react-router-dom.min';


const NavbarComponent = () => {
    let history = useHistory();

    function logout() {
        localStorage.removeItem("user-token");
        history.push('/login')
    }


    return (
        <Navbar collapseOnSelect expand="lg" variant="dark">
            <Container>
                <Navbar.Brand href="#home">CryptoTracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                    </Nav>

                    {
                    localStorage.getItem('user-token') ? (
                        <Nav>
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        </Nav>
                    ) : (
                        <Nav>
                            <Nav.Link href="login">Login</Nav.Link>
                            <Nav.Link href="register">Register</Nav.Link>
                        </Nav>
                    )
                } </Navbar.Collapse>
            </Container>
        </Navbar>
    )


}

export default NavbarComponent
