import axios from "axios";

const capitalize = (string: string) => {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const getStates = async () => {
  try {
    const response = await axios.get("https://brasilapi.com.br/api/ibge/uf/v1");
    return response.data; // Retorna os estados corretamente
  } catch (error) {
    console.error("Error:", error);
    return []; // Retorna um array vazio em caso de erro
  }
};

const getCities = async (state: string) => {
  try {
    const response = await axios.get(
      `https://brasilapi.com.br/api/ibge/municipios/v1/${state}`
    );
    return response.data.map((city: {nome: string}) => capitalize(city.nome)); // Retorna a lista de cidades formatada
  } catch (error) {
    console.error("Error:", error);
    return []; // Retorna um array vazio em caso de erro
  }
};

export { getStates, getCities };
