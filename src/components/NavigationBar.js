
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { HashLink } from 'react-router-hash-link';
import logo_white from "../assets/logo-white.png"
import "./NavigationBar.css"
function NavigationBar() {

    const [navbar, setNavbar] = useState(false)
    const changeBackground = () => {

        if (window.scrollY >= 150) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }

    useEffect(() => {
        changeBackground()

        window.addEventListener("scroll", changeBackground)
    })
    return (
        <Navbar collapseOnSelect expand="lg" variant={navbar ? "light" : "dark"} className={`py-2  ${navbar ? "bg-light" : "text-white"}`} fixed="top"  >
            <Container className='text-decoration-none'>
                <Navbar.Brand href="#home"> <HashLink to="#home" className='linkDecoration' smooth> <img style={{ height: "40px", width: "100%" }} className='text-white' src={logo_white} /></HashLink></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Item className='linkSpacing' >
                            <HashLink to="#home" className='linkDecoration' smooth> Home</HashLink>
                        </Nav.Item>
                        <Nav.Item className='linkSpacing'>
                            <HashLink to="#team" className='linkDecoration' smooth> About us</HashLink>
                        </Nav.Item>

                    </Nav>
                    <Nav>
                        <Nav.Item className='linkSpacing'>
                            <HashLink to="#geomag" className='linkDecoration' smooth> Geomagnetic Parameters</HashLink>
                        </Nav.Item>
                        <Nav.Item className='linkSpacing'>
                            <HashLink to="#threed" className='linkDecoration' smooth> ThreeDimentional Plot</HashLink>
                        </Nav.Item>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;