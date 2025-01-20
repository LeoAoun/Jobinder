import "@styles/components/service-profile/ServiceProfileOptions.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { IServiceProfile, IUserDTO } from "@interfaces/IUser";
import { useAuth } from "@contexts/AuthContext";

import { updateUserServiceProfile } from "@services/userServices";
import { getCities, getStates } from "@services/locationServices";

interface EditLocationProps {
  loggedUserDTO: IUserDTO | null;
  setLoggedUserDTO: React.Dispatch<React.SetStateAction<IUserDTO | null>>;
  setChoosedOption: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function EditLocation({
  loggedUserDTO,
  setLoggedUserDTO,
  setChoosedOption,
}: EditLocationProps) {
  const { loggedUserId } = useAuth();

  const [states, setStates] = useState<{ sigla: string; nome: string }[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Fetch states when component mounts
  useEffect(() => {
    const fetchStates = async () => {
      const statesFetched = await getStates();

      const statesSorted = statesFetched
        .map((state: { sigla: string; nome: string }) => ({
          sigla: state.sigla,
          nome: state.nome,
        }))
        .sort((a: { nome: string }, b: { nome: string }) => a.nome.localeCompare(b.nome));

      setStates(statesSorted);
    };

    fetchStates();
  }, []);

  // Fetch cities when state changes
  useEffect(() => {
    const fetchCities = async () => {
      if (selectedState) {
        const citiesFetched = await getCities(selectedState);
        setCities(citiesFetched);
      }
    };

    fetchCities();
  }, [selectedState]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedState || !selectedCity) {
      toast.error("Por favor, selecione um estado e uma cidade.");
      return;
    }

    try {
      if (!loggedUserDTO) {
        console.error("loggedUserDTO is null");
        return;
      }

      const updatedServiceProfile = loggedUserDTO.serviceProfile as IServiceProfile;
      const updatedProfile = {
        ...updatedServiceProfile,
        location: {
          state: selectedState,
          city: selectedCity,
        },
      };
      setLoggedUserDTO({ ...loggedUserDTO, serviceProfile: updatedProfile });

      await updateUserServiceProfile(loggedUserId, updatedProfile);

      toast.success("Localização atualizada com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar localização:", error);
      alert("Ocorreu um erro ao tentar atualizar a localização. Tente novamente.");
    }
  };

  return (
    <div className="edit-option-container">
      <h2>Editar Localização</h2>
      <button className="exit-edit-options" onClick={() => setChoosedOption(null)}>
        voltar
      </button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="state">Estado:</label>
        <select id="state" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
          <option value="" disabled>
            Selecione um estado
          </option>
          {states.map((state) => (
            <option key={state.sigla} value={state.sigla}>
              {state.nome}
            </option>
          ))}
        </select>

        <label htmlFor="city">Cidade:</label>
        <select id="city" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
          <option value="" disabled>
            Selecione uma cidade
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <button type="submit">Editar</button>
      </form>
    </div>
  );
}
