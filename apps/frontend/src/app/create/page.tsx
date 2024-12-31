"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useMessage } from "@/contexts";
import { controller } from "@/services";
import { Button, Input, Formarea, Form, TextEditor } from "@/components";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

const Create = () => {
  const router = useRouter();
  const { showMessage } = useMessage();

  const [formError, setFormError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(EditorState.createEmpty());

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const access_token = localStorage.getItem("access_token");

    if (!access_token) {
      setFormError("Você deve estar logado para fazer esta ação");
      return;
    }

    const currentContent = content.getCurrentContent();
    const htmlContent = stateToHTML(currentContent).toString();

    if (!htmlContent) {
      setFormError("O conteúdo do artigo é obrigatório");
      return;
    }

    const { error } = await controller.post(
      "/articles",
      {
        title,
        content: htmlContent,
      },
      access_token
    );

    if (error) {
      setFormError(error);
      return;
    }

    showMessage("Artigo cadastrado com sucesso", "success");
    router.push("/");
  };

  return (
    <Formarea>
      <Image src={"/imgs/logo_black.png"} alt="Logo" width={300} height={150} />
      <h1 className="text-4xl text-center font-bold">Cadastrar artigo</h1>
      <Form
        formError={formError}
        setFormError={setFormError}
        className="flex justify-center flex-col gap-2 w-full p-4"
        onSubmit={(evt) => onSubmit(evt)}
      >
        <Input
          id="article"
          value={title}
          setValue={setTitle}
          label="Título"
          placeholder="Título do artigo"
          required
          maxLength={30}
        />
        <TextEditor
          label="Conteúdo"
          id="content"
          value={content}
          setValue={setContent}
        />
        <Button className="bg-primary text-white hover:bg-dark-primary">
          Enviar
        </Button>
      </Form>
    </Formarea>
  );
};

export default Create;
