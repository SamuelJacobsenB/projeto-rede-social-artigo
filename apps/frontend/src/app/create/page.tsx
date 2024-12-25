"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMessage } from "@/contexts";
import Image from "next/image";
import { controller } from "@/services";
import { Button, Input, Formarea, Form, TextEditor } from "@/components";
import { EditorState } from "draft-js";

const Create = () => {
  const router = useRouter();
  const { showMessage } = useMessage();

  const [formError, setFormError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(EditorState.createEmpty());

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const { error } = await controller.post("/articles", {
      title,
      content,
    });

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
