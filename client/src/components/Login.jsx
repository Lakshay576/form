import React, { useState } from "react";

const Login = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [show, setShow] = useState(false);

  const [formErrors, setformErrors] = useState({});

  const validate = () => {
    const error = {};

    if (!formData.name.trim()) {
      error.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name.trim())) {
      error.name = "Name must contain only alphabets";
    } else if (formData.name.trim().length < 3) {
      error.name = "Name must contain at least 3 characters";
    }

    if (!formData.email.trim()) {
      error.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        formData.email.trim()
      )
    ) {
      error.email = "Email should be like 'abc123@gmail.com'";
    }

    if (!formData.mobile.trim()) {
      error.mobile = "Mobile number is required";
    } else if (!/^\d+$/.test(formData.mobile.trim())) {
      error.mobile = "Mobile number should contain digits only (0–9)";
    } else if (formData.mobile.trim().length !== 10) {
      error.mobile = "Mobile number must be exactly 10 digits long";
    }

    if (!formData.password.trim()) {
      error.password = "Password is required";
    } else {
      const password = formData.password.trim();
      const passwordErrors = [];

      if (password.length < 8) {
        passwordErrors.push("at least 8 characters long");
      }
      if (!/[a-z]/.test(password)) {
        passwordErrors.push("one lowercase letter");
      }
      if (!/[A-Z]/.test(password)) {
        passwordErrors.push("one uppercase letter");
      }
      if (!/\d/.test(password)) {
        passwordErrors.push("one digit");
      }
      if (!/[@$!%*?&]/.test(password)) {
        passwordErrors.push("one special character (@, $, !, %, *, ?, &)");
      }

      if (passwordErrors.length > 0) {
        error.password = "Password must include: " + passwordErrors.join(", ");
      }
    }

    setformErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
        try {
          const res = await fetch("http://localhost:5000/api/signUp",{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(formData),
          });

          const data = await res.json();

          if(res.ok){
            alert( data.msg);
            setformData({
                            name: "",
                            email: "",
                            mobile: "",
                            password: "",
                          });
          }
          else{
            alert('SignUp failed' + (data.msg || 'Something went wrong'))
          }
        } catch (err) {
          console.error('Error submiting form', err);
          alert("Failed to connect to backend!!!!")
        }

      //  alert("Form submitted successfully");
  
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md ">
      <h3 className="font-bold text-xl text-gray-700 flex justify-center items-center">
        SignUp Form
      </h3>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg space-y-2"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
            value={formData.name}
            onChange={(e) => setformData({ ...formData, name: e.target.value })}
          />
          {formErrors.name && (
            <span className="text-xs text-red-500 mt-1 block">
              {formErrors.name}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
            value={formData.email}
            onChange={(e) =>
              setformData({ ...formData, email: e.target.value })
            }
          />
          {formErrors.email && (
            <span className="text-xs text-red-500 mt-1 block">
              {formErrors.email}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile No.
          </label>
          <input
            type="text"
            placeholder="Enter your mobile number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
            value={formData.mobile}
            onChange={(e) =>
              setformData({ ...formData, mobile: e.target.value })
            }
          />
          {formErrors.mobile && (
            <span className="text-xs text-red-500 mt-1 block">
              {formErrors.mobile}
            </span>
          )}
        </div>

        <div className="relative w-full max-w-md">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative mt-1">
          <input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            className="mt-1 block w-full pr-16 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
            value={formData.password}
            onChange={(e) =>
              setformData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-gray-800"
            tabIndex={-1}
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? "Hide" : "Show"}
          </button>
          </div>
          {formErrors.password && (
            <span className="text-xs text-red-500 mt-1 block">
              {formErrors.password}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold cursor-pointer rounded-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
