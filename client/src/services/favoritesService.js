import http from "./httpService";
import config from "../config.json";
const { apiUrl } = config;

export async function addToFav(data) {
  await http.post(`${apiUrl}/recetas/favoritos`, {data})
}

export async function removeFav(recipeId) {
  await http.delete(`${apiUrl}/recetas/favoritos/${recipeId}`)
}

export async function getFavorites() {
    const data = await http.get(`${apiUrl}/recetas/favoritos`);
    return data;
}

export default {
  addToFav,
  getFavorites,
  removeFav,
}