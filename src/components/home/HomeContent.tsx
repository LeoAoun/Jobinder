import "@styles/components/home/HomeContent.css";
import { Link } from "react-router-dom";

import ROUTES from "@routes";

export default function HomeContent() {
  return (
    <div className="home-content">
      <div className="home-content-text">
        <h1>Deslize, encontre e resolva!</h1>
        <p>
          Descubra como é fácil encontrar a ajuda que você precisa com apenas alguns cliques.
          Navegue entre as opções e conecte-se rapidamente ao profissional certo para resolver
          qualquer necessidade. Simples, rápido e eficiente.
        </p>
      </div>
      <div className="home-content-buttons">
        <Link to={ROUTES.ServiceCategories}>
          <button className="categories">Categorias de Serviço</button>
        </Link>
        <Link to={ROUTES.MatchAndChat}>
          <button className="hire">Contrate</button>
        </Link>
      </div>
    </div>
  );
}
