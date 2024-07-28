import Response from "./Response"

const ProfileResponses = ({ profile }) => {
    return (
        <>
            {profile?.map((element, index) =>
            (
                <Response data={element} key={index} />
            )
            )}
        </>
    )
}
export default ProfileResponses