import React, { useEffect, useState } from 'react'
import { auth, firestore, storage } from '../../firebaseConfig'
import { StyledNavbarWrapper, StyledNavEndButton, StyledNavEndWrapper, StyledNavIcon, StyledNavMidtWrapper, StyledNavStartWrapper, StyledProfileImage } from '../../styledComponents'
import { Button } from '../atoms/Button'
import { Input } from '../atoms/Input'
import homeIcon from "../../assets/icons/003-house-black-silhouette-without-door.png";
import firendsIcon from "../../assets/icons/007-friends.png";
import searchIcon from "../../assets/icons/001-search.png";
import logoutIcon from "../../assets/icons/009-logout.png";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ProfileImage from '../ProfileImage'
import { setUserImageAction } from '../../actions'

type propsType = {user:any,setImage:any,profileImage:string}
const Navbar = ({user,setImage,profileImage}:propsType) => {
   
    
    
    useEffect(()=>{
        if(user.profileImage){
        const pathRef = storage.ref("/photos/"+user.profileImage);
       
        pathRef.getDownloadURL().then((url)=> {setImage(url)})
        }
        
    },[user])
    return (
        <StyledNavbarWrapper>
            <StyledNavStartWrapper>
            <button> <StyledNavIcon src={searchIcon} alt="search"/> </button>
                <Input   />
            </StyledNavStartWrapper>
            <StyledNavMidtWrapper>
                <Link to="/"><StyledNavIcon src={homeIcon} alt="home"/></Link>
              <StyledNavIcon src={firendsIcon} alt="friends"/>
            </StyledNavMidtWrapper>
           { user?<StyledNavEndWrapper>
                
                <StyledNavEndButton>
                    <ProfileImage name={user.name} surname={user.surname} email={user.email} imageUrl={profileImage} />
                </StyledNavEndButton>
                <Link to="/"> <button onClick={()=>auth.signOut()}><StyledNavIcon src={logoutIcon} alt="logout"/></button></Link>
            </StyledNavEndWrapper>:"null"}
        </StyledNavbarWrapper>
    )
}
const mapStateToProps = (state:any)=>({
    user:state.user,
    profileImage:state.userImage
})
const mapDispatchToProps = (dispatch:any)=>({
    setImage:(image:any)=>dispatch(setUserImageAction(image))
})

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)
