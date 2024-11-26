import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../../redux/api/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {
    const [username, setUsername] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation(); // Fixed typo `isLodaing` to `isLoading`
    const { userInfo } = useSelector(state => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

     

        try {
            const userData = await register({username, email, password }).unwrap();
            dispatch(setCredentials({ ...userData }));
            toast.success("Registration successful");
            navigate(redirect);
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || "Invalid credentials");
        }
    };

    return (
        <section className='pl-[10rem] flex'>
            <div className='mr-[4rem] mt-[5rem]'>
                <h1 className='text-2xl font-semibold mb-4'>Register</h1>
                <form onSubmit={handleSubmit} className='container w-[40rem]'>
                    <div className='my-[2rem]'>
                        <label htmlFor="username" className='block text-sm font-medium text-white'>Username</label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            required
                            className='mt-1 p-2 border rounded w-full'
                            placeholder='Enter Username'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='my-[2rem]'>
                        <label htmlFor="email" className='block text-sm font-medium text-white'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email' 
                            required
                            className='mt-1 p-2 border rounded w-full'
                            placeholder='Enter email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='my-[2rem]'>
                        <label htmlFor="password" className='block text-sm font-medium text-white'>Password</label>
                        <input
                            type='password' 
                            id='password'
                            name='password'
                            required
                            className='mt-1 p-2 border rounded w-full'
                            placeholder='Enter password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='my-[2rem]'>
                        <label htmlFor="confirmPassword" className='block text-sm font-medium text-white'>Confirm Password</label>
                        <input
                            type='password'
                            id='confirmPassword' 
                            name='confirmPassword' 
                            required
                            className='mt-1 p-2 border rounded w-full'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        disabled={isLoading}
                        type='submit'
                        className='bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]'
                    >
                        {isLoading ? "Registering....." : "Register"}
                    </button>

                    {isLoading && <Loader />}
                    <div className='mt-4'>
                        <p className='text-white'>
                            Already have an account? {""}
                            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} className='text-pink-500 hover:underline'>
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>


            <img src="https://cdn-cm.freepik.com/resources/be4da886-bbdd-400d-bff6-100ee4ab2292.jpg?token=exp=1732275664~hmac=798cd259fe609e15995775deea97074fe43d953a19ff4c8211c2b0fee910e39a" className='h-[55.5rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg' alt="registerBg" />
        </section>
    );
};

export default Register;
