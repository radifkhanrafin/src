import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provaiders/AuthProvaider';
import './Header.css'
const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    // console.log(user)
    const handleLogout = () => {
        logOut()
            .then(result => {
                // console.log('logout', result.user)
            })
            .catch(err => {
                // console.log(err)
            })
    }
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {user.displayName}
        </Tooltip>
    );
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='py-3'>
            <Container>
                <Navbar.Brand className='fw-bold'>Most Popular Chef</Navbar.Brand>
                <Navbar.Brand ></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto d-flex gap-3  align-items-lg-center align-items-sm-start">
                        <Link to='/' className='nav-link text-decoration-none text-white fw-bold '>Home</Link>
                        <Link to='/blog' className='nav-link text-decoration-none text-white fw-bold ' >Blogs</Link>
                        <>
                            {
                                user ?
                                    <Link onClick={handleLogout} className='text-decoration-none text-white fw-bold ' >logout</Link>
                                    : <Link className=' text-decoration-none text-white fw-bold ' to='/login'>Login</Link>
                            }
                        </>
                        {user &&
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                            >
                                <span className='rounded-circle'>  <img
                                    style={{ width: '50px', }} className='rounded-circle' src={user.photoURL} alt="" />
                                </span>
                            </OverlayTrigger>

                        }

                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;