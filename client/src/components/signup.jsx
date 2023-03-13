import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Navigate, Link } from "react-router-dom";
import Form from "./common/form";
import { PageHeader } from "./common/pageHeader";
import http from "../services/httpService";
import config from "../config.json";
import userService from "../services/userService";
const { apiUrl } = config;

class SignUp extends Form {
	state = {
		data: {
			nombre: "",
			email: "",
			password: "",
		},
		errors: {},
	};

	//checking the schema vs the user data
	schema = {
		nombre: Joi.string().required().min(2).label("Nombre"),
		email: Joi.string().required().email().label("Email"),
		password: Joi.string().required().min(8).label("Password"),
	};

	//register the user at the server
	async submit() {
		const { navigate } = this.props;
		const data = { ...this.state.data };
		try {
			await http.post(`${apiUrl}/users`, data);
			toast("Te has registrado exitosamente", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			navigate("/signin");
		} catch (error) {
			if (error.response && error.response.status === 414) {
				this.setState({
					errors: { ...this.state.errors, email: "Usuario ya registrado" },
				});
			}
		}
	}

	render() {
		if (userService.getCurrentUser()) {
			return <Navigate to="/" />;
		}
		return (
			<div className="container mt-4">
				<PageHeader
					titleText="Registro"
					description="Registrate en Sabores Deliciosos."
				/>
				<div className="row mt-5">
					<div className="col-lg-6 mx-auto">
						<form
							onSubmit={this.handleSubmit}
							noValidate="noValidate"
							autoComplete="off"
						>
							{this.renderInput("nombre", "Nombre")}
							{this.renderInput("email", "Email", "email")}
							{this.renderInput("password", "Password", "password")}
							{this.renderButton("Registrar")}
							<Link to="/signin" className="ml-5">
								¡Ya estoy registrado!
							</Link>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default SignUp;
