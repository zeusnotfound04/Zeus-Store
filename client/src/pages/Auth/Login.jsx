import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '../../redux/api/usersApiSlice';
import { logout } from '../../redux/features/auth/authSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import  Loader  from '../../components/Loader';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    try {
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials({...userData}));
      toast.success('Login successful!');
      navigate(redirect);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || 'Invalid credentials');
    }
  };




  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

          <form onSubmit={handleSubmit} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="my-[2rem]">
              <label htmlFor="password" className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
              {isLoading ? 'Signing In...... ' : 'Sign In'}

              {isLoading && <Loader/>}
            </button>
          </form>
          <div className="mt-4">
            <p className="text-white">
              Don't have an account?{' '}
              <Link to="/register" className="text-pink-500 hover:underline">
                Register
              </Link>
            </p>
          </div>


        </div>


        <img src="https://cdn-cm.freepik.com/resources/53178aa4-02db-4f12-a0d4-b1c08e524df0.jpg?token=exp=1732275987~hmac=1b34b633fd579c13448d146f0e6e0f2be0b6e1bde4dd18ed2308fe707f7fd82f" className='h-[55.5rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg' alt="loginBg" />
      </section>
    </div>
  );
};

export default Login;
