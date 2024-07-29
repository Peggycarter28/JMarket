import { Link } from "react-router-dom"
import siteLogo from '../../assets/bauchi-connect-logo.svg'

const SignInNavWhite = ({links}) => {
    return ( <ul className="flex gap-8">
        {links.map(
            (link, index)=>{
                return (link.isPrimary 
                    ? <li key={index} className='bg-[#EF6C00] px-5 py-3 rounded'> 
                    <Link className="text-white text-[16px] font-semibold" to={`/${link.url}`}>{link.name}</Link>
                </li> 
                : <li key={index} className='px-5 py-3'> 
                <Link className="text-white text-[16px] font-semibold" to={`/${link.url}`}>{link.name}</Link>
           &nbsp;  &nbsp; &nbsp; | </li>)
            }
        )}
        </ul>
        )
}
 


export default SignInNavWhite