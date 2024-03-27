import AppInputField from "../input/AppInput";

const AppForm = ({ inputFields, onInputChange, formErrors = {} }) => {
  return (
    <>
      {inputFields?.map((field) => {
        return (
          <AppInputField
            id={field?.id}
            key={field?.id}
            name={field?.name}
            type={field?.type}
            label={field?.placeholder}
            placeholder={field?.placeholder}
            onChange={onInputChange}
            isRequired={field?.isRequired}
            isError={formErrors[field?.name]}
          />
        );
      })}
    </>
  );
};
export default AppForm;
