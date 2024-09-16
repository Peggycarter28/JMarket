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
        <div className="flex w-full h-[48px]">
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
                        { name: user.lang == 'en'? "Find Vendors": "Nemi masu siyar wa", url: "/search" },
                        { name: user.lang == 'en' ? 'Vendors' : "Masu siyar wa", url: "/search" }
                    ]} />

                    <SignInNav links={[
                        { name: user.lang == 'en' ? "Sign In" : "Shiga akaunt", url: "auth/signin" },
                        { name: user.lang == 'en' ? "Sign Up" : "Bude sabon akaunt", url: "auth/signup", isPrimary: true },
                    ]
                    } />


                </div>

                <div className="size-[50px] p-2 md:hidden">
                    {user.isLoggedIn == true && <p className="mr-2">Hello {`${user.username}`}</p>}
                    <img className="size-[30px]" src="https://img.icons8.com/ios-filled/50/737373/menu--v1.png" alt="Menu Icon" />
                </div>
            </nav>
        </div>
    )
}

export default NavBarComponent