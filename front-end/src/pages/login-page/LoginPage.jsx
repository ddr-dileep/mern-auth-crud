import React, { useEffect, useState } from "react";
import { loginFields } from "../../utils/constants";
import "./style.scss";
import authApiServices from "../../redux/services/authServices";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllState } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../utils";
import { AppButton, AppForm, AppHeading, AppLoader, PageTitle, Toastify } from "../../components";

const LoginPage = () => {
  const [formValues, setFormValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.user);
  const isAuthenticatedUser = isAuthenticated();

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    if (isAuthenticatedUser) {
      navigate("/dashboard");
    }

    if (error?.errors?.errorMessage) {
      toast.dismiss();
      toast.error(error.errors.errorMessage);
    }

    return ()=>{
      dispatch(clearAllState());
    }
  }, [error]);

  const loginFormSubmit = async (event) => {
    try {
      setIsLoading(true);

      event.preventDefault();
      setIsLoading(true);
      const res = await dispatch(authApiServices.login(formValues));
      if (res.payload?.success) {
        toast.success(res.payload.data.successMessage);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error registering:>", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="login-page">
      <PageTitle title="Auth - login" />
      <Toastify />
      {isLoading && <AppLoader />}
      <AppHeading title="Welcome back" className="login-page-heading" />
      <AppForm onInputChange={onInputChange} inputFields={loginFields} />
      <AppButton isDisabled={isLoading} onClick={loginFormSubmit}>
        Login
      </AppButton>
    </div>
  );
};

export default LoginPage;
