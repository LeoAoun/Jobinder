import "@styles/components/service-profile/ServiceProfileOptions.css";
import { useState } from "react";
import { toast } from "react-toastify";

import { IServiceProfile, IUserDTO } from "@interfaces/IUser";

import { updateUserServiceProfile } from "@services/userServices";
import { useAuth } from "@contexts/AuthContext";

interface EditDescriptionProps {
  loggedUserDTO: IUserDTO | null;
  setLoggedUserDTO: React.Dispatch<React.SetStateAction<IUserDTO | null>>;
  setChoosedOption: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function EditDescription({
  loggedUserDTO,
  setLoggedUserDTO,
  setChoosedOption,
}: EditDescriptionProps) {
  const { loggedUserId } = useAuth();
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (description.length < 20) {
        toast.error("A descrição dos serviços está muito curta");
        return;
      }

      if (description.length > 150) {
        toast.error("A descrição dos serviços está muito longa");
        return;
      }

      if (!loggedUserDTO) {
        return;
      }

      const updatedServiceProfile = loggedUserDTO.serviceProfile as IServiceProfile;
      const updatedProfile = { ...updatedServiceProfile, description };
      setLoggedUserDTO({ ...loggedUserDTO, serviceProfile: updatedProfile });

      await updateUserServiceProfile(loggedUserId, updatedProfile);

      setDescription("");

      toast.success("Descrição atualizada com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar descrição:", error);
      alert("Ocorreu um erro ao tentar atualizar a descrição. Tente novamente.");
    }
  };

  return (
    <div className="edit-option-container">
      <h2>Editar Descrição</h2>
      <button className="exit-edit-options" onClick={() => setChoosedOption(null)}>
        voltar
      </button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">Descrição:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Escreva aqui a nova descrição de serviços"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Editar</button>
      </form>
    </div>
  );
}
