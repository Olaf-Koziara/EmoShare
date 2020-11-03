import React, { useEffect, useState } from 'react'
import { auth, firestore, storage } from '../../firebaseConfig'
import { StyledNavbarWrapper, StyledNavEndButton, StyledNavEndWrapper, StyledNavIcon, StyledNavLink, StyledNavMidtWrapper, StyledNavSearchWrapper, StyledNavStartWrapper, StyledProfileImage } from '../../styledComponents'

import homeIcon from "../../assets/icons/003-house-black-silhouette-without-door.png";
import firendsIcon from "../../assets/icons/007-friends.png";

import logoutIcon from "../../assets/icons/009-logout.png";
import { connect, useDispatch } from 'react-redux'

import ProfileImage from '../ProfileImage'
import { setUserImageAction } from '../../actions'
import Search from '../search/Search'

type propsType = {user:any,profileImage:string}
const Navbar = ({user,profileImage}:propsType) => {

    const dispatch = useDispatch();
   
    
    
    useEffect(()=>{
        if(user.profileImage){
        const pathRef = storage.ref("/photos/"+user.profileImage);
       
        
        pathRef.getDownloadURL().then((url)=> {dispatch(setUserImageAction(url))})
        }
        
    },[user])
    return (
        <StyledNavbarWrapper>
            <StyledNavStartWrapper>
               <Search/>    
            </StyledNavStartWrapper>
            <StyledNavMidtWrapper>
                <StyledNavLink to="/"><StyledNavIcon src={homeIcon} alt="home"/></StyledNavLink>
              <StyledNavIcon src={firendsIcon} alt="friends"/>
            </StyledNavMidtWrapper>
           { user?<StyledNavEndWrapper>
                
                <StyledNavEndButton>
                    <ProfileImage name={user.name} surname={user.surname} email={user.email} imageUrl={profileImage} />
                </StyledNavEndButton>
                 <button onClick={()=>auth.signOut()}><StyledNavIcon src={logoutIcon} alt="logout"/></button>
            </StyledNavEndWrapper>:"null"}
        </StyledNavbarWrapper>
    )
}
const mapStateToProps = (state:any)=>({
    user:state.user,
    profileImage:state.userImage
})


export default connect(mapStateToProps)(Navbar)
