import React from "react";
import "./styles.scss";
import { defaultImageUrl } from "../../../utils/constants";
import { AppHeading } from "../../../components";

const MemberList = ({listData}) => {
  return (
    <div className="member_list">
      <AppHeading
        className="user_dashboard-container-list-heading"
        title="Find Nearby Users: Connect with Those Around You"
      />
      <div className="member_list-container">
        {listData &&
          listData.map((member) => {
            return (
              <div className="member_list-box" key={member?.email}>
                <div className="member_list-box-left">
                  <div className="member_list-header-left">
                    <h3 className="member_list-header-name">
                      Name : <span>{member?.name}</span>
                    </h3>
                    <h3 className="member_list-header-name">
                      Mobile : <span>{member?.mobile}</span>
                    </h3>
                    <h3 className="member_list-header-name">
                      Zip code : <span>{member.zipCode} </span>
                    </h3>
                  </div>
                  <div className="member_list-header-middle">
                    <h3 className="member_list-header-name">
                      Latitude: <span>{member?.latitude}</span>
                    </h3>
                    <h3 className="member_list-header-name">
                      Longitude : <span>{member?.longitude}</span>
                    </h3>
                  </div>
                </div>
                <div className="member_list-box-right">
                  <div className="member_list-box-right-img">
                    <img
                      src={member?.profilePic || defaultImageUrl}
                      alt="imag box"
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MemberList;
