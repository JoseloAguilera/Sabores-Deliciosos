import http from "./httpService";
import config from "../config.json";
const { apiUrl } = config;

export async function addToFav(data) {
  console.log(data);
  await http.post(`${apiUrl}/recetas/favoritos`, data)
}

export async function removeFav(recipeId) {
  await http.delete(`${apiUrl}/recetas/favoritos/${recipeId}`)
}

export async function getFavorites(id) {
    const data = await http.get(`${apiUrl}/recetas/favoritos/${id}`);
    return data;
}

export default {
  addToFav,
  getFavorites,
  removeFav,
}