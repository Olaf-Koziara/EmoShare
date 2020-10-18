import React, { useEffect, useState } from 'react'
import { auth, storage } from '../../firebaseConfig'
import { StyledNavbarWrapper, StyledNavEndButton, StyledNavEndWrapper, StyledNavIcon, StyledNavMidtWrapper, StyledNavStartWrapper, StyledProfileImage } from '../../styledComponents'
import { Button } from '../atoms/Button'
import { Input } from '../atoms/Input'
import homeIcon from "../../assets/icons/003-house-black-silhouette-without-door.png";
import firendsIcon from "../../assets/icons/007-friends.png";
import searchIcon from "../../assets/icons/001-search.png";
import logoutIcon from "../../assets/icons/009-logout.png";
const Navbar = () => {
    const[profileImage,setProfileImage] = useState<string>();
    const getImage = ()=>{
        const pathRef = storage.ref('/photos/pkkZdj.jpg');
       
        pathRef.getDownloadURL().then((url)=> {console.log(url); setProfileImage(url)});
        
      
    }
    useEffect(()=>{
        getImage();
    },[])
    return (
        <StyledNavbarWrapper>
            <StyledNavStartWrapper>
            <button> <StyledNavIcon src={searchIcon} alt="search"/> </button>
                <Input   />
            </StyledNavStartWrapper>
            <StyledNavMidtWrapper>
               <button> <StyledNavIcon src={homeIcon} alt="home"/></button>
               <button><StyledNavIcon src={firendsIcon} alt="friends"/></button>
            </StyledNavMidtWrapper>
            <StyledNavEndWrapper>
                
                <StyledNavEndButton>
                <StyledProfileImage src={profileImage} alt="imageProfile"/>
                </StyledNavEndButton>
            <button onClick={()=>auth.signOut()}><StyledNavIcon src={logoutIcon} alt="logout"/></button>
            </StyledNavEndWrapper>
        </StyledNavbarWrapper>
    )
}

export default Navbar
