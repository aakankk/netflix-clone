import React from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import banner from '../../assets/background_banner.jpg';
import { login, signup } from '../../firebase';
import netflix_spinner from '../../assets/netflix_spinner.gif';

const Login = () => {
  const [signState, setSignState] = React.useState('Sign In');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const user_auth = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (signState === 'Sign In') {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      setLoading(false);
    } 
    catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    loading?<div className='login-spinner'>
    <img src={netflix_spinner} alt="" />:
    </div>:
    <div className='login' 
         style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <img src={logo} alt="logo" className='Login-logo' />
      <div className='login-form'>
        <h1>{signState}</h1>
        <form onSubmit={user_auth}>
          {signState === 'Sign Up' && (
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your Name" required />
          )}
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
          <button type='submit'>{signState}</button>

          <div className='form-help'>
            <div className='remember'>
              <input type="checkbox" />
              <label>Remember me</label>
            </div>
            <p>Need help?</p>
          </div>
        </form>

        <div className='form-switch'>
          {signState === 'Sign In' ? (
            <p>New to Netflix? <span onClick={() => setSignState('Sign Up')}>Sign up now</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setSignState('Sign In')}>Sign in now</span></p>
          )}
        </div>
      </div>
    </div>
  )
}
export default Login
