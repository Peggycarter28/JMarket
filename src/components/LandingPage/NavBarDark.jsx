import { Link } from "react-router-dom"
import DropdownArrow from "../../assets/chevron-down.svg"


const NavBarWhite = ({links}) => {
    return <ul className="flex gap-2">
        {links.map(
            (link, index)=>{
                return (<li key={index} className='px-5 py-3'> 
                <Link className="text-white text-[16px] font-semibold flex gap-2 items-center justify-center" to={`${link.url}`}>{link.name} <img src={DropdownArrow} alt="drop-down-icon" /></Link>
            </li>)
            }
        )}
    </ul>
}

export default NavBarWhite