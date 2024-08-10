import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const UserProfile = ({ }) => {
    const [fetchedUser, setUser] = useState(null)

    console.log(fetchedUser)

    useEffect(
        () => {
            document.title = "Settings | Profile Details"
        }, []
    )


    useEffect(() => {
        const storedUser = localStorage.getItem('user')

        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    return (<>
    <div className="flex justify-between">
        <div className="size-[150px] border rounded-full flex justify-center items-center">
            <img className="" src={fetchedUser?.image_url} />
        </div>

        <Link to={"../settings/edit-profile"}>Edit</Link>
        </div>

        <div className="p-2">
            <p className="font-semibold">Username</p>
            <p>{fetchedUser?.username}</p>
        </div>

        <div className="p-2">
            <p className="font-semibold">email</p>
            <p>{fetchedUser?.email}</p>
        </div>

        <div className="p-2">
            <p className="font-semibold">First Name</p>
            <p>{fetchedUser?.first_name !== "" ? fetchedUser?.first_name : "Null"}</p>
        </div>

        <div className="p-2">
            <p className="font-semibold">Last Name</p>
            <p>{fetchedUser?.last_name !== "" ? fetchedUser?.last_name : "Null"}</p>
        </div>

        <div className="p-2">
            <p className="font-semibold">Date of Birth</p>
            <p>{fetchedUser?.date_of_birth !== "" ? fetchedUser?.date_of_birth : "Null"}</p>
        </div>
    </>)
}

export default UserProfile