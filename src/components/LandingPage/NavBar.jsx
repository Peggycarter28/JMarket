import { Link } from "react-router-dom"
import siteLogo from '../../assets/bauchi-connect-logo.svg'

const NavBar = ({links}) => {
    return <nav className="flex w-full justify-around items-center">
    <img src={siteLogo} alt="" />

    <ul className="flex gap-8">
        {links.map(
            (link, index)=>{
                return <li key={index}> 
                    <Link to={link.url}>{link.name}</Link>
                </li>
            }
        )}
    </ul>
</nav>
}

export default NavBar