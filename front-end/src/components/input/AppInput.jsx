import TextField from "@mui/material/TextField";
import "./styles.scss";

export const AppInputField = ({
  isError,
  className,
  isRequired,
  onChange,
  defaultValue,
  label,
  id,
  isDisabled,
  placeholder,
  name,
  type,
}) => {
  return (
    <TextField
      name={name}
      className={`app-input-field ${className}`}
      required={isRequired}
      onChange={onChange}
      id={id}
      multiline={type === "textarea"}
      label={label}
      defaultValue={defaultValue}
      error={isError}
      disabled={isDisabled}
      placeholder={placeholder}
      type={type}
    />
  );
};
