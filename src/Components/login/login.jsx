import React, { useState, useEffect } from "react";
import basestyle from "../../Base.module.css";
import loginstyle from "./Login.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, NavLink } from "react-router-dom";


export default function Login({setUserState})
{
    const navigate=useNavigate();
    const [formErrors,setFormErrors]=useState('');
    const [user,setUser]=useState({
        email:"",
        password:"",
    });
    const [isSubmit, setisSubmit] =useState(false);

    const handleValueChange =(e)=>
    {
        const {id,value}=e.target();
        setUser({
            ...user,
            [id]:value,
    })
    }

    const handleSubmit =(e) =>
    {
       e.preventDefault();
        setFormErrors(validateForm(user));
       setisSubmit(true);
    }

    const validateForm =(values)=>
    {
        const error={};
        const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.email)
        {
            error.email("Email is required");
        }
        else if (regex.test(values.email))
        {
            error.email("Enter valid email");
        }
        if(!values.password)
        {
            error.password("Password is required");
        }
        return error;
    }
    useEffect(()=>
    {
        if(Object.keys(formErrors).length==0 && isSubmit)
        {
            const Admin = { email: "Admin@gmail.com", password: "admin123" };
            const employee = { email: "employee@gmail.com", password: "employee123" };
            const developer = { email: "developer@gmail.com", password: "developer123" };

            if(user.email === Admin.email && user.password === Admin.password)
            {
                toast.success("Login Successfull");
                 setUserState(Admin);
                 navigate("/home",{replace:true})
            }
            if(user.email === employee.email && user.password === employee.password)
            {
                setUserState(employee);
                toast.success("Login Successfull");
                navigate("/home",{replace:true})
            }
            if(user.email === developer.email && user.password === developer.password)
            {
                toast.success("Login Successfull");
                setUserState(developer);
                navigate("/home",{replace:true})
            }
            else
            {
                toast.failure("Login failed");
            }

        }
    },[formErrors,isSubmit])
    return(
    <div  className={`${loginstyle.loginPageContainer}`} >
        <div className={loginstyle.loginFormContainer}>
        <h1>Login</h1>
        <form>
            <input name="email"
            type="email"
            id="email"
            placeholder="Email"
            value={user.email}
            onChange={handleValueChange}
            className={loginstyle.loginFormInput}
            >
            </input>
            <p className={basestyle.error}>{formErrors.email}</p>
            <input name="password"
            type="password"
            id="password"
            placeholder="Password"
            value={user.password}
            onChange={handleValueChange}
            className={loginstyle.loginFormInput}
            >
            <p className={basestyle.error}>{formErrors.password}</p>
            </input>
            <button className={`${basestyle.button_common} `} onClick={handleSubmit}> Submit</button>
            <NavLink to="/signup">Not yet registered? Register Now</NavLink>
        </form>
        </div>
    </div>);
}