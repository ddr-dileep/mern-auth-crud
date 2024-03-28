import React, { useState, useEffect } from "react";
import AppForm from "../../components/form/AppForm";
import { registerFields } from "../../utils/constants";
import "./styles.scss";
import AppHeading from "./../../components/heading/Heading";
import AppButton from "../../components/button/AppButton";
import { useDispatch, useSelector } from "react-redux";
import authApiServices from "./../../redux/services/authServices";
import { fetchUserLocation } from "../../utils/userLocation";
import Toastify from "../../components/notificatinoModel/Toastify";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AppLoader from "../../components/loader/AppLoader";
import { clearAllState } from "./../../redux/slices/userSlice";
import { isAuthenticated } from "../../utils";

const RegisterPage = () => {
  const [formValues, setFormValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const isAuthenticatedUser = isAuthenticated();

  useEffect(() => {
    let lat, long;
    if (isAuthenticatedUser) {
      navigate("/dashboard");
    }

    fetchUserLocation((location, error) => {
      if (location) {
        lat = location.latitude;
        long = location.longitude;
        setFormValues({ ...formValues, lat, long });
      } else {
        console.error("Error fetching user location:", error);
      }
    });
    return ()=>{
      dispatch(clearAllState());
    }
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
