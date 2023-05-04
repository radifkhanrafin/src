import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provaiders/AuthProvaider';
import { FaBeer, FaGithub, FaGoogle } from 'react-icons/fa';

const Login = () => {
    const { signIn, githubLogin, googleLogin } = useContext(AuthContext)
    const [err, setErr] = useState([])
    const navigate=useNavigate()
    const location=useLocation();
    const from=location.state?.from?.pathname || '/'

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        signIn(email, password)
            .then(result => {
                const logedUser = result.user;
                // setUser(logedUser)
                // navigate(from , {replace:true})
                console.log(logedUser)
                setErr('Login Success')
                navigate(from , {replace:true})
            })
            .catch(error => {
                setErr(error)
                console.log(error.message)
            })
    }
    const handlegithubLogin = () => {
        githubLogin()
            .then(result => {
                const gitLogin = result.user;
                console.log(gitLogin)
                navigate(from , {replace:true})
            })
            .catch(error => {
                console.log(error)
            })
    }
    const handlegoogleLogin = () => {
        googleLogin()
            .then(result => {
                const gitLogin = result.user;
                console.log(gitLogin)
                navigate(from , {replace:true})
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className='w-50 mx-auto '>
            <h3 className='text-center my-5 py-5'>Please Login</h3>
            <div className='d-flex justify-content-between mb-5 flex-column gap-3  flex-lg-row  ' >
                <Button onClick={handlegoogleLogin} variant='outline-primary' className='px-3 py-2 '>login with <FaGoogle className='text-danger' /> </Button>
                <Button onClick={handlegithubLogin} variant="outline-secondary" className='px-3 py-2'>login with <FaGithub className='text-dark' /></Button>
            </div>
            <p className='text-center'>or</p>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                    <Form.Label >Email address</Form.Label>
                    <Form.Control name='email' type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" />
                    {/* <button onClick={()=>{setShowPass(!showPass)}}>{showPass ? 'Show' : 'Hide'}</button> */}
                </Form.Group>
                <p>{err && err.message}</p>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <p className='mt-2'>Dont’t Have An Account ?<Link className='' to='/register'> Register </Link> </p>
            </Form>
            <br />


        </div>
    );
};

export default Login;