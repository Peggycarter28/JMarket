import { useEffect } from "react"
import UserDashboardLayout from "../../../../components/Layout/UserDashboarLayout"


const ProfileDetailsSettings = () => {
    useEffect(
        () => {
            document.title = "Settings | Bauchi Connect"
        }, []
    )
    return (
        <>
            <UserDashboardLayout>
                ProfileDetailsSettings
            </UserDashboardLayout>
        </>)
}

export default ProfileDetailsSettings