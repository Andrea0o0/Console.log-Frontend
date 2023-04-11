import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';
import Github from './GitHubLogin';
import Google from './Google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToSignup from '../../assets/images/Signup/Arrow to login.svg'

export default function Login() {
  const { storeToken, authenticateUser, isLoggedIn } = useAuth(); 
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [eye,setEye] = useState(true)
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [validValues, setValidValues] = useState({email:'',password:''});
  const [backhover,setHover] = useState(false)
  const navigate = useNavigate();

  const emailRegex = /([a-z]|[A-Z]|[0-9]|[_-])@gmail.com|@email.com|@hotmail.com/
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/; // 8 

  const handleChange = (e) => {
    const {name,value} = e.target
    setUser(prev => {
      return {
        ...prev,
        [name]: name === 'email' ? value.toLowerCase():value
      }
    })

    setValidValues(prev => {
      return {
            ...prev,
            [name]: name === 'email' ? emailRegex.test(value):passwordRegex.test(value)
        }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validValues.password && validValues.email ){
        try {
        const response = await authService.login(user)
        if (response.authToken) {
          storeToken(response.authToken);
          authenticateUser();
          navigate('/');
          toast.success('Welcome back!')
        } else {
          setErrorMessage('Unable to authenticate user')
        }
      } catch (error) {
        setErrorMessage('Unable to authenticate user');
      }
    }    
  }

  useEffect(() => {
    // When the component first renders, check if user is already logged in and redirects
    if (isLoggedIn) {
      navigate('/')
    }
    // eslint-disable-next-line
  }, [isLoggedIn])

  const inputStyle = "w-full rounded-lg bg-transparent border-2 shadow-xl p-2 ";
  const validStyle = "text-green-input border-green-input validInput ";
  const invalidStyle = "text-red-input border-red-input invalidInput ";

  return (
    <div className='flex justify-center text-sm'>
      <div className='login p-2'>
      <div className='mb-4'>
      <Link to='/signup'><li className='tologin flex cursor-pointer text-white items-center justify-center m-0 pb-1' onMouseEnter={() => setHover(prev => !prev)}
        onMouseLeave={() => setHover(prev =>!prev)}>
        {backhover ? <img width='5%' className='pr-2' src={ToSignup} alt='back'/>:<FontAwesomeIcon className='pr-2' icon="fa-solid fa-arrow-right fa-sm" />} Click here to Signup if you don't have an account
           </li></Link>
      </div>
        <div className={"w-full border-2 "+(Object.keys(validValues).filter((key,i) => validValues[key] === false).length>0 ? "border-red-input text-red-input": Object.keys(validValues).filter((key,i) => validValues[key] === true).length === Object.keys(validValues).length ? "border-green-input text-green-input":"border-white text-white")+ " p-4 rounded-lg"}>
          <form className='flex flex-col align-center justify-around' onSubmit={handleSubmit}>
          <div className="w-full flex flex-wrap justify-start w-full mt-3">
            <label className='w-full mr-6'>Email</label>
              <input 
                required 
                type="email" 
                name="email" 
                value={user.email} 
                placeholder="kata@gmail.com"
                className={inputStyle + (validValues.email === true ? validStyle : validValues.email === false ? invalidStyle : "")+" mr-6 "}
              onChange={handleChange} 
              />
              {validValues.email === false && <p className=" text-red-input border-red-input  w-full mr-6">Enter a valid email</p> }
          </div>
          <div className="flex flex-wrap justify-start w-full  mt-3">
          <label className='w-full mr-6'>Password</label>
          <div className='w-full flex items-end'>
            <input 
              required 
              type={eye? "password":"text"}
              name="password" 
              value={user.password}
              placeholder={eye ? "***********":"SecretPassword"}
              className={inputStyle + (validValues.password === true ? validStyle : validValues.password === false ? invalidStyle : "")+" w-full mr-2 "}
              onChange={handleChange} 
            />
            <FontAwesomeIcon icon={eye ? 'fa-solid fa-eye-slash': 'fa-solid fa-eye'} size="sm" style={{color: `${validValues.password === true ? "#67b04b" : validValues.password === false ? "#c05c48" : "#ffffff"}`,}} onClick={() => setEye(prev => !prev)} className='mb-3' />
          </div>
          {validValues.password === false && <p className=" text-red-input border-red-input  w-80">Type number, upper & lower case and at least 8 characters</p> }
        </div>
        <div className="flex flex-wrap w-full  mt-10 ">
            <button type="sumbit" className={(Object.keys(validValues).filter((key,i) => validValues[key] === false).length>0 ? invalidStyle: Object.keys(validValues).filter((key,i) => validValues[key] === true).length === Object.keys(validValues).length ? validStyle:"w-full border-2 border-white text-white") + inputStyle} >Log in</button>
            {validValues.password_passwordControl === false ? <p className=" text-red-input  w-80">Passwords do not match</p>: errorMessage !== undefined && <p className=" text-red-input  w-80">{errorMessage}</p> }
          </div>
        </form>
        </div>
        {/* <div>
          <LoginGG/>
        </div> */}
        <div className='flex justify-center mt-6'>
                <Github/>
                <Google/>
        </div> 
             
      </div>
    </div>
  )
}
