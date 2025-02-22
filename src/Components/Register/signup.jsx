import React, { useState, useEffect } from "react";
import basestyle from "../../Base.module.css";
import registerstyle from "./Register.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [user, setUser] = useState({
        fname: "",
        lname: "",
        email: "",
        mobileNumber: "",
        password: "",
        cpassword: "",
    });

    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        if (isSubmit) {
            toast.success("Registration successful!");
            navigate("/login", { replace: true });
        }
    }, [isSubmit]); // Fixed useEffect dependency

    function handleChange(e) {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const errors = validateForm(user);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsSubmit(true);
        }
    }

    function validateForm(values) {
        const error = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const mobileRegex = /^\d{10}$/;

        if (!values.fname) error.fname = "First name is required";
        if (!values.lname) error.lname = "Last name is required";
        if (!values.email) {
            error.email = "Email is required";
        } else if (!emailRegex.test(values.email)) {
            error.email = "This is not a valid email format!";
        }
        if (!values.mobileNumber) {
            error.mobileNumber = "Mobile Number is required";
        } else if (!mobileRegex.test(values.mobileNumber)) {
            error.mobileNumber = "This is not a valid mobile number";
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
            error.cpassword = "Passwords do not match";
        }

        return error;
    }

    return (
        <div className={registerstyle.registerPageContainer}>
            <div className={registerstyle.register}>
                <h1>Create your account</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        name="fname"
                        placeholder="First Name"
                        type="text"
                        value={user.fname}
                        onChange={handleChange}
                    />
                    <p className={basestyle.error}>{formErrors.fname}</p>

                    <input
                        name="lname"
                        placeholder="Last Name"
                        type="text"
                        value={user.lname}
                        onChange={handleChange}
                    />
                    <p className={basestyle.error}>{formErrors.lname}</p>

                    <input
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                    <p className={basestyle.error}>{formErrors.email}</p>

                    <input
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        type="text"
                        value={user.mobileNumber}
                        onChange={handleChange}
                    />
                    <p className={basestyle.error}>{formErrors.mobileNumber}</p>

                    <input
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    <p className={basestyle.error}>{formErrors.password}</p>

                    <input
                        name="cpassword"
                        placeholder="Confirm Password"
                        type="password"
                        value={user.cpassword}
                        onChange={handleChange}
                    />
                    <p className={basestyle.error}>{formErrors.cpassword}</p>

                    <button className={basestyle.button_common} type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
