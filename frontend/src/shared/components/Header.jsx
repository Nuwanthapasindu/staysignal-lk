// M2 notices + shared chrome
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <h1><Link to="/">StaySignal LK</Link></h1>
      <nav>
        <Link to="/notices">Notices</Link>
        <Link to="/towns/example">Towns</Link>
        <Link to="/problem">The problem</Link>
        <Link to="/owner">Owner desk</Link>
      </nav>
      <Link to="/post"><button>Post a notice</button></Link>
    </header>
  );
}
