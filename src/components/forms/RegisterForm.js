import { Formik, Form } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { auth, firestore, storage } from "../../firebaseConfig";
import {
  StyledField,
  StyledForm,
  StyledRegisterFormWrapper,
  StyledPhotoSelect,
  StyledDateLabel,
} from "../../styledComponents";
import { Button } from "../atoms/Button";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "./datePicker.css";
import { connect } from "react-redux";
import { setUserAction } from "../../actions";
import { Link } from "react-router-dom";
import ImageCropper from "../ImageCropper";
import Axios from "axios";
import { Input } from "../atoms/Input";
import PlaceInput from "../PlaceInput";
import { randomString } from "../../helpers/random";

const RegisterForm = ({ setUser }) => {
  const now = new Date();
  const [birthDate, setBirthDate] = useState(now);
  const [blob, setBlob] = useState();
  const [url, setUrl] = useState("");

  const handleRegister = (event) => {
    auth
      .createUserWithEmailAndPassword(event.email, event.password)

      .then(() => {
        const user = {
          birthDate: birthDate.toString(),
          email: event.email,
          name: event.name,
          profileImage: url,
          surname: event.surname,
          follows: [],
          country: event.country ? event.country : "",
          city: event.city ? event.city : "",
          uid: auth.currentUser?.uid,
          docId: "",
        };
        console.log(user);
        firestore
          .collection("users")
          .add(user)
          .then((docRef) =>
            firestore
              .collection("users")
              .doc(docRef.id)
              .update({ docId: docRef.id }),
          );
      })
      .then(() => {
        setTimeout(() => {
          document.location.href = "/";
        }, 100);
      });
  };

  return (
    <StyledRegisterFormWrapper mxAuto>
      <ImageCropper setUrl={setUrl} setCroped={setBlob} />
      <Formik
        initialValues={{}}
        onSubmit={(event) => {
          handleRegister(event);
        }}
      >
        {(formProps) => (
          <StyledForm>
            <StyledField placeholder="Name" name="name" />
            <StyledField placeholder="Surname" name="surname" />
            <StyledDateLabel htmlFor="dateBirth">Birth date:</StyledDateLabel>
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

            <PlaceInput setField={formProps.setFieldValue} />
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
