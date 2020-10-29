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
import { connect } from "react-redux";
import { setUserAction } from "../../actions";
import { Link } from "react-router-dom";
import ImageUploader from "../ImageUploader";

const RegisterForm = ({ setUser }) => {
  const now = new Date();
  const [birthDate, setBirthDate] = useState(now);
  const handleRegister = (event) => {
    auth
      .createUserWithEmailAndPassword(event.email, event.password)
      .then(() => {
        if (event.file) {
          const file = event.file;
          const storageRef = storage.ref("photos/" + file.name);
          let task = storageRef.put(file);
          task.on("state_changed", (snapshot) => {});
        }
      })

      .then(() => {
        const user = {
          birthDate: birthDate.toString(),
          email: event.email,
          name: event.name,
          profileImage: event.file ? event.file.name : null,
          surname: event.surname,

          uid: auth.currentUser?.uid,
        };
        console.log(user);
        firestore.collection("users").add(user);
        setUser({
          birthDate: birthDate.toString(),
          email: event.email,
          name: event.name,
          profileImage: event.file ? event.file.name : null,
          surname: event.surname,

          uid: auth.currentUser?.uid,
        });
        // setTimeout(() => {
        //   document.location.href = "/";
        // }, 1500);
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
            <ImageUploader
              setField={(file) => {
                formProps.setFieldValue("file", file);
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
const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUserAction(user)),
});

export default connect(null, mapDispatchToProps)(RegisterForm);
