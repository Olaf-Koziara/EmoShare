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
type propsType = {user:any}
const Navbar = ({user}:propsType) => {
    const[profileImage,setProfileImage] = useState<string>();
    
    const getImage = (imageName:string)=>{
        console.log(imageName)

        const pathRef = storage.ref("/photos/"+imageName);
       
        pathRef.getDownloadURL().then((url)=> {console.log(url); setProfileImage(url)});
        
      
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
                    <Link to={{pathname:`/${user.name}`, state:{
                            email:user.email
                        },
                    }
                       
                }>
                <StyledProfileImage  src={profileImage} alt="imageProfile"/>
                </Link>
                </StyledNavEndButton>
                <Link to="/"> <button onClick={()=>auth.signOut()}><StyledNavIcon src={logoutIcon} alt="logout"/></button></Link>
            </StyledNavEndWrapper>
        </StyledNavbarWrapper>
    )
}
const mapStateToProps = (state:any)=>({
    user:state.user
})

export default connect(mapStateToProps)(Navbar)
