import { NavLink } from 'react-router-dom'
import logo from '../images/bensco-logo.png'

const Navbar = () => {
    // const styling = ({isActive}) => {return{ color: isActive ? 'red' : 'grey' }}
    return (
        <nav className='navbar'>
            <img src={logo} alt={logo} />
            <NavLink to='/' className={({isActive}) => isActive ? 'link active' : 'link'}>Fleet</NavLink>
            <NavLink to='trucks' className={({isActive}) => isActive ? 'link active' : 'link'}>Trucks</NavLink>
            <NavLink to='zones' className={({isActive}) => isActive ? 'link active' : 'link'}>Zones</NavLink>
            <NavLink to='users' className={({isActive}) => isActive ? 'link active' : 'link'}>Users</NavLink>
        </nav>
    )
}

export default Navbar



// import { Link } from 'react-router-dom'
// import logo from '../images/bensco-logo.png'

// const Navbar = () => {
//   return (
//     <nav className='navbar'>
//       <img src={logo} alt={logo} />
//       <Link to='/'>Fleet</Link>
//       <Link to='trucks'>Trucks</Link>
//       <Link to='zones'>Zones</Link>
//       <Link to='users'>Users</Link>
//     </nav>
//   )
// }

// export default Navbar
