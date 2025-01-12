import React, { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [usernameOremail,setUsernameOremail] = useState("");
  const [password,setPassword] = useState("");
  const [message,setmessage] = useState("");

  const navigate = useNavigate();

  const handlesubmit = async(e) =>{
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({usernameOremail,password}),
          });
          
          const data = await response.json();
          if (response.ok) {

            localStorage.setItem('token', data.token);
            
            setUsernameOremail("");
            setPassword("");
          
            setmessage(data.message || "Login Successful");
            alert("Login Successful");
            navigate('/home');
          } else {
            setmessage(data.message || "Login Failed");
            alert("Login Failed");
          }
        } catch (error) {
          setmessage("Login Failed");
        }
  }

  return (
    <>
    <div className="containers">
     <div className="login-forms">
       <div className="login-form-field">
         <div className="login-input-groupnew">
           <div className="name-password-login-buttonnew">
             {/* User Icon */}
             <form onSubmit={handlesubmit}>
               {/* Name Field */}
               <div className="name">
               
                 <input
                   type="text"
                   name="user-name"
                   id="user-name"
                   placeholder=" Email or username"
                   value={usernameOremail}
                   onChange={(e) => setUsernameOremail(e.target.value)}
                 />
               </div>
               {/* Password Field */}
               <div className="password">
   
                 <input
                   type="password"
                   name="password"
                   id="user-password"
                   placeholder="Password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                 />
               </div>
               {/* Login Button Field */}
               <div className="login-btn">
                 <button type="submit">Log In</button>
               </div>
             </form>  
             {/* Forget Password and Sign Up Field */}
             <div className="forget-password-sign-up-container">
               <div className="forget-password">
                 <a href="#">Forget Password?</a>
               </div>
               <div className="sign-up">
                 <a href="#">Sign Up</a>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
   
       </>
  )
}

export default Login