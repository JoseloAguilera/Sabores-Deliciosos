import http from "./httpService";
import config from "../config.json";
const { apiUrl } = config;

export async function getUserByRecipe(id) {
  const data = await http.get(`${apiUrl}/recetas/usuario-receta/${id}`)
  return data;
}

export async function getSearch(search) {
  const data = await http.get(`${apiUrl}/recetas/search/${search}`);
  return data;
}

/* export async function createRecipe(data) {
  await http.post(`${apiUrl}/recetas/new`, data);
} */

export async function getAllRecipes() {
  const data = await http.get(`${apiUrl}/recetas`);
  return data;
}

export async function getRecipe(recipeId) {
  const data = await http.get(`${apiUrl}/recetas/${recipeId}`);
  return data;
}

export async function editRecipe(data) {
  const { _id: recipeId, ...recipe } = data;
  await http.put(`${apiUrl}/recetas/edit/${recipeId}`, recipe);
}

export function deleteRecipe(recipeId) {
  return http.delete(`${apiUrl}/recetas/delete/${recipeId}`);
}

export default {
  getAllRecipes,
  getRecipe,
  editRecipe,
  deleteRecipe,
  /* createRecipe, */
  getSearch,
  getUserByRecipe,
}