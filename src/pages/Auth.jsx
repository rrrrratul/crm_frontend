import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { BASE_URL } from "../Constants";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const initialLoginFormValues = {
    userId: "",
    password: "",
  };
  const initialSignupFormValues = {
    userId: "",
    name: "",
    password: "",
    email: "",
    userType: "",
  };

  const [signupFormValues, SetSignupFormValues] = useState(
    initialSignupFormValues
  );

  const [loginFormValues, setLoginFormValues] = useState(
    initialLoginFormValues
  );

  function toggleSignUp() {
    setShowSignUp(!showSignUp);
  }

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        BASE_URL + "/crm/api/v1/auth/signin",
        loginFormValues
      );

      if (!data.userId && data.message) {
        throw new Error("Approval Pending");
      }
      toast.success("Welcome To The App");
      localStorage.setItem("name", data.name);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("email", data.email);
      localStorage.setItem("userStatus", data.userStatus);
      localStorage.setItem("userTypes", data.userTypes);
      localStorage.setItem("token", data.accessToken);

      switch (data.userTypes) {
        case "ADMIN":
          navigate("/admin");
          break;
        case "CUSTOMER":
          navigate("/customer");
          break;
        case "ENGINEER":
          navigate("/engineer");
          break;
        default:
      }
    } catch (exception) {
      if (exception.message === "Approval Pending") {
        toast.error("Approval Pending");
        return;
      }
      setErrorMessage(exception.response.data.message);
    }
  }

  async function handleSignUp(event) {
    event.preventDefault();
    try {
      await axios.post(BASE_URL + "/crm/api/v1/auth/signup", signupFormValues);
      toast.success("Sign Up Successful");
      setShowSignUp(false);
    } catch (exception) {
      toast.error(exception.response.data.message);
    }
  }

  function handleLoginFormChange(event) {
    setLoginFormValues({
      ...loginFormValues,
      [event.target.name]: event.target.value,
    });
  }
  function handleSignupFormChange(event) {
    SetSignupFormValues({
      ...signupFormValues,
      [event.target.name]: event.target.value,
    });
    console.log(signupFormValues);
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      switch (localStorage.getItem("userTypes")) {
        case "ADMIN":
          navigate("/admin");
          break;
        case "CUSTOMER":
          navigate("/customer");
          break;
        case "ENGINEER":
          navigate("/engineer");
          break;
        default:
      }
    }
  }, []);

  return (
    <div id="loginPage">
      <div className="bg-dark d-flex justify-content-center align-items-center vh-100">
        <div className="card m-5 p-5">
          <div className="row m-2">
            <div className="col">
              {!showSignUp && (
                <div>
                  <h4 className="text-center">Login</h4>
                  <form onSubmit={handleLogin}>
                    <div className="input-group m-1">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="userId"
                        name="userId"
                        required
                        value={loginFormValues.userId}
                        onChange={handleLoginFormChange}
                      />
                    </div>
                    <div className="input-group m-1">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        name="password"
                        required
                        value={loginFormValues.password}
                        onChange={handleLoginFormChange}
                      />
                    </div>
                    <div className="input-group m-1">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Login"
                      />
                    </div>
                    <div
                      className="signup-btn text-right text-info"
                      onClick={toggleSignUp}
                      style={{ cursor: "pointer" }}
                    >
                      Don't Have An Account ? Signup
                    </div>
                    <div className="auth-error-msg text-danger text-center">
                      {errorMessage}
                    </div>
                  </form>
                </div>
              )}

              {showSignUp && (
                <div>
                  <h4 className="text-center">Signup</h4>
                  <form onSubmit={handleSignUp}>
                    <div className="input-group m-1">
                      <input
                        type="text"
                        name="userId"
                        className="form-control"
                        placeholder="user Id"
                        required
                        value={signupFormValues.userId}
                        onChange={handleSignupFormChange}
                      />
                    </div>
                    <div className="input-group m-1">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        name="name"
                        required
                        value={signupFormValues.name}
                        onChange={handleSignupFormChange}
                      />
                    </div>
                    <div className="input-group m-1">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="email"
                        required
                        value={signupFormValues.email}
                        onChange={handleSignupFormChange}
                      />
                    </div>
                    <div className="input-group m-1">
                      <Form.Select
                        name="userType"
                        value={signupFormValues.userType}
                        onChange={handleSignupFormChange}
                      >
                        <option>User Type</option>
                        <option value="CUSTOMER"> CUSTOMER</option>
                        <option value="ENGINEER"> ENGINEER</option>
                        <option value="ADMIN"> ADMIN</option>
                      </Form.Select>
                    </div>
                    <div className="input-group m-1">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="password"
                        required
                        value={signupFormValues.password}
                        onChange={handleSignupFormChange}
                      />
                    </div>

                    <div className="input-group m-1">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Sign up"
                      />
                    </div>
                    <div
                      className="signup-btn text-center text-info"
                      onClick={toggleSignUp}
                      style={{ cursor: "pointer" }}
                    >
                      Already Have An Account ? Login
                    </div>
                    <div className="auth-error-msg text-danger text-center">
                      {errorMessage}
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
