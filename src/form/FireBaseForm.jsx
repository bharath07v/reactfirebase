import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FieldCustomization, { ButtonFields } from "../common/FieldCustomization";
import { useForm } from "../customhooks/useForm";
import useFirestore from "../firebase/useFirestore";

const FireBaseForm = ({id,data:data1}) => {
  const { t } = useTranslation();
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [saveButtonText, setSaveButtonText] = useState(
     t("save")
  );
  const { data, loading, error, addData, updateData, deleteData,fetchData,setData } = useFirestore('practice');
  useEffect(() => {
    if (id && id > 0) {
      setData(data1)
    }
  })
  const handleFormSubmit = (state) => {
    // const newDataId = await addData(state);
    try {
      setSaveButtonDisabled(true);
      setSaveButtonText(t("saving"));
      const newDataId = addData(state);
      console.log(newDataId);
    } catch (error) {
      console.error("Error adding data: ", error);
    } finally {
      setSaveButtonDisabled(false);
      setSaveButtonText(t("save"));
    }
  }
const validate = useCallback((params) => {
    const { state, t, requestType, fieldName, previousErrors } = params;
    let errors = previousErrors || {};
    if (
      !state.firstName &&
      ((requestType === "onchange" && fieldName === "firstName") ||
        (requestType && requestType === "submit"))
    ) {
      errors.firstName = t("first-name-required");
    } else if (state.firstName) delete errors.firstName;
    if (
      !state.lastName &&
      ((requestType === "onchange" && fieldName === "lastName") ||
        requestType === "submit")
    ) {
      errors.lastName = t("last-name-required");
    } else if (state.lastName) delete errors.lastName;
  if (
      !state.userName &&
      ((requestType === "onchange" && fieldName === "userName") ||
        requestType === "submit")
    ) {
      errors.userName = t("email-required");
    } else if (state.userName) delete errors.userName;
    return errors;
  }, []);


  const requestInputs = {
    requestFrom: "FireBaseForm",
    mandatoryFields: {
      firstName: "",
      lastName:"",
      userName: "",
    },
    revlaidateMode: "onchange",
  };

  const { handleInputchange, errors, handleSubmit, setErrors, setState, state } = useForm({
    // initialValues: {
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   password: "",
    //   confirmPassword: "",
    //   gender: "",
    //   dateOfBirth: "",
    // },
    // callback: (data) => {
    //   console.log(data);
    // },
    params: {
      validate: validate,
      callback: handleFormSubmit,
      t: t,
      requestInputs: requestInputs,
    },
  })
  const handleFormCancel = (data) => {
  }
  const FireBaseFields = [
    {
      type: "text",
      name: "firstName",
      id: "firstName",
      fieldDivClass: "col-md-12",
      class: "form-control",
      label: t("first-name"),
      onChange: handleInputchange,
      labelOnTopOfField: true,
    },
    {
      type: "text",
      name: "lastName",
      id: "lastName",
      fieldDivClass: "col-md-12",
      class: "form-control",
      label: t("last-name"),
      onChange: handleInputchange,
      labelOnTopOfField: true,
    },
    {
      type: "text",
      name: "userName",
      id: "userName",
      fieldDivClass: "col-md-12",
      class: "form-control",
      label: t("email"),
      onChange: handleInputchange,
      labelOnTopOfField: true,
    },
  ];

  const buttonsFields = [
    {
      name: "submit",
      type: "button",
      class: "btn btn-primary button-fields",
      onClick: handleSubmit,
      label: saveButtonText,
      disabled: saveButtonDisabled,
      fontAwesomeIconType: saveButtonDisabled ? "circleNotch" : "",
    },
    {
      name: "cancel",
      type: "button",
      class: "btn btn-primary ml-8 button-fields",
      onClick: handleFormCancel,
      label: t("cancel"),
    },
  ];

  return (
    <div className="row">
    <center className="fire-base-form">
    <div className="col-md-6">
       <form onSubmit={(e) => e.preventDefault}>
          <FieldCustomization
            fields={FireBaseFields}
            state={state}
            errors={errors}
          />
            <ButtonFields buttons={buttonsFields} t={t} state={state} />
        </form>
      </div>
      </center>
      </div>
  );
};

export default FireBaseForm;
