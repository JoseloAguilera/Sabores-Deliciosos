import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import Form from "./common/form";
import { PageHeader } from "./common/pageHeader";
import userService from "../services/userService";
import httpService from "../services/httpService";
import config from "../config.json";
const { apiUrl } = config;

class RecipeCreate extends Form {
	state = {
		data: {
			titulo: "",
			foto: "",
			ingredientes: "",
			instrucciones: "",
		},
		errors: {},
		fotoErrors: null,
	};

	//checking the form schema
	schema = {
		titulo: Joi.string().required().min(3).label("Titulo"),
		foto: Joi.object(),
		ingredientes: Joi.string().required().min(10).label("Ingredientes"),
		instrucciones: Joi.string().required().min(15).label("Instrucciones"),
  };
  
	//changing the input value
	handleOnChange = (e) => {
		document.querySelector(".custom-file-label").innerText =
			e.target.files[0].name;
		this.setState((this.state.data.foto = e.target.files[0]));
	};

	//submit with file type and extension validation
	submit = async (e) => {
		const { history } = this.props;
		const { titulo, foto, ingredientes, instrucciones } = this.state.data;
		const fileType = /\/(gif|jpe?g|tiff?|png|webp|bmp)$/i;
		const fileEx = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
		if (!fileEx.test(foto.name.toLowerCase()))
			return this.setState({ fotoErrors: "Inserte un archivo válido" });
		if (!fileType.test(foto.type.toLowerCase()))
			return this.setState({ fotoErrors: "Inserte un archivo válido" });
		//making formData to send a file
		const form = new FormData();
		form.append("titulo", titulo);
		form.append("foto", foto);
		form.append("ingredientes", ingredientes);
		form.append("instrucciones", instrucciones);
		try {
			await httpService.post(`${apiUrl}/recetas/new`, form, {
				headers: {
					"content-type": "multipart/form-data",
				},
			});
			toast("Has creado una nueva receta.", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			console.log("realizando el redirect");
			window.location = "/recetas";
		} catch (err) {
			console.log("Error al crear receta.");
		}
	};

	render() {
		if (!userService.getCurrentUser()) {
			return <Navigate to="/signin" />;
		}
		const { foto } = this.state.data;
		const { fotoErrors } = this.state;
		return (
			<div className="container">
				<PageHeader
					titleText="Crear Receta."
					description="Crea tu Receta y compartela con los demás."
				/>
				<div className="row mt-5">
					<div className="col-lg-6 mx-auto">
						<form onSubmit={this.handleSubmit}>
							{this.renderInput("titulo", "Titulo")}
							{this.renderTextarea(`ingredientes`, `Ingredientes`)}
							{this.renderTextarea("instrucciones", "Instrucciones")}
							<div className="form-group">
								<label htmlFor="foto">Imagen</label>
								<div className="input-group mb-3">
									<div className="custom-file">
										<input
											type="file"
											className="custom-file-input"
											id="inputGroupFile02"
											onChange={this.handleOnChange}
										/>
										<label
											className="custom-file-label"
											htmlFor="inputGroupFile02"
											aria-describedby="inputGroupFileAddon02"
										>
											{foto && foto.name}
										</label>
									</div>
								</div>
								{fotoErrors && (
									<span className="text-danger d-block"> {fotoErrors}</span>
								)}
							</div>
							{this.renderButton("Guardar")}
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default RecipeCreate;
