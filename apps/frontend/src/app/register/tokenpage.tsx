"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMessage, useUser } from "@/contexts";
import { controller } from "@/services";
import { Form, Button } from "@/components";
import { TokenInput } from "./components";

interface TokenPageProps {
  email: string;
  password: string;
}

const TokenPage = ({ email, password }: TokenPageProps) => {
  const router = useRouter();
  const { showMessage } = useMessage();
  const { findUser } = useUser();

  const [formError, setFormError] = useState<string>("");
  const [first, setFirst] = useState<number | "">("");
  const [second, setSecond] = useState<number | "">("");
  const [third, setThird] = useState<number | "">("");
  const [fourth, setFourth] = useState<number | "">("");
  const [fifth, setFifth] = useState<number | "">("");
  const [sixth, setSixth] = useState<number | "">("");

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const token = `${first}${second}${third}${fourth}${fifth}${sixth}`;

    const { error } = await controller.post(`/auth/verify/token/${token}`, {
      email,
    });

    if (error) {
      setFormError(error);
      return;
    }

    evt.preventDefault();

    const { data, error: _error } = await controller.post("/auth/login", {
      email,
      password,
    });

    if (_error) {
      setFormError(error);
      return;
    }

    localStorage.setItem("access_token", data.access_token);
    showMessage("Cadastro realizado com sucesso", "success");
    await findUser();
    router.push("/");
  };

  return (
    <Form
      formError={formError}
      setFormError={setFormError}
      className="flex justify-center flex-col gap-6 w-full p-4"
      onSubmit={(evt) => onSubmit(evt)}
    >
      <h2 className="text-xl">
        Um token de 6 dígitos foi enviado para o seu email, verifique-o:
      </h2>
      <div className="flex justify-center gap-4">
        <TokenInput value={first} setValue={setFirst} />
        <TokenInput value={second} setValue={setSecond} />
        <TokenInput value={third} setValue={setThird} />
        <TokenInput value={fourth} setValue={setFourth} />
        <TokenInput value={fifth} setValue={setFifth} />
        <TokenInput value={sixth} setValue={setSixth} />
      </div>
      <Button className="bg-primary text-white hover:bg-dark-primary">
        Enviar
      </Button>
    </Form>
  );
};

export { TokenPage };
