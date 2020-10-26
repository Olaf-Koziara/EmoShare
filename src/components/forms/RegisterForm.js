import { Formik, Form } from "formik";
import React, { useState } from "react";
import { auth, firestore, storage } from "../../firebaseConfig";
import {
  StyledField,
  StyledForm,
  StyledRegisterFormWrapper,
  StyledPhotoSelect,
} from "../../styledComponents";
import { Button } from "../atoms/Button";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "./datePicker.css";

const RegisterForm = () => {
  const [progress, setProgress] = useState(0);

  const now = new Date();
  const [birthDate, setBirthDate] = useState(now);

  const handleRegister = (event) => {
    console.log(event);
    auth
      .createUserWithEmailAndPassword(event.email, event.password)
      .then(() => {
        if (event.file) {
          const file = event.file;
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
          name: event.name,
          surname: event.surname,
          birthDate: birthDate.toString(),
          email: event.email,
          profileImage: event.file ? event.file.name : null,
          uid: auth.currentUser?.uid,
        }),
      )
      .catch((error) => {
        alert(`${error}`);
      });
  };
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
            <label htmlFor="file">
              <StyledPhotoSelect>Select photo</StyledPhotoSelect>
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

            <StyledField placeholder="Name" name="name" />
            <StyledField placeholder="Surname" name="surname" />
            <label htmlFor="dateBirth">Birth date:</label>
            <DatePicker
              onChange={(date) => {
                setBirthDate(date);
              }}
              selected={birthDate}
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
