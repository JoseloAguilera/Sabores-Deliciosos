import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import recipeService from "../services/recipeService";
import { PageHeader } from "./common/pageHeader";
import Recipe from "./recipe";
import "../App.css";

const RecipesList = () => {
	const user = useContext(UserContext);
	const [recipes, setRecipes] = useState([]);
	const [search, setSearch] = useState("");

	//get all the data from the server
	const fetchData = async () => {
		const { data } = await recipeService.getAllRecipes();
		setRecipes(data);
	};

	//fetch the data when the component mount
	useEffect(() => {
		let mount = true;
		if (mount) {
			fetchData();
		}
		return () => (mount = false);
	}, []);

	//take the input value
	const handleInput = (e) => {
		setSearch(e.currentTarget.value);
	};

	//send to the server the req with the given search
	const handleSearch = async () => {
		if ((search === "") | " ") {
			const { data } = await recipeService.getAllRecipes();
			return setRecipes(data);
		}
		const { data } = await recipeService.getSearch(search);
		setRecipes(data);
	};

	return (
		<div className="container mt-4 pl-5">
			<PageHeader
				titleText="Recetas"
				description="Aqui puedes visitar las recetas existentes"
			/>
			{/* <div className="row"> */}
			<div className="col-lg-12">
				{user && (
					<Link to="/crear-receta" className="mt-3 btn btn-primary">
						Crear nueva receta
					</Link>
				)}
				{!user && (
					<Link to="/signup" className="mt-3 ">
						Crear una cuenta
					</Link>
				)}
				{/* </div> */}
			</div>
			<div className="row">
				<div className="col-lg-12 ">
					<div className="mt-3 search-group d-flex">
						<input
							value={search}
							className=""
							onChange={handleInput}
							type="text"
						/>
						<button className="btn btn-secondary" onClick={handleSearch}>
							Buscar
						</button>
					</div>
				</div>
			</div>
			<div className="row mt-4">
				{/* <div className="col-12">		 */}
				{recipes &&
					recipes.map((recipe) => <Recipe key={recipe._id} recipe={recipe} />)}
				{recipes.length === 0 && (
					<div className="row">
						<div className="col-12">
							<h4> No hay resultados. </h4>
						</div>
					</div>
				)}
			</div>
			{/* </div> */}
		</div>
	);
};

export default RecipesList;
