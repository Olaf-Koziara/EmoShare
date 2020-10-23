import React from 'react'
import Profile from '../components/Profile'

const ProfileView = (props:any) => {
    const{user} = props.location.state;
    return (
        <>
            <Profile user={user} />
        </>
    )
}

export default ProfileView
