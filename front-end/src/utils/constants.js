export const registerFields = [
  {
    name: "name",
    type: "type",
    placeholder: "Full name",
    id: "register-full-name",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    isRequired: true,
    id: "register-email",
  },
  {
    name: "phone",
    type: "number",
    placeholder: "Phone Number",
    id: "register-phone-number",
  },
  {
    name: "mobile",
    type: "Mobile number",
    placeholder: "Mobile Number",
    isRequired: true,
    id: "register-mobile-number",
  },
  {
    name: "zipCode",
    type: "number",
    placeholder: "Zip code",
    id: "register-zip-code-number",
  },
  {
    name: "profilePic",
    type: "file",
    placeholder: "Profile",
    id: "register-profile-number",
  },
  {
    name: "password",
    type: "text",
    placeholder: "Password",
    isRequired: true,
    id: "register-password",
  },
];

export const loginFields = [
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    isRequired: true,
    id: "register-email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    isRequired: true,
    id: "register-password",
  },
];

export const defaultImageUrl =
  "https://web-realcom.com/assets/upload/img/def_avatar.png";