import "@styles/components/service-profile/ServiceProfileOptions.css";
import { useState } from "react";
import { toast } from "react-toastify";

import { IServiceProfile, IUserDTO } from "@interfaces/IUser";

import { updateUserServiceProfile } from "@services/userServices";
import { useAuth } from "@contexts/AuthContext";

interface EditAvailabilityProps {
  loggedUserDTO: IUserDTO | null;
  setLoggedUserDTO: React.Dispatch<React.SetStateAction<IUserDTO | null>>;
  setChoosedOption: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function EditAvailability({
  loggedUserDTO,
  setLoggedUserDTO,
  setChoosedOption,
}: EditAvailabilityProps) {
  const { loggedUserId } = useAuth();
  const [availability, setAvailability] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (availability.length < 10) {
        toast.error("A disponibilidade está muito curta");
        return;
      }

      if (availability.length > 50) {
        toast.error("A disponibilidade está muito longa");
        return;
      }

      if (!loggedUserDTO) {
        return;
      }

      const updatedServiceProfile = loggedUserDTO.serviceProfile as IServiceProfile;
      const updatedProfile = { ...updatedServiceProfile, availability };
      setLoggedUserDTO({ ...loggedUserDTO, serviceProfile: updatedProfile });

      await updateUserServiceProfile(loggedUserId, updatedProfile);

      setAvailability("");

      toast.success("Disponibilidade atualizada com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar disponibilidade:", error);
      alert("Ocorreu um erro ao tentar atualizar a disponibilidade. Tente novamente.");
    }
  };

  return (
    <div className="edit-option-container">
      <h2>Editar Disponibilidade</h2>
      <button className="exit-edit-options" onClick={() => setChoosedOption(null)}>
        voltar
      </button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="availability">Disponibilidade:</label>
        <input
          id="availability"
          name="availability"
          type="text"
          placeholder="Escreva aqui sua disponibilidade"
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
        />
        <button type="submit">Editar</button>
      </form>
    </div>
  );
}
