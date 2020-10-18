
import { Formik,Form } from 'formik'
import React, { useState } from 'react'
import { auth,firestore,storage } from '../../firebaseConfig'
import { StyledField, StyledForm, StyledFormWrapper, StyledProgressBar } from '../../styledComponents'
import { Button } from '../atoms/Button'
type propsType = {form?:any}
const RegisterForm = ({form}:propsType) => {
    const [progress,setProgress] = useState(0);
    const handleRegister = (event:any)=>{
        console.log(event)
        auth.createUserWithEmailAndPassword(event.email,event.password).then(() => { 
          const file = event.file;
          if(file){
           
          const storageRef = storage.ref('photos/'+file.name);
          let task=storageRef.put(file);
          task.on('state_changed',(snapshot)=>{setProgress((snapshot.bytesTransferred/ snapshot.totalBytes)*100)})
          }}).then(()=>firestore.collection("users").add({email:event.email,uid:auth.currentUser?.uid}))
        .catch((error) => {
          alert(`${error}`);
        });
       
    }
    return ( 

        <StyledFormWrapper mxAuto myAuto>
          
    <Formik  initialValues={{}} onSubmit={(event:any)=>{handleRegister(event)}}>
  
    {(formProps)=>(
      
      
      <StyledForm >
        <StyledProgressBar progress={progress}/>
      <input placeholder="file" name="file" type="file" onChange={(event:any)=>{formProps.setFieldValue('file',event.target.files[0])}} />
        <StyledField placeholder="e-mail" name="email" type="email" />
        <StyledField placeholder="password" name="password" type="password" />
        <Button type="submit">Register</Button>
      </StyledForm>
     
      )}
    </Formik>
    
    </StyledFormWrapper>
    )
}

export default RegisterForm
