import { Component } from 'react';
import { useParams } from 'react-router-dom';
import recipeService from '../services/recipeService';


function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

//delete the recipe and go back to recipes page
class DeleteRecipe extends Component {
  async componentDidMount() {
    await recipeService.deleteRecipe(this.props.params.id);
    window.location = "/recetas";
  }
  render() {
    return null;
  }
}

export default withParams(DeleteRecipe);