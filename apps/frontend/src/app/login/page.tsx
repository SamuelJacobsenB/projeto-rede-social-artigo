"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMessage, useUser } from "@/contexts";
import Image from "next/image";
import Link from "next/link";
import { controller } from "@/services";
import { Button, Input, Formarea, Form } from "@/components";

const Login = () => {
  const router = useRouter();
  const { showMessage } = useMessage();
  const { findUser } = useUser();

  const [formError, setFormError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const { data, error } = await controller.post("/auth/login", {
      email,
      password,
    });

    if (error) {
      setFormError(error);
      return;
    }

    localStorage.setItem("access_token", data.access_token);
    showMessage("Login realizado com sucesso!", "success");
    await findUser();
    router.push("/");
  };

  return (
    <Formarea>
      <Image src={"/imgs/logo_black.png"} alt="Logo" width={300} height={150} />
      <h1 className="text-4xl text-center font-bold">Login</h1>
      <Form
        formError={formError}
        setFormError={setFormError}
        className="flex justify-center flex-col gap-2 w-full p-4"
        onSubmit={(evt) => onSubmit(evt)}
      >
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
        <Button className="bg-primary text-white hover:bg-dark-primary">
          Enviar
        </Button>
        <span className="flex justify-between w-full">
          <p>Não tem uma conta?</p>
          <Link href={"/register"} className="text-blue-600 hover:underline">
            Cadastre-se
          </Link>
        </span>
      </Form>
    </Formarea>
  );
};

export default Login;
