import React, {Component} from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import Form from "./common/form";
import { PageHeader } from "./common/pageHeader";
import recipeService from "../services/recipeService";
import httpService from "../services/httpService";
import config from "../config.json";
const { apiUrl } = config;


function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}


class RecipeEdit extends Form {
  state = {
    data: {
      _id: '',
      titulo: "",
      foto: '',
      ingredientes: "",
      instrucciones: "",
    },
    showDiv: false,
    errors: {},
  };

  //validate the data by the schema
  schema = {
    _id: Joi.string(),
    foto: Joi.object(),
    titulo: Joi.string().required().min(3).label("Titulo"),
    ingredientes: Joi.string().required().min(10).label("Ingrediente"),
    instrucciones: Joi.string().required().min(15).label("Instrucciones"),
  };

  //show/unShow the edit image div
  handleClick = (e) => {
    e.preventDefault();
    const { showDiv } = this.state;
    if (showDiv === false) {
      this.setState({ showDiv: true });
    } else if (showDiv === true) {
      this.setState({ showDiv: false });
    }
  }

  //change the file by the given file
 /*  handleOnChange = (e) => {
    document.querySelector('.custom-file-label').innerText = e.target.files[0].name;
    this.setState({ data: { ...this.state.data, foto: e.target.files[0] } });
    console.log(this.state.data.foto);
  }
 */
  handleOnChange = (e) => {
    const file = e.target.files[0];
    document.querySelector('.custom-file-label').innerText = file.name;
    this.setState({
      data: {
        ...this.state.data,
        foto: file
      }
    });
    console.log(this.state.data.foto);
  }
  //reflection the given prop data 
  mapToViewModel = (recipe) => {
    return {
      _id: recipe._id,
      titulo: recipe.titulo,
      ingredientes: recipe.ingredientes,
      instrucciones: recipe.instrucciones
    };
  }

  //showing the data from the server
  async componentDidMount() {
    console.log(this.props.params);
    const recipeId = this.props.params.id;
    const { data } = await recipeService.getRecipe(recipeId);
    console.log(data);
    this.setState({ data: this.mapToViewModel(data) });
  }

  //checking if send the form with file or not end send to server the correct form
  async submit() {
    const { history } = this.props;
    const { _id, titulo, foto, ingredientes, instrucciones } = this.state.data;
    if (foto !== '' || foto !== null) {
      const form = new FormData();
      form.append('_id', _id);
      form.append('titulo', titulo);
      form.append('foto', foto);
      form.append('ingredientes', ingredientes);
      form.append('instrucciones', instrucciones);
      await httpService.put(`${apiUrl}/recetas/edit/${_id}`, form, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      });
    } else {
      //checking the extension and type of uploaded file 
      const fileType = /\/(gif|jpe?g|tiff?|png|webp|bmp)$/i;
      const fileEx = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
      if (!fileEx.test(foto.name.toLowerCase())) return this.setState({ fileErrors: 'Please insert valid file' });
      if (!fileType.test(foto.type.toLowerCase())) return this.setState({ fileErrors: 'Please insert valid file' });
      const form = new FormData();
      form.append('_id', _id);
      form.append('titulo', titulo);
      form.append('ingredientes', ingredientes);
      form.append('instrucciones', instrucciones);
      await httpService.put(`${apiUrl}/recetas/edit/${_id}`, form, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      });
    }
    toast("Recipe has updated.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    window.location = "/recetas";
  }

  render() {
    const { foto } = this.state.data;
    const { showDiv } = this.state;
    return (
      <div className="container">
        <PageHeader
          titleText="Editar receta."
          description="Edita tu receta."
        />
        <div className="row mt-5">
          <div className="col-lg-6 mx-auto">
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("titulo", "Titulo")}
              {this.renderTextarea(`ingredientes`, `Ingredientes`)}
              {this.renderTextarea("instrucciones", "Instrucciones")}
              {showDiv &&
                <div className="addImage">
                  <div className="form-group">
                    <label htmlFor="file">Edit image</label>
                    <div className="input-group mb-3">
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={this.handleOnChange} />
                        <label className="custom-file-label" htmlFor="inputGroupFile02" aria-describedby="inputGroupFileAddon02">{foto && foto.name}</label>
                      </div>
                      <div className="input-group-append">
                        <span className="input-group-text" id="inputGroupFileAddon02">Upload</span>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {this.renderButton("Edit")}
              <Link className="btn btn-secondary ml-2" to="/recetas">Cancel</Link>
              <button className='btn btn-primary ml-5' type="button" onClick={this.handleClick}>Edit Image</button>
            </form>
          </div>
        </div >
      </div >
    );
  }
}


export default withParams(RecipeEdit);
