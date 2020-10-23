import React, { useEffect, useState } from 'react'
import { storage } from '../firebaseConfig'
import { StyledProfileImage, StyledProfileWrapper } from '../styledComponents'
type propsType = {user:any}
const Profile = ({user}:propsType) => {
    const[profileImage,setProfileImage] = useState<string>();
    const getImage = (imageName:string)=>{
        console.log(imageName)

        const pathRef = storage.ref("/photos/"+imageName);
       
        pathRef.getDownloadURL().then((url)=> {setProfileImage(url) });
    
        
      
    }
    useEffect(()=>{getImage(user.profileImage)},[])
    
    return (
        <StyledProfileWrapper>
           <StyledProfileImage src={profileImage}  large />
        </StyledProfileWrapper>
    )
}

export default Profile
