import React, { useEffect, useState } from 'react'
import { storage } from '../firebaseConfig'
import { StyledProfileImage, StyledProfileImageWrapper, StyledProfileWrapper } from '../styledComponents'
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
        <StyledProfileWrapper mxAuto>
            <StyledProfileImageWrapper>
           <StyledProfileImage mxAuto src={profileImage}  large />
           </StyledProfileImageWrapper>
           <div>{user.name}</div>
        </StyledProfileWrapper>
    )
}

export default Profile
