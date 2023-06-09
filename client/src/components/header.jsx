import React from "react";
import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../App";
import "../styles/header.css";
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
	let user = useContext(UserContext);;
	return (
		<header className="font-weight-bolder sticky-top">
			<nav className="navbar navbar-expand-lg shadow navbar-light">
				<Link className="navbar-brand" to="/">
					Sabores Deliciosos 
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navIcon">___</span>
					<span className="navIcon">___</span>
					<span className="navIcon">___</span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mx-auto ">
						<li className="nav-item mx-5">
							<NavLink className="nav-link nanLink" to="/recetas">
								Recetas
							</NavLink>
						</li>
						{user && (
							<li className="nav-item mx-5">
								<NavLink className="nav-link nanLink" to="/favoritos">
									Favoritos
								</NavLink>
							</li>
						)}
					</ul>
					{!user && (
						<ul className="navbar-nav ml-3">
							<li className="nav-item mx-5">
								<NavLink className="nav-link nanLink" to="/signin">
									<i className="fas fa-sign-in-alt"></i>&nbsp; Login
								</NavLink>
							</li>
						</ul>
					)}
					{user && (
						<ul className="navbar-nav mr-3">
							<li className="nav-item dropdown mx-5">
								<NavDropdown title={user.nombre} /* id="navbarScrollingDropdown" */ className="nanLink">
									<NavDropdown.Item href="/logout">
										<div className="nav-link nanLink" >
											<i className="fas fa-sign-in-alt"></i>&nbsp; Logout
										</div>
								</NavDropdown.Item>
								</NavDropdown>
							</li>
						</ul>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Header;
