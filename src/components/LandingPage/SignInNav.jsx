import { Link } from "react-router-dom"
import siteLogo from '../../assets/bauchi-connect-logo.svg'

const SignInNav = ({links}) => {
    return ( <ul className="flex flex-col md:flex-row gap-8">
        {links.map(
            (link, index)=>{
                return (link.isPrimary 
                    ? <li key={index} className='bg-[#EF6C00] px-5 py-3 rounded m-2 md:m-none'> 
                    <Link className="text-white text-[16px] font-semibold flex items-center justify-center" to={`/${link.url}`}>{link.name}</Link>
                </li> 
                : <li key={index} className='px-5 py-3'> 
                <Link className="text-black text-[16px] font-semibold flex justify-center" to={`/${link.url}`}>{link.name}  &nbsp;  &nbsp; &nbsp; |</Link>
           </li>)
            }
        )}
        </ul>
        )
}
 


export default SignInNav