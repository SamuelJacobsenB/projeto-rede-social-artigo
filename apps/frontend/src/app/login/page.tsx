"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components";
import { Input } from "@/components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-primary p-4">
      <div className="flex items-center flex-col gap-2 bg-white max-w-lg w-full min-h-96 rounded-md shadow">
        <Image
          src={"/imgs/logo_black.png"}
          alt="Logo"
          width={300}
          height={150}
        />
        <h1 className="text-4xl text-center font-bold">Login</h1>
        <form className="flex justify-center flex-col gap-2 w-full p-4">
          <Input id="email" value={email} setValue={setEmail} label="Email" />
          <Input
            id="password"
            type="password"
            value={password}
            setValue={setPassword}
            label="Senha"
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
        </form>
      </div>
    </div>
  );
};

export default Login;
