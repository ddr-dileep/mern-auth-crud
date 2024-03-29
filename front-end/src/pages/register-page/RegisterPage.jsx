import React, { useState, useEffect } from "react";
import { registerFields } from "../../utils/constants";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import authApiServices from "./../../redux/services/authServices";
import { fetchUserLocation } from "../../utils/userLocation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clearAllState } from "./../../redux/slices/userSlice";
import { isAuthenticated } from "../../utils";
import { AppButton, AppForm, AppHeading, AppLoader, PageTitle, Toastify } from "../../components";

const RegisterPage = () => {
  const [formValues, setFormValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const isAuthenticatedUser = isAuthenticated();

  useEffect(() => {
    if (isAuthenticatedUser) {
      navigate("/dashboard");
    }

    fetchUserLocation((location, error) => {
      if (location) {
        const { latitude, longitude } = location;
        setFormValues({ ...formValues, latitude, longitude });
      } else {
        console.error("Error fetching user location:", error);
      }
    });
    return () => {
      dispatch(clearAllState());
    };
  }, []);

  useEffect(() => {
    if (error?.errors?.errorMessage) {
      toast.dismiss();
      toast.error(error.errors.errorMessage);
    }
  }, [error]);

  const onInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name !== "profilePic") {
      setFormValues({ ...formValues, [name]: value });
    } else {
      setFormValues({ ...formValues, [name]: files[0] });
    }
  };

  const onRegisterFormSubmit = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      for (let key in formValues) {
        formData.append(key, formValues[key]);
      }

      const res = await dispatch(authApiServices.register(formData));
      if (res.payload.success) {
        toast.success(res.payload.data.successMessage);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.error("Error registering:>", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="register-page">
      <PageTitle title="Auth - register" />
      {isLoading && <AppLoader />}
      <Toastify />
      <AppHeading
        className="register-page-heading"
        title="Sign up"
        subtitle="Join our community and unlock exclusive features. It's quick and easy to get started!"
      />
      <AppForm
        encType="multipart/form-data"
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
