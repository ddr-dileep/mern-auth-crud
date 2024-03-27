import React, { useState, useEffect } from "react";
import AppForm from "../../components/form/AppForm";
import { registerFields } from "../../utils/constants";
import "./styles.scss";
import AppHeading from "./../../components/heading/Heading";
import AppButton from "../../components/button/AppButton";
import { useDispatch } from "react-redux";
import authApiServices from "./../../redux/services/authServices";
const arr = ["email", "password", "phone", "zipCode"];

const RegisterPage = () => {
  const [formValues, setFormValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onRegisterFormSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    for (let key in formValues) {
      formData.append(key, formValues[key]);
    }
  
    dispatch(authApiServices.register(formData));
    setIsLoading(false);
  };
   
  return (
    <div className="register-page">
      <AppHeading
        className="register-page-heading"
        title="Sign up"
        subtitle="Join our community and unlock exclusive features. It's quick and easy to get started!"
      />
      <AppForm
        onInputChange={onInputChange}
        inputFields={registerFields}
        formErrors={formErrors}
      />
      <AppButton
        onClick={onRegisterFormSubmit}
        className="register-page-form-button"
        isDisabled={isLoading}
      >
        Register
      </AppButton>
    </div>
  );
};

export default RegisterPage;
