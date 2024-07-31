import NavBar from "./LandingPage/NavBar"
import SignInNav from "./LandingPage/SignInNav"
import siteLogo from '../assets/bauchi-connect-logo.svg'
import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/AppContextt"

const NavBarComponent = () => {
    const {user, setUser} = useContext(UserContext)

 
    const handleLangUpdate = (lang) => {
      setUser(prev => ({...prev, lang: lang}))
     }

    return (
        <div className="flex w-full">
            <div className="flex w-full justify-end absolute top-0 right-0 mt-3 mr-3 index-[45]">
                <select onChange={elem=> handleLangUpdate(elem.target.value)} className="text-right" id="">
                    <option value="">..select language</option>
                    <option value="en">English</option>
                    <option value="ha">Hausa</option>
                </select>
            </div>
            <nav className="flex w-full justify-between md:justify-around items-center p-2 md:p-8">
                <Link to={"/"}>
                    <img src={siteLogo} class alt="BConnect Logo" />
                </Link>

                <div className='hidden md:flex'>
                    <NavBar links={[
                        { name: "Find Vendors", url: "/search" },
                        { name: "Vendors", url: "/search" }
                    ]} />

                    <SignInNav links={[
                        { name: "Sign In", url: "auth/signin" },
                        { name: "Sign Up", url: "auth/signup", isPrimary: true },
                    ]
                    } />


                </div>

                <div className="size-[50px] p-2 md:hidden">
                    {user.isLoggedIn == true && <p className="mr-2">Hello {`${user.username}`}</p>}
                    <img className="size-[30px]" src="https://img.icons8.com/ios/50/FFFFFF/menu-v7.png" alt="Menu Icon" />
                </div>
            </nav>
        </div>
    )
}

export default NavBarComponent