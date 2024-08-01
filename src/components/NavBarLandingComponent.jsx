import siteLogo from '../assets/bauchi-connect-logo.svg'
import { Link } from "react-router-dom"
import NavBarWhite from "./LandingPage/NavBarDark"
import SignInNavWhite from "./LandingPage/SignInNavWhite"
import { useContext, useState } from "react"
import { UserContext } from "../context/AppContextt"
import NavBarLanding from './LandingPage/NavBar'
import SignInNav from './LandingPage/SignInNav'



const NavBarLandingComponent = () => {
    const {user, setUser} = useContext(UserContext)

    const [showMenu, setShowMenu] = useState(false)

 
   const handleLangUpdate = (lang) => {
     setUser(prev => ({...prev, lang: lang}))
    }

    const handleToggleNavBar = () => {
        setShowMenu(!showMenu)
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
                    <img src={siteLogo} className="w-[120px] md:w-auto" alt="BConnect Logo" />
                </Link>

                <div className='hidden md:flex'>
                    <NavBarWhite links={[
                        { name: "Find Vendors", url: "/search" },
                        { name: "Vendors", url: "/search" }
                    ]} />

                    <SignInNavWhite links={[
                        { name: "Sign In", url: "auth/signin" },
                        { name: "Sign Up", url: "auth/signup", isPrimary: true },
                    ]
                    } />


                </div>

                <div className="flex gap-1">
                    {user.isLoggedIn == true && user.username !== null && <p className="mr-2 mt-2 text-[#d9d9d9] font-semibold text-[10px] md:text-[14px]">Hello {`${user.username}`}. {user.id} <br/>Go to <Link to={'/dashboard/user/'}>Dashboard</Link></p>}
                <div className="size-[50px] p-2 md:hidden">
                    
                    <img className="size-[30px]" onClick={handleToggleNavBar} src="https://img.icons8.com/ios-filled/50/737373/menu--v1.png" alt="Menu Icon" />
                </div>

              
                </div>

                
            </nav>
              {/* Mobile Nav Menu */}
              {
                showMenu == true && <div className='absolute bg-[white] w-full h-[70vh] shadow-lg left-0 top-0 flex flex-col'>
                <div className='justify-end p-4 flex'>
                <img className="size-[30px]" onClick={handleToggleNavBar} src="https://img.icons8.com/ios-filled/50/737373/menu--v1.png" alt="Menu Icon" />
                </div>

                <NavBarLanding links={[
                        { name: "Find Vendors", url: "/search" },
                        { name: "Vendors", url: "/search" }
                    ]} />

                <SignInNav links={[
                        { name: "Sign In", url: "auth/signin" },
                        { name: "Sign Up", url: "auth/signup", isPrimary: true },
                    ]
                    } />

</div>
}
        </div>
    )
}

export default NavBarLandingComponent