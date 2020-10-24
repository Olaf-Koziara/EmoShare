import { Formik, Form } from "formik";
import React, { useState } from "react";
import { auth, firestore, storage } from "../../firebaseConfig";
import {
  StyledField,
  StyledForm,
  StyledRegisterFormWrapper,
  StyledProgressBar,
} from "../../styledComponents";
import { Button } from "../atoms/Button";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "./datePicker.css";

const RegisterForm = () => {
  const [progress, setProgress] = useState(0);
  const handleRegister = (event) => {
    console.log(event);
    auth
      .createUserWithEmailAndPassword(event.email, event.password)
      .then(() => {
        const file = event.file;
        if (file) {
          const storageRef = storage.ref("photos/" + file.name);
          let task = storageRef.put(file);
          task.on("state_changed", (snapshot) => {
            setProgress(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            );
          });
        }
      })
      .then(() =>
        firestore.collection("users").add({
          email: event.email,
          profileImage: event.file.name,
          uid: auth.currentUser?.uid,
        }),
      )
      .catch((error) => {
        alert(`${error}`);
      });
  };

  const now = new Date();
  return (
    <StyledRegisterFormWrapper mxAuto>
      <Formik
        initialValues={{}}
        onSubmit={(event) => {
          handleRegister(event);
        }}
      >
        {(formProps) => (
          <StyledForm>
            <StyledProgressBar progress={progress} />
            <label htmlFor="file">
              <div>Select</div>
            </label>
            <input
              style={{ display: "none" }}
              placeholder="file"
              id="file"
              name="file"
              type="file"
              onChange={(event) => {
                formProps.setFieldValue("file", event.target.files[0]);
              }}
            />
            <img src={formProps.values.file.f}

            <StyledField placeholder="Name" name="name" />
            <StyledField placeholder="Surname" name="surname" />
            <label htmlFor="dateBirth">Birth date:</label>
            <DatePicker
              selected={now}
              onChange={(date) => {
                console.log(date);
              }}
              showYearDropdown
              dateFormatCalendar="MMMM"
              yearDropdownItemNumber={100}
              scrollableYearDropdown
              maxDate={now}
              name="dateBirth"
            />
            <StyledField placeholder="e-mail" name="email" type="email" />
            <StyledField
              placeholder="password"
              name="password"
              type="password"
            />
            <Button type="submit">Register</Button>
          </StyledForm>
        )}
      </Formik>
    </StyledRegisterFormWrapper>
  );
};

export default RegisterForm;
