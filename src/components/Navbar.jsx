import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link to="/dashboard" className="btn btn-ghost normal-case text-xl">BlogApp</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/blogs">Blogs</Link></li>
          <li><Link to="/blogs/new">Create Blog</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </div>
    </div>
  );
}