"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { controller } from "@/services";
import { Button, Input, FileInput, Formarea, Form } from "@/components";
import { TokenPage } from "./tokenpage";

const Register = () => {
  const [userCreated, setUserCreated] = useState(false);

  const [formError, setFormError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState<File | null>(null);

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (password !== confirmPassword) {
      setFormError("As senhas não conferem");
      return;
    }

    const form = new FormData();

    form.append("name", name);
    form.append("email", email);
    form.append("password", password);
    form.append("description", description);

    if (picture) {
      form.append("picture", picture);
    }

    const { error } = await controller.post("/users", {
      name,
      email,
      password,
      description,
    });

    if (error) {
      setFormError(error);
      return;
    }

    setUserCreated(true);
  };

  return (
    <Formarea>
      <Image src={"/imgs/logo_black.png"} alt="Logo" width={300} height={150} />
      <h1 className="text-4xl text-center font-bold">Cadastro</h1>
      {userCreated ? (
        <TokenPage email={email} password={password} />
      ) : (
        <>
          <Form
            formError={formError}
            setFormError={setFormError}
            className="flex justify-center flex-col gap-2 w-full p-4"
            onSubmit={(evt) => onSubmit(evt)}
          >
            <Input
              id="name"
              value={name}
              setValue={setName}
              label="Nome"
              placeholder="Seu nome"
              maxLength={20}
              required
            />
            <Input
              id="email"
              type="email"
              value={email}
              setValue={setEmail}
              label="Email"
              placeholder="Seu email"
              required
            />
            <Input
              id="password"
              type="password"
              value={password}
              setValue={setPassword}
              label="Senha"
              placeholder="Sua senha"
              minLength={8}
              maxLength={15}
              required
            />
            <Input
              id="confirmpassword"
              type="password"
              value={confirmPassword}
              setValue={setConfirmPassword}
              label="Repita sua senha"
              placeholder="Repita sua senha"
              minLength={8}
              maxLength={15}
              required
            />
            <Input
              id="description"
              value={description}
              setValue={setDescription}
              label="Descrição (opcional)"
              placeholder="Sua descrição opcional"
              maxLength={100}
            />
            <FileInput
              id="picture"
              value={picture}
              setValue={setPicture}
              label="Foto de perfil (opcional)"
            />
            <Button className="bg-primary text-white hover:bg-dark-primary">
              Enviar
            </Button>
            <span className="flex justify-between w-full">
              <p>Já tem uma conta?</p>
              <Link href={"/login"} className="text-blue-600 hover:underline">
                Login
              </Link>
            </span>
          </Form>
        </>
      )}
    </Formarea>
  );
};

export default Register;
