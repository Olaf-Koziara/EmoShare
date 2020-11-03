import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { firestore, storage } from '../firebaseConfig'
import { StledProfileTextParagraph, StyledProfileImage, StyledProfileImageWrapper, StyledProfileTextWrapper, StyledProfileWrapper } from '../styledComponents'
type propsType = {user:any,followUser:any,userDocumentId:string,userFollows:any,usersImages:any}
const Profile = ({user,followUser,userDocumentId,userFollows,usersImages}:propsType) => {
    const[profileImage,setProfileImage] = useState<string>();
    const getImage = (imageName:string)=>{
        console.log(imageName)
        console.log(usersImages)
        const userImage = usersImages.find((object:any)=>object.name===user.email);
        if(userImage){
        setProfileImage(userImage.url)
        }
    
        
      
    }
    const follow = (email:string)=>{
        firestore.collection("users").doc(userDocumentId).update({follows:[...userFollows,email]})
    }
    
    useEffect(()=>{getImage(user.profileImage)},[usersImages])
    const birthDate = new Date(user.birthDate);
    
    return (
        <StyledProfileWrapper mxAuto>
            <StyledProfileImageWrapper>
           <StyledProfileImage mxAuto src={profileImage}  large />
           </StyledProfileImageWrapper>
           <StyledProfileTextWrapper><StledProfileTextParagraph>Name:{user.name}</StledProfileTextParagraph><StledProfileTextParagraph>Surname:{user.surname}</StledProfileTextParagraph><StledProfileTextParagraph>BirthDate:{`${birthDate.getDate()}-${birthDate.getMonth()+1}-${birthDate.getFullYear()}`}</StledProfileTextParagraph></StyledProfileTextWrapper>
           <button onClick={()=>follow(user.email)}>Follow</button>
        </StyledProfileWrapper>
    )
}
const mapStateToProps = (state:any)=>({
    userDocumentId:state.user.id,
    userFollows:state.user.follows,
    usersImages:state.profileImagesUrl
  })

export default connect(mapStateToProps)(Profile)
