import React, { useState } from "react";
import AppForm from "../../components/form/AppForm";
import { loginFields } from "../../utils/constants";
import "./style.scss";
import AppHeading from "../../components/heading/Heading";
import AppButton from "./../../components/button/AppButton";
import authApiServices from "../../redux/services/authServices";
import { useDispatch } from "react-redux";


const LoginPage = () => {
  const [formValues, setFormValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };


  const loginFormSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    dispatch(authApiServices.login(formValues));
    setIsLoading(false);
  };


  return (
    <div className="login-page">
      <AppHeading title="Welcome back" className="login-page-heading" />
      <AppForm onInputChange={onInputChange} inputFields={loginFields} />
      <AppButton isDisabled={isLoading} onClick={loginFormSubmit}>
        Login
      </AppButton>
    </div>
  );
};

export default LoginPage;
