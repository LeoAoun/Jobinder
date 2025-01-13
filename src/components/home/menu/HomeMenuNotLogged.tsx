import { Link } from "react-router-dom";

export default function HomeMenuNotLogged() {
  return (
    <div className="menu-not-logged">
      <Link className="link" to="/register">
        <span className="">CADASTRE-SE</span>
      </Link>
      <Link className="link" to="/login">
        <span>ENTRAR</span>
      </Link>
    </div>
  );
}
