// src/components/Header.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css"; // crea este archivo con tu CSS
import { useAuth } from "../../context/AuthContext";


const Header = () => {
  const location = useLocation();
  const hideHeader = ["/login", "/register"].includes(location.pathname);
	const [menuOpen, setMenuOpen] = useState(false);

	const { logout } = useAuth();

  if (hideHeader) return null;

	

    // Obtenemos el usuario desde localStorage
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const isAdmin = user?.role === "admin"; 

  return (
		<>
		{/* Botón hamburguesa para móvil */}
    <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
      ☰
    </button>
				<ul className={`menu ${menuOpen ? "open" : ""}`}>
					<li title="Home">
						<Link to="/" className="fa fa-home">Home</Link>
					</li>
					<li title="NewFlat">
						<Link to="/new-flat" className="fa fa-pencil">NewFlat</Link>
					</li>
					<li title="Profile">
						<Link to="/profile" class="fa fa-cog" aria-hidden="true">Profile</Link>
					</li>

					{/* Solo visible si es admin */}
					{isAdmin && (
						<li title="AllUsers">
							<Link to="/allusers" class="fa fa-users" aria-hidden="true">Users</Link>
						</li>
					)}

					{/* Solo usuarios logueados ven esta opción */}
					<li title="Logout" onClick={logout}>
						<Link to="/login" class="fa fa-sign-out" aria-hidden="true">Logout</Link>
					</li>
					
				</ul>
    </>
  );
};

export default Header;
