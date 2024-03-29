import { AppInputField } from "../input/AppInput";

export const AppForm = ({
  formValues = {},
  inputFields,
  onInputChange,
  encType,
  formErrors = {},
}) => {
  return (
    <>
      <form encType={encType} method="post">
        {inputFields?.map((field) => {
          return (
            <AppInputField
              id={field?.id}
              key={field?.id}
              name={field?.name}
              defaultValue={formValues[field?.name] || ""}
              type={field?.type}
              label={field?.placeholder}
              placeholder={field?.placeholder}
              onChange={onInputChange}
              isRequired={field?.isRequired}
              isError={formErrors[field?.name]}
            />
          );
        })}
      </form>
    </>
  );
};
