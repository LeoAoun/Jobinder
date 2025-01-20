import "@styles/components/ServiceProfile/ServiceProfileMenu.css";
import { Link } from "react-router-dom";

export default function ServiceProfileMenu() {
  return (
    <div className="service-profile-menu-container">
      <div className="menu-other-options">
        <h2>Menu</h2>
        <Link to="/home" className="link">
          <span>Página Inicial</span>
        </Link>
        <button>Serviços Realizados</button>
        <button>Chat</button>
      </div>
      <div className="menu-edit-options">
        <button>Editar Especialidade</button>
        <button>Editar Disponibilidade</button>
        <button>Editar Descrição</button>
        <button>Editar Estado ou Cidade</button>
        <button>Editar Imagem</button>
      </div>
    </div>
  );
}
