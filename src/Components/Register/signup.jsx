import React, { useState, useEffect } from "react";
import basestyle from "../../Base.module.css";
import loginstyle from "./Login.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, NavLink } from "react-router-dom";

export default function Signup()
{
    const [user,setUser]=useState(
        {
            fname : "",
            lname:"",
            email:"",
            number:"",
            password:"",
            cpassword:"",
        });

    const [formErrors,setFormErrors]=useState({});
    function handleChange(e)
    {
        const [name,value]=e.target;
        setUser(
            {
                ...user,
                [name]:value,
            } 
        );
    };

    function handleSubmit()
    { 
        e.preventDefault();
        setFormErrors(validateForm(values))
        setIsSubmit(true);
    }
    function validateForm(values)
    {
        const error = {};
        const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const mobile=/^\d{10}$/i;
        if (!values.fname) {
            error.fname = "First name is required";
        }
        if (!values.lname) {
            error.lname = "Last name is required";
        }
    
        if (!values.email) {
            error.email = "Email is required";
        } else if (!regex.test(values.email)) {
            error.email = "This is not a valid email format!";
        }

        if (!values.mobileNumber) {
            error.mobileNumber = "Mobile Number is required";
        }
        else if(!mobile.test(values.mobileNumber))
        {
            error.mobileNumber="This is not a valid mobile number";
        }
        if (!values.password) {
            error.password = "Password is required";
        } else if (values.password.length < 4) {
            error.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            error.password = "Password cannot exceed more than 10 characters";
        }
        if (!values.cpassword) {
            error.cpassword = "Confirm Password is required";
        } else if (values.cpassword !== values.password) {
            error.cpassword = "Confirm password and password should be same";
        }
        return error;
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
          // Simulate database registration success
          alert("Registration successful!");
          navigate("/login", { replace: true });
        }
      }, [formErrors, isSubmit]);
      
    return(
        <div>
            <div>
                <h1>Create your accouunt</h1>
                <form>
                    <input
                    name="fname"
                    id="fname"
                    placeholder="First Name"
                    type="text"
                    value={user.fname} 
                    onChange={handleChange}
                    >
                    </input>
                    <input
                    name="lname"
                    id="lname"
                    placeholder="Last Name"
                    type="text"
                    value={user.lname}
                    onChange={handleChange}
                    >
                    </input>
                    <input
                    name="email"
                    id="email"
                    placeholder="Last Name"
                    type="email"
                    value={user.email}
                    onChange={handleChange}
                    >
                    </input>
                    <input
                    name="password"
                    id="password"
                    placeholder="Password"
                    type="text"
                    value={user.password}
                    onChange={handleChange}
                    >
                    </input>
                    <input
                    name="cpassword"
                    id="cpassword"
                    placeholder="Confirm Password"
                    type="text"
                    value={user.cpassword}
                    onChange={handleChange}
                    >
                    </input>
                   <button onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}