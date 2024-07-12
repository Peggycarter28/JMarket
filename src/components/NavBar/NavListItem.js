import { Link } from "react-router-dom"

const NavListItem = ({ key, linkTitle, href, linkIcon }) => {
    return (
    <>
        <li key={key}>
            <Link to={href}>
                <img src={linkIcon} />
                {linkTitle}
            </Link>
        </li>
    </>)
}

export default NavListItem