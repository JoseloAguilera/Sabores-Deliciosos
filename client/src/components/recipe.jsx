import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import favoritesService from "../services/favoritesService";
import config from "../config.json";
import recipeService from "../services/recipeService";
import { useEffect } from "react";
import "../App.css";

const { recipeImage } = config;

const Recipe = ({ recipe }) => {
	const user = useContext(UserContext);
	const [recipeUser, setRecipeUser] = useState();

	//creating valid date
	const d = new Date(recipe.createdAt);
	const month = d.getMonth() + 1;
	const year = d.getFullYear();
	const day = d.getDate();
	const recipeUploadDate = `${day}/${month}/${year}`;

	//get the recipe written user name
	const getUser = async () => {
		const { data } = await recipeService.getUserByRecipe(recipe._id);
		return setRecipeUser(data.nombre);
	};

	useEffect(() => {
		getUser();
	}, []); // eslint-disable-line


	const handleAdd = async () => {
		try {
			await favoritesService.addToFav(recipe);
			toast("Añadido a Favoritos.", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			return recipe._id;
		} catch (err) {
			console.log("Aca llegué");
			console.log(recipe);
			return err;
		}
	};


	const handleRemove = async () => {
		try {
			await favoritesService.removeFav(recipe._id);
			toast("Eliminar de Favoritos.", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			return recipe._id;
		} catch (err) {
			return console.log(err);
		}
	};

	
	console.log(recipe);


	return (
		<div className="card m-3" style={{ width: "18rem" }}>
			<div className="userDiv">
				{" "}
				<i className="fas fa-user"></i>&nbsp; {recipeUser}{" "}
				<span className="float-right">{recipeUploadDate}</span>
			</div>
			<div className="imageDiv">
				<img
					src={recipeImage + recipe.foto}
					className="card-img-top imageCard"
					alt={recipe.titulo}
				/>
				{user && user.favoritos.some((id) => id === recipe._id) && (
					<div className="mx-auto favorite-btn" onClick={handleRemove}>
						<i className="fas fa-heart"></i>
					</div>
				)}
				{user && !user.favoritos.some((id) => id === recipe._id) && (
					<div className="mx-auto favorite-btn" onClick={handleAdd}>
						<i className="far fa-heart"></i>
					</div>
				)}
			</div>
			<h5 className="card-title mt-4"> {recipe.titulo}</h5>
			{user && user._id === recipe.user_id && (
				<div className="mx-auto editDiv">
					<div className="card-body">
						<Link
							to={`/recetas/edit/${recipe._id}`}
							className="btn btn-primary mr-2"
						>
							<i className="fas fa-edit"></i> Editar
						</Link>
						<Link
							to={`/recetas/delete/${recipe._id}`}
							className="btn btn-danger"
						>
							<i className="fas fa-trash"></i> Eliminar
						</Link>
					</div>
				</div>
			)}
			<div className="getRecipe">
					{user && (
				<Link to={`/receta/${recipe._id}`} className="get">
					Ver receta
				</Link>
			)}
			{!user && (
				<Link to={`/signup`} className="get">
					Ver receta
				</Link>
			)}
			</div>
		
		</div>
	);
};

export default Recipe;
