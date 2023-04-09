import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import authService from '../../services/authService';

export default function Signup() {
  const [user, setUser] = useState({
    username:'',
    email:'',
    password:''
  })
  const [eye,setEye] = useState({password:true,passwordControl:true})
  const [password, setPassword] = useState('');
  const [passwordControl, setPasswordControl] = useState('');
  const [validValues, setValidValues] = useState({username:'',email:'',password:'',passwordControl:'',password_passwordControl:''});
  const [errorMessage,setErrorMessage] = useState('')
  const navigate = useNavigate();

  const emailRegex = /([a-z]|[A-Z]|[0-9]|[_-])@gmail.com|@email.com|@hotmail.com/
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/; // 8 characters long, 1 number and 1 uppercase letter
  const usernameRegex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    name !== 'passwordControl' &&
    setUser(prev => {
        return {
            ...prev,
            [name]: name === 'email' ? value.toLowerCase():value
        }
    });

    if(name === 'passwordControl' || name === 'password'){
      let result = Object.assign({}, validValues)
      passwordRegex.test(password) && (result.password=true)
      passwordRegex.test(passwordControl) && (result.passwordControl=true)
      setValidValues(result)
    } 
      
      setValidValues(prev => {
        return {
              ...prev,
              [name]: name === 'username' ? usernameRegex.test(value):name === 'email' ? emailRegex.test(value):passwordRegex.test(value)
          }
      })
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('')
    const result = Object.assign({}, validValues)
    password === passwordControl && (result.password_passwordControl=true) 
    setValidValues(result)
    if(Object.keys(result).filter((key,i) => result[key] === true).length === Object.keys(result).length){
        try {
        await authService.signup({ username: user.username, email: user.email, password });
        navigate('/login');
      } catch (error) {
        setErrorMessage(error.response.data.message)
        error.response.data.message.includes('User already exists with email') ?setValidValues(prev => {return{...prev,email:false}}):setValidValues(prev => {return{...prev,username:false}})
      } 
    }
  }

  useEffect(() => {
    password !== passwordControl && password!=='' && passwordControl!=='' && setValidValues(prev => {
      return {
        ...prev,
        password_passwordControl:false,
        password:false,
        passwordControl:false
      }
    })
    password === passwordControl && password!=='' && passwordControl!=='' && setValidValues(prev => {
      return {
        ...prev,
        password_passwordControl:true
      }
    })
  },[password,passwordControl])

  const inputStyle = "w-full rounded-lg bg-transparent  border-2 shadow-xl p-4 ";
  const validStyle = "text-green-input border-green-input validInput ";
  const invalidStyle = "text-red-input border-red-input invalidInput ";
  
  return (
    <div className="h-screen px-4 signup">
      <form className="h-96 flex flex-col align-center justify-around mt-4" onSubmit={handleSubmit}>
      <div className="flex flex-wrap justify-start w-full text-center mt-6">
        <label>Username</label>
          <input 
            required 
            type="text" 
            name="username" 
            placeholder="Console_KataD"
            className={inputStyle + (validValues.username === true ? validStyle : validValues.username === false ? invalidStyle : "")}
            value={user.username} 
            onChange={handleChange} 
          />
          {validValues.username === false && <p className=" text-red-input border-red-input text-center w-95">{validValues.username === false && errorMessage!=="" ? errorMessage: "Enter a valid username of at least 8 characters"}</p> }
      </div>
      <div className="flex flex-wrap justify-start w-full text-center mt-3">
        <label>Email</label>
          <input 
            required 
            type="email" 
            name="email" 
            value={user.email} 
            placeholder="kata@gmail.com"
            className={inputStyle + (validValues.email === true ? validStyle : validValues.email === false ? invalidStyle : "")}
            onChange={handleChange} 
          />
          {validValues.email === false && <p className=" text-red-input border-red-input text-center w-80">{validValues.email === false && errorMessage!=="" ? errorMessage: 'Enter a valid email'}</p> }
      </div>
      <div className="flex flex-wrap justify-start w-full text-center mt-3">
        <label>Password</label>
        <div className='flex items-end'>
          <input 
            required 
            type={eye.password ? "password":"text"}
            name="password" 
            value={password}
            placeholder={eye.password ? "***********":"SecretPassword"}
            className={inputStyle + (validValues.password === true ? validStyle : validValues.password === false ? invalidStyle : "")+"mr-4"}
            onChange={(e) => {setPassword(e.target.value);
            handleChange(e)}} 
          />
          <FontAwesomeIcon icon={eye.password ? 'fa-solid fa-eye-slash': 'fa-solid fa-eye'} size="sm" style={{color: `${validValues.password === true ? "#67b04b" : validValues.password === false ? "#c05c48" : "#ffffff"}`,}} onClick={() => setEye(prev => {return {...prev,password:!eye.password}})} className='mb-3' />
        </div>
        {validValues.password === false && validValues.password_passwordControl !== false && <p className=" text-red-input border-red-input text-center w-80">Type number, upper & lower case and at least 8 characters</p> }
      </div>
      <div className="flex flex-wrap justify-start w-full text-center mt-3">
        <label>Repeat the password</label>
        <div className='flex items-end'>
          <input 
            required 
            type={eye.passwordControl ? "password":"text"}
            name="passwordControl" 
            value={passwordControl}
            placeholder={eye.passwordControl ? "***********":"SecretPassword"}
            className={inputStyle + (validValues.passwordControl === true ? validStyle : validValues.passwordControl === false ? invalidStyle : "")+"mr-4"}
            onChange={(e) => {setPasswordControl(e.target.value);
            handleChange(e)}} 
          />
          <FontAwesomeIcon icon={eye.passwordControl ? 'fa-solid fa-eye-slash': 'fa-solid fa-eye'} size="sm" style={{color: `${validValues.passwordControl === true ? "#67b04b" : validValues.passwordControl === false ? "#c05c48" : "#ffffff"}`,}} onClick={() => setEye(prev => {return {...prev,passwordControl:!eye.passwordControl}})} className='mb-3' />
        </div>
        {validValues.passwordControl === false && validValues.password_passwordControl !== false && <p className=" text-red-input border-red-input text-center w-80">Type number, upper & lower case and at least 8 characters</p> }
      </div>

        <div className="flex flex-wrap w-full text-center mt-10 ">
          <button type="sumbit" className={(Object.keys(validValues).filter((key,i) => validValues[key] === false).length>0 ? invalidStyle: Object.keys(validValues).filter((key,i) => validValues[key] === true).length === Object.keys(validValues).length ? validStyle:"border-2 border-white text-white") + inputStyle} >Register</button>
          {validValues.password_passwordControl === false||errorMessage!=='' ? <p className="text-red-input text-center w-80">{validValues.password_passwordControl === false ? "Passwords do not match": errorMessage !== '' && errorMessage }</p>:'' }
        </div>
        
      </form>
    </div>
  )
}
