import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();
    const location = useLocation(); // Access the location object

    const handleLogout = async () => {
        try {
            await logOut();
            navigate('/login');
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleLogin = async () => {
        try {
            navigate('/login');
        } catch (error) {
            console.log(error.message);
        }
    };

    const isDashboard = location.pathname === '/dashboard';
    const dashboardLabel = isDashboard ? 'Dashboard' : 'Create Vote';

    return (
        <div className='shadow-md w-full fixed top-0 left-0 absolute'>
            <div className='md:flex items-center justify-between bg-gray-200 py-2 md:px-10 px-7'>
                <div className='font-bold text-3xl cursor-pointer flex items-center font-[Poppins] text-gray-800'>
                    <span className='text-4xl text-indigo-600 mr-2'>
                        <ion-icon name='cube'></ion-icon>
                    </span>
                    <span className='text-xl md:text-2xl lg:text-3xl xl:text-4xl'>
                        Vote.com
                    </span>
                </div>

                <ul className='md:flex md:items-center'>
                    {isDashboard && (
                        <li className='md:ml-8 text-xl'>
                            <Link
                                to={isDashboard ? '/create-vote' : '/dashboard'}
                                className='text-gray-800 no-underline font-bold text-1xl py-2 hover:text-gray-400 duration-500'
                            >
                                {dashboardLabel}
                            </Link>
                        </li>
                    )}
                    {user ? (
                        <Button
                            variant='primary'
                            onClick={handleLogout}
                            className='ml-4 px-4 py-2 bg-blue-300 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800'
                        >
                            LogOut
                        </Button>
                    ) : (
                        <Button
                            variant='primary'
                            onClick={handleLogin}
                            className='ml-4 px-4 py-2 bg-blue-300 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800'
                        >
                            LogIn
                        </Button>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
