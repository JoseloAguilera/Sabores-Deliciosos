import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "./common/form";
import { PageHeader } from "./common/pageHeader";
import { Navigate, Link } from "react-router-dom";
import userService from "../services/userService";

class SignIn extends Form {
	state = {
		data: {
			email: "",
			password: "",
		},
		errors: {},
	};

	//checking the joi schema vs the user data
	schema = {
		email: Joi.string().required().email().label("Email"),
		password: Joi.string().required().min(8).label("Password"),
	};

	//sending the user data and bring the user a token
	async submit() {
		/* const { state } = this.props.location; */
		const { state } = this.props.location?.state || {};

		const { email, password } = this.state.data;
		try {
			await userService.login(email, password);
			if (state && state.from) {
				return (window.location = state.from.pathname);
			}
			window.location = "/";
			toast("Bienvenido a Sabores deliciosos!", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (error) {
			if (error.response && error.response.status === 400) {
				this.setState({
					errors: { email: error.response.data },
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
					titleText="Iniciar Sesion"
					description="Inicia Sesion en Sabores Deliciosos."
				/>
				<div className="row mt-5">
					<div className="col-lg-6 mx-auto">
						<form onSubmit={this.handleSubmit} noValidate>
							{this.renderInput("email", "Email", "email")}
							{this.renderInput("password", "Contraseña", "password")}
							{this.renderButton("Ingresar")}
							<Link to="/signup" className="ml-5 mt-3">
								¡Quiero Registrarme!
							</Link>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
export default SignIn;
