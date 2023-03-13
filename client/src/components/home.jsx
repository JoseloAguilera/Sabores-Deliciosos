import React from "react";
import { PageHeader } from "./common/pageHeader";
import "../App.css";
import { NavLink } from "react-router-dom";

function Home() {
	return (
		<React.Fragment>
			<div className="container-fluid homeDiv ">
				<div className="homePageHeader">
					<PageHeader
						titleText="Sabores Deliciosos"
						description="Un lugar para compartir con el mundo las recetas de tu hogar "
					/>
				</div>
				<section className="home-section">
					<article>
						<p>
							
							Bienvenidos a Sabores Deliciosos, aquí puedes compartir, leer y publicar
							recetas de comida ...
							
						</p>
						<p className="pdis">
							
							Si ya estas registrado/a 
							
						</p>
						<NavLink className="ml-5 btn btn-primary" to="/signin">
							¡Puedes Ingresar Aqui!
						</NavLink>
					</article>
				</section>
			</div>
			
		</React.Fragment>
	);
}

export default Home;
