import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../utils";
import { useNavigate } from "react-router-dom";
import authApiServices from "../../redux/services/authServices";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import { defaultImageUrl, registerFields } from "../../utils/constants";
import { fetchUserLocation } from "../../utils/userLocation";
import { toast } from "react-toastify";
import MemberList from "./components/MemberList";
import locationApiServices from "../../redux/services/locationServices";
import { AppButton, AppForm, AppLoader, AppModal, PageTitle, Toastify } from "../../components";

const Dashboard = () => {
  const [formValues, setFormValues] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticatedUser = isAuthenticated();
  const [isOpen, setIsOpen] = useState(false);
  const { user, error } = useSelector((state) => state?.user);
  const { nearByUsers } = useSelector((state) => state);
  const [isLoading, setIsLoading] = useState(true);
  const [profileDetails, setProfileDetails] = useState(user);
  const nearRestUser = nearByUsers?.nearestUsers?.data;

  console.log("nearRestUser", nearRestUser);

  async function getCurrentUser() {
    try {
      await dispatch(authApiServices.getUserInfo());
    } catch (error) {
      console.log(error);
    }
  }

  const onInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name !== "profilePic") {
      setFormValues({ ...formValues, [name]: value });
    } else {
      setFormValues({ ...formValues, [name]: files[0] });
    }
  };

  useEffect(() => {
    let latitude, longitude;
    if (!isAuthenticatedUser) {
      navigate("/login");
    }

    setTimeout(() => {
      getCurrentUser();
      setIsLoading(false);
    }, 500);

    fetchUserLocation((location, error) => {
      if (location) {
        (latitude = location.latitude), (longitude = location.longitude);
        setFormValues({ ...formValues, latitude, longitude });
      } else {
        console.error("Error fetching user location:", error);
      }
    });

    dispatch(
      locationApiServices.nearByUser({
        latitude,
        longitude,
      })
    );
  }, []);

  useEffect(() => {
    const newUser = {};
    for (let i in user) {
      if (i !== "profilePic") {
        newUser[i] = user[i];
      }
    }
    setFormValues(newUser);
    setProfileDetails(user);
  }, [user]);

  useEffect(() => {
    if (error?.errors?.errorMessage) {
      toast.dismiss();
      toast.error(error?.errors?.errorMessage);
    }
  }, [error]);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleUpdateProfile = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      setIsOpen(false);

      for (let key in formValues) {
        formData.append(key, formValues[key]);
      }

      const res = await dispatch(authApiServices.updateProfile(formData));
      if (res.payload.success) {
        toast.success(res.payload.data.successMessage);
      }
    } catch (error) {
      console.error("Error registering:>", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="user_dashboard">
      <PageTitle title="Auth - dashboard" />
      {isLoading && <AppLoader />}
      <Toastify />
      <div className="user_dashboard-container">
        <div className="user_dashboard-container-left">
          <div className="user_dashboard-container-left-top">
            <div className="user_dashboard-container-left-top-img">
              <a href={profileDetails?.profilePic} target="_blank">
                <img
                  className="user-img"
                  src={profileDetails?.profilePic || defaultImageUrl}
                />
              </a>
            </div>
            <h3 className="user_dashboard-container-left-top-name">
              {profileDetails?.name}
            </h3>
          </div>
        </div>
        <div className="user_dashboard-container-right">
          <div className="user_dashboard-container-right-top">
            <h3 className="user_dashboard-container-right-top-item">
              Email : <span>{profileDetails?.email}</span>
            </h3>
            <h3 className="user_dashboard-container-right-top-item">
              Phone : <span>{profileDetails?.phone}</span>
            </h3>
            <h3 className="user_dashboard-container-right-top-item">
              Mobile : <span>{profileDetails?.mobile}</span>
            </h3>
            <h3 className="user_dashboard-container-right-top-item">
              ZipCode : <span>{profileDetails?.zipCode}</span>
            </h3>
            <h3 className="user_dashboard-container-right-top-item">
              Latitude: <span>{profileDetails?.latitude || "NA"}</span>
            </h3>
            <h3 className="user_dashboard-container-right-top-item">
              Longitude : <span>{profileDetails?.longitude || "NA"}</span>
            </h3>
          </div>
          <AppButton
            className="user_dashboard-container-right-edit_profile"
            onClick={handleOpenModal}
          >
            Edit profile
          </AppButton>
        </div>
      </div>

      <MemberList listData={nearRestUser} />

      <AppModal isOpen={isOpen} handleClose={handleClose} title="Edit profile">
        <div className="user_dashboard-container-edit_profile">
          <AppForm
            formValues={formValues}
            encType="multipart/form-data"
            onInputChange={onInputChange}
            inputFields={registerFields}
          />
          <AppButton
            className="user_dashboard-container-edit_profile-button"
            onClick={handleUpdateProfile}
          >
            Update profile
          </AppButton>
        </div>
      </AppModal>
    </div>
  );
};

export default Dashboard;
