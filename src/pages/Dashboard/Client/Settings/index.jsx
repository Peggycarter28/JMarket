import { useEffect } from "react"
import UserDashboardLayout from "../../../../components/Layout/UserDashboarLayout"
import { useParams } from "react-router-dom"


const ProfileDetailsSettings = () => {
    const { curr_section } = useParams()

    console.log(curr_section)

    useEffect(
        () => {
            document.title = "Settings | Bauchi Connect"
        }, []
    )
    return (
        <>
            <UserDashboardLayout>
                {curr_section}
            </UserDashboardLayout>
        </>)
}

export default ProfileDetailsSettings