import axios from "axios";

// Capitalize the first letter of each word in a string
const capitalize = (string: string) => {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const getStates = async () => {
  try {
    const response = await axios.get("https://brasilapi.com.br/api/ibge/uf/v1");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

const getCities = async (state: string) => {
  try {
    const response = await axios.get(`https://brasilapi.com.br/api/ibge/municipios/v1/${state}`);
    return response.data.map((city: { nome: string }) => capitalize(city.nome));
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export { getStates, getCities };
