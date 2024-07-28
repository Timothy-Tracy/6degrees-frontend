import useFetchResponseData from "../../api/profile/useFetchResponseData";
import ProfileResponses from "./ProfileResponses";


const ProfilePage = () => {
    const {profile, isLoading, error} = useFetchResponseData()

    return (
        <>
            <h1>Profile</h1>
            <ProfileResponses profile={profile}/>
        </>
    )
}

export default ProfilePage;