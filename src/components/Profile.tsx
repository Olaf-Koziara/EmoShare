import React, { useEffect, useState } from 'react'
import { storage } from '../firebaseConfig'
import { StledProfileTextParagraph, StyledProfileImage, StyledProfileImageWrapper, StyledProfileTextWrapper, StyledProfileWrapper } from '../styledComponents'
type propsType = {user:any}
const Profile = ({user}:propsType) => {
    const[profileImage,setProfileImage] = useState<string>();
    const getImage = (imageName:string)=>{
        console.log(imageName)

        const pathRef = storage.ref("/photos/"+imageName);
       
        pathRef.getDownloadURL().then((url)=> {setProfileImage(url) });
    
        
      
    }
    useEffect(()=>{getImage(user.profileImage)},[])
    const birthDate = new Date(user.birthDate);
    
    return (
        <StyledProfileWrapper mxAuto>
            <StyledProfileImageWrapper>
           <StyledProfileImage mxAuto src={profileImage}  large />
           </StyledProfileImageWrapper>
           <StyledProfileTextWrapper><StledProfileTextParagraph>Name:{user.name}</StledProfileTextParagraph><StledProfileTextParagraph>Surname:{user.surname}</StledProfileTextParagraph><StledProfileTextParagraph>BirthDate:{`${birthDate.getDate()}-${birthDate.getMonth()+1}-${birthDate.getFullYear()}`}</StledProfileTextParagraph></StyledProfileTextWrapper>
        </StyledProfileWrapper>
    )
}

export default Profile
