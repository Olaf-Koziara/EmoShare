import React, { useEffect, useState } from 'react'
import { auth, storage } from '../../firebaseConfig'
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
type propsType = {user:any,setImage:any}
const Navbar = ({user,setImage}:propsType) => {
    const[profileImage,setProfileImage] = useState<string>();
    
    const getImage = (imageName:string)=>{
        console.log(imageName)

        const pathRef = storage.ref("/photos/"+imageName);
       
        pathRef.getDownloadURL().then((url)=> {console.log(url); setProfileImage(url);setImage(url)});
        
      
    }
    useEffect(()=>{
        if(user.profileImage){
        getImage(user.profileImage);
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
               <button><StyledNavIcon src={firendsIcon} alt="friends"/></button>
            </StyledNavMidtWrapper>
            <StyledNavEndWrapper>
                
                <StyledNavEndButton>
                    <ProfileImage name={user.name} surname={user.surname} email={user.email} imageUrl={profileImage} />
                </StyledNavEndButton>
                <Link to="/"> <button onClick={()=>auth.signOut()}><StyledNavIcon src={logoutIcon} alt="logout"/></button></Link>
            </StyledNavEndWrapper>
        </StyledNavbarWrapper>
    )
}
const mapStateToProps = (state:any)=>({
    user:state.user
})
const mapDispatchToProps = (dispatch:any)=>({
    setImage:(image:any)=>dispatch(setUserImageAction(image))
})

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)
