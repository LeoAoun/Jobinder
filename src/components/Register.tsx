import "@styles/components/Register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { hash } from "bcryptjs-react";

import logo from "@assets/logo.png";
import ROUTES from "@routes";

import { getUserDTO, createUser } from "@services/userServices";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const clearInput = () => {
    setFullName("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Check if all fields are filled
      if (!fullName || !phone || !password || !confirmPassword) {
        toast.error("Preencha todos os campos.");
        return;
      }

      // Check if the passwords match
      if (password !== confirmPassword) {
        toast.error("As senhas não coincidem.");
        return;
      }

      // Check if the user already exists
      const userExists = await getUserDTO(phone);
      if (userExists) {
        toast.error("Usuário já cadastrado. Faça login.");
        return;
      }

      // Check if the full name is valid
      const fullNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
      if (!fullNameRegex.test(fullName)) {
        toast.error("Digite apenas seu nome e último sobrenome.");
        return;
      }

      // Check if the password is valid
      if (password.length < 6) {
        toast.error("A senha deve ter no mínimo 6 caracteres.");
        return;
      }

      const hashedPassword = await hash(password, 10);
      const newUser = { fullName, phone, password: hashedPassword };

      await createUser(newUser);

      clearInput();
      toast.success("Usuário cadastrado com sucesso!");
      setTimeout(() => navigate(ROUTES.Login), 3000);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro desconhecido.");
      }
    }
  };

  return (
    <div className="register">
      <Link to={ROUTES.Home}>
        <img className="logo" src={logo} alt="Logo" />
      </Link>
      <div className="register-form">
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName">Digite seu nome e sobrenome:</label>
          <input
            id="fullName"
            type="text"
            placeholder="Exemplo: João Silva"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <label htmlFor="phoneNumber">Digite seu número do celular:</label>
          <input
            id="phoneNumber"
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

          <label htmlFor="confirmPassword">Repita a senha:</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Repita a senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">Cadastrar</button>
        </form>

        <Link to={ROUTES.Login}>
          <span className="go-to-login">Faça login em sua conta aqui</span>
        </Link>
      </div>
    </div>
  );
}
