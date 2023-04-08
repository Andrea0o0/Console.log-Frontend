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
  const navigate = useNavigate();

  const emailRegex = /([a-z]|[A-Z]|[0-9]|[_-])@gmail.com|@email.com|@hotmail.com/
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/; // 8 characters long, 1 number and 1 uppercase letter
  const usernameRegex = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  // console.log(validValues)
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    name !== passwordControl &&
    setUser(prev => {
        return {
            ...prev,
            [name]: name === 'email' ? value.toLowerCase():value
        }
    });
      
      setValidValues(prev => {
        return {
              ...prev,
              [name]: name === 'username' ? usernameRegex.test(value):name === 'email' ? emailRegex.test(value):passwordRegex.test(value)
          }
      })
}

const test = Object.keys(validValues).filter((key,i) => validValues[key] === true)
// console.log(test,Object.keys(validValues).length)
  const handleSubmit = async (e) => {
    e.preventDefault();
    password !== passwordControl && setValidValues(prev => {
      return {
        ...prev,
        password_passwordControl:false
      }
    })
    if(Object.keys(validValues).filter((key,i) => validValues[key] === true).length === Object.keys(validValues).length){
        try {
        await authService.signup({ username: user.username, email: user.email, password });
        navigate('/login');
      } catch (error) {
        console.error(error)
        // setErrorMessage('Unable to create user account')
      }
    }
    else{
      let result = Object.assign({}, validValues)
      // Object.keys(validValues).filter((key,i) => result[key] = false)
      result.password = false
      result.passwordControl = false
      setValidValues(result)
    }     
  }

  const inputStyle = "w-full rounded-full bg-transparent  border-2  shadow-xl p-4 ";
  const validStyle = "text-green-500 border-green-500 validInput ";
  const invalidStyle = "text-red-500 border-red-500 invalidInput ";

  return (
    <div className="h-screen px-4 signup">
      <form className="h-96 flex flex-col align-center justify-around mt-4" onSubmit={handleSubmit}>
      <div className="flex flex-wrap justify-start w-full text-center mt-6">
        <label>Username</label>
          <input 
            required 
            type="text" 
            name="username" 
            placeholder="katabuaja"
            className={inputStyle + (validValues.username === true ? validStyle : validValues.username === false ? invalidStyle : "")}
            value={user.username} 
            onChange={handleChange} 
          />
          {validValues.username === false && <p className=" text-red-input border-red-input text-center w-95">Enter a valid username of at least 8 characters</p> }
      </div>
      <div className="flex flex-wrap justify-start w-full text-center mt-3">
        <label>Email</label>
          <input 
            required 
            type="email" 
            name="email" 
            value={user.email} 
            placeholder="example@gmail.com"
            className={inputStyle + (validValues.email === true ? validStyle : validValues.email === false ? invalidStyle : "")}
            onChange={handleChange} 
          />
          {validValues.email === false && <p className=" text-red-input border-red-input text-center w-80">Enter a valid email</p> }
      </div>
      <div className="flex flex-wrap justify-start w-full text-center mt-3">
        <label>Password</label>
        <div className='flex items-center h-12 content-center'>
          <input 
            required 
            type={eye.password ? "password":"text"}
            name="password" 
            value={password}
            placeholder={"***********"}
            className={inputStyle + (validValues.password === true && validValues.password_passwordControl !== false ? validStyle : validValues.password === false ? invalidStyle : "")+"mr-4"}
            onChange={(e) => {setPassword(e.target.value);
            handleChange(e)}} 
          />
          <FontAwesomeIcon icon={eye.password ? 'fa-solid fa-eye-slash': 'fa-solid fa-eye'} size="sm" style={{color: `${validValues.password === true ? "#67b04b" : validValues.password === false ? "#c05c48" : "#ffffff"}`,}} onClick={() => setEye(prev => {return {...prev,password:!eye.password}})} className='mb-3' />
        </div>
        {validValues.password === false && <p className=" text-red-input border-red-input text-center w-80">Type number, upper & lower case and at least 6 characters</p> }
      </div>
      <div className="flex flex-wrap justify-start w-full text-center mt-3">
        <label>Repeat the password</label>
        <div className='flex items-center h-12'>
          <input 
            required 
            type={eye.passwordControl ? "password":"text"}
            name="passwordControl" 
            value={passwordControl}
            placeholder={"***********"}
            className={inputStyle + (validValues.passwordControl === true && validValues.password_passwordControl !== false ? validStyle : validValues.passwordControl === false ? invalidStyle : "")+"mr-4"}
            onChange={(e) => {setPasswordControl(e.target.value);
            handleChange(e)}} 
          />
          <FontAwesomeIcon icon={eye.passwordControl ? 'fa-solid fa-eye-slash': 'fa-solid fa-eye'} size="sm" style={{color: `${validValues.passwordControl === true ? "#67b04b" : validValues.passwordControl === false ? "#c05c48" : "#ffffff"}`,}} onClick={() => setEye(prev => {return {...prev,passwordControl:!eye.passwordControl}})} className='mb-3' />
        </div>
        {validValues.passwordControl === false && <p className=" text-red-input border-red-input text-center w-80">Type number, upper & lower case and at least 8 characters</p> }
      </div>

        <div className="flex flex-wrap w-full text-center mt-10 ">
          <button type="submit" 
        className={inputStyle + "p-2 rounded-full w-80" + Object.keys(validValues).filter((key,i) => validValues[key] === false).length>0 ? "text-red-input border-red-input": Object.keys(validValues).filter((key,i) => validValues[key] === true).length>0 ? "text-green-input border-green-input":"text-white border-white"}
        >Register</button>
        {validValues.password_passwordControl === false && <p className=" text-red-input border-red-input text-center w-80">Passwords do not match</p> }
        </div>
      </form>
    </div>
  )
}
