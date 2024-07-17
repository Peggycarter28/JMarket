import { useParams } from "react-router-dom"
import ProfileViewLayout from "../../components/Layout/ProfileViewLayout"
import { useEffect } from "react"

const UserProfile = () => {
    const { username } = useParams()

    useEffect(
        () => {
            username !== undefined ?
            document.title = ` ${username}'s Profile | Bauchi Connect`
            :
            document.title = `Error! No user found`
        }, []
    )

    return (
        <ProfileViewLayout>
            {username}
        </ProfileViewLayout>
    )
}

export default UserProfile