import "@styles/components/service-profile/ServiceProfileOptions.css";
import { useState } from "react";
import { toast } from "react-toastify";

import { IServiceProfile, IUserDTO } from "@interfaces/IUser";
import { useAuth } from "@contexts/AuthContext";

import { convertImageToBase64, updateServiceImage } from "@services/userServices";

interface EditImageProps {
  loggedUserDTO: IUserDTO | null;
  setLoggedUserDTO: React.Dispatch<React.SetStateAction<IUserDTO | null>>;
  setChoosedOption: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function EditImage({
  loggedUserDTO,
  setLoggedUserDTO,
  setChoosedOption,
}: EditImageProps) {
  const { loggedUserId } = useAuth();
  const [serviceImg, setServiceImg] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!serviceImg) {
      toast.error("Por favor, selecione uma imagem.");
      return;
    }

    try {
      if (!loggedUserDTO) {
        return;
      }

      // Convert image to base64
      const imgBase64 = await convertImageToBase64(serviceImg);

      const updatedServiceProfile = loggedUserDTO.serviceProfile as IServiceProfile;
      const updatedProfile = { ...updatedServiceProfile, serviceImg: imgBase64 };
      setLoggedUserDTO({ ...loggedUserDTO, serviceProfile: updatedProfile });

      await updateServiceImage(loggedUserId, serviceImg);

      toast.success("Imagem de perfil atualizada com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar imagem:", error);
      alert("Ocorreu um erro ao tentar atualizar a imagem. Tente novamente.");
    }
  };

  return (
    <div className="edit-option-container">
      <h2>Editar Imagem</h2>
      <button className="exit-edit-options" onClick={() => setChoosedOption(null)}>
        voltar
      </button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="image">Selecione uma imagem:</label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setServiceImg(file);
          }}
        />
        <button type="submit">Editar</button>
      </form>
    </div>
  );
}
