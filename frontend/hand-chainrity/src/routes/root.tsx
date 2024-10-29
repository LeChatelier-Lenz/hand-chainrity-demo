import { Link, Outlet } from "react-router-dom";

export default function Root() {
    return (
      <>
        <div id="sidebar">
            <nav>
            <ul>
                <li>
                    <Link to="./campaign">Campaign</Link>
                </li>
                <li>
                    <Link to="./launch">Launch</Link>
                </li>
                <li>
                    <Link to="./user">User</Link>
                </li>
            </ul>
            </nav>
        </div>
        <div id="detail">
            <Outlet />
        </div>
      </>
    );
  }