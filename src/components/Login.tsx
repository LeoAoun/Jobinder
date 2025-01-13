import "@styles/components/Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { compare } from "bcryptjs-react";

import logo from "@assets/logo.png";
import ROUTES from "@routes";

import { useAuth } from "@contexts/AuthContext";

import { getUser } from "@services/userServices";

export default function Login() {
  const { setLoggedUserId } = useAuth();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const clearInput = () => {
    setPhone("");
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Check if all fields are filled
      if (!phone || !password) {
        toast.error("Preencha todos os campos.");
        return;
      }

      // Check if the user exists
      const userExists = await getUser(phone);
      if (!userExists) {
        toast.error("Usuário ou senha incorretos.");
        return;
      }

      // Check if the password is correct
      const comparePassword = await compare(password, userExists.password);
      if (!comparePassword) {
        toast.error("Usuário ou senha incorretos.");
        return;
      }

      setLoggedUserId(phone);
      clearInput();
      toast.success("Usuário logado com sucesso!");
      setTimeout(() => navigate(ROUTES.Home), 3000);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro desconhecido.");
      }
    }
  };

  return (
    <div className="login">
      <Link to={ROUTES.Home}>
        <img className="logo" src={logo} alt="Logo" />
      </Link>
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="phone">Digite seu número do celular:</label>
          <input
            id="phone"
            type="text"
            placeholder="Exemplo: 11988887777"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label htmlFor="password">Crie uma senha:</label>
          <input
            id="password"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Entrar</button>
        </form>

        <Link to={ROUTES.Register}>
          <span className="go-to-register">Cadastre-se aqui</span>
        </Link>
      </div>
    </div>
  );
}
