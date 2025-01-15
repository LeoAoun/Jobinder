import "@styles/components/create-service-profile/Details.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import logo from "@assets/logo.png";
import ROUTES from "../../Routes";

import { useAuth } from "@contexts/AuthContext";
import { IServiceProfile, IUser, IUserDTO } from "@interfaces/IUser";

import { getStates, getCities } from "@services/locationServices";
import { getUser, updateUserServiceProfile, convertImageToBase64, getUserDTO } from "@services/userServices";

export default function Details() {
  const navigate = useNavigate();

  const { loggedUserId } = useAuth();

  const [loggedUserDTO, setLoggedUserDTO] = useState<IUserDTO | null>(null);

  const [states, setStates] = useState<{ sigla: string; nome: string }[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [serviceImg, setServiceImg] = useState<File | null>(null);

  // Fetch logged user DTO when component mounts
  useEffect(() => {
    const fetchLoggedUser = async () => {
      const user: IUserDTO | null = await getUserDTO(loggedUserId);

      if (!user) {
        navigate(ROUTES.Home);
        toast.error("Usuário não encontrado");
        return;
      }

      if (!user.serviceProfile) {
        navigate(ROUTES.CreateServiceProfileCategories);
        toast.error("Selecione uma especialidade antes de criar o perfil de serviço");
        return;
      }

      setLoggedUserDTO(user);
    };

    fetchLoggedUser();
  }, [loggedUserId, navigate]);

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
      if (state) {
        const citiesFetched = await getCities(state);
        setCities(citiesFetched);
      }
    };

    fetchCities();
  }, [state]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user: IUser | null = await getUser(loggedUserId);

    if (!user) {
      toast.error("Usuário não encontrado");
      return;
    }

    if (!description || !availability || !state || !city || !serviceImg) {
      toast.error("Preencha todos os campos");
      return;
    }

    if (!user.serviceProfile) {
      toast.error("Selecione uma especialidade antes de criar o perfil de serviço");
      return;
    }

    if (user.serviceProfile.servicesPerformed > 0) {
      toast.error("Perfil de serviço já criado");
      return;
    }

    if (description.length < 20) {
      toast.error("A descrição dos serviços está muito curta");
      return;
    }

    if (description.length > 200) {
      toast.error("A descrição dos serviços está muito longa");
      return;
    }

    if (availability.length < 10) {
      toast.error("A disponibilidade está muito curta");
      return;
    }

    if (availability.length > 50) {
      toast.error("A disponibilidade está muito longa");
      return;
    }

    const imgBase64 = await convertImageToBase64(serviceImg);

    const serviceProfile: IServiceProfile = {
      specialty: user.serviceProfile.specialty,
      servicesPerformed: 0,
      rating: 0,
      availability,
      description,
      serviceImg: imgBase64,
      location: {
        city,
        state,
      },
    };

    await updateUserServiceProfile(loggedUserId, serviceProfile);

    setTimeout(() => {
      navigate(ROUTES.Home);
    }, 3000);

    toast.success("Perfil de serviço criado com sucesso!");
  };

  return (
    <div className="create-service-profile-container">
      <Link to={ROUTES.Home}>
        <img className="logo" src={logo} alt="Logo" />
      </Link>
      <div className="create-service-profile-form">
        <h1>Criar Perfil de Serviços</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="specialty">Especialidade:</label>
          <span id="specialty">{loggedUserDTO?.serviceProfile?.specialty}</span>

          <label htmlFor="services">Descrição dos Serviços:</label>
          <textarea
            id="services"
            placeholder="Descreva os serviços que você oferece"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <label htmlFor="avaliability">Disponibilidade:</label>
          <input
            id="avaliability"
            type="text"
            placeholder="Ex: Segunda a Sexta, 8h - 18h"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />

          <label htmlFor="state">Estado:</label>
          <select id="state" value={state} onChange={(e) => setState(e.target.value)}>
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
          <select id="city" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="" disabled>
              Selecione uma cidade
            </option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <label htmlFor="serviceImg">Imagem de um Serviço Realizado:</label>
          <input
            id="serviceImg"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setServiceImg(file);
            }}
          />
          <button type="submit">Criar Perfil</button>
        </form>
      </div>
    </div>
  );
}
