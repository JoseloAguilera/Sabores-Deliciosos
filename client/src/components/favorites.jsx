import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import httpService from "../services/httpService";
import { PageHeader } from "./common/pageHeader";
import Recipe from "./recipe";
import config from "../config.json";
const { apiUrl } = config;

const Favorites = () => {
	const user = useContext(UserContext);
	const [data, setData] = useState();
	useEffect(() => {
		//for unmounting the data
		let mount = true;
		httpService
			.get(`${apiUrl}/recetas/favoritos`)
			.then((data) => {
				if (mount) {
					setData(data.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
		return () => (mount = false);
	}, [data]); //render each time the data changing

	return (
		<div className="container mt-4">
			<PageHeader
				titleText="Favoritos"
				description="Tus recetas favoritas."
			/>
			<div className="row mx-auto mt-4">
				{data &&
					data.map((recipe) => (
						<Recipe user={user} key={recipe._id} recipe={recipe} />
					))}
			</div>
		</div>
	);
};

export default Favorites;
