import NavBar from "./LandingPage/NavBar"
import SignInNav from "./LandingPage/SignInNav"
import siteLogo from '../assets/bauchi-connect-logo.svg'
import { Link } from "react-router-dom"
import NavBarWhite from "./LandingPage/NavBarDark"
import SignInNavWhite from "./LandingPage/SignInNavWhite"

const NavBarLandingComponent = () => {
    return (
        <div className="flex w-full">
            <div className="flex w-full justify-end absolute top-0 right-0 mt-3 mr-3 index-[45]">
                <select className="text-right" id="">
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

                <div className="size-[50px] p-2 md:hidden">
                    <img className="size-[30px]" src="https://img.icons8.com/ios/50/FFFFFF/menu-v7.png" alt="Menu Icon" />
                </div>
            </nav>
        </div>
    )
}

export default NavBarLandingComponent