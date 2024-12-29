"use client";

import React, { useState, useEffect, useRef } from "react";
import { useMessage } from "@/contexts";
import { controller } from "@/services";
import { TemplateModal, I, Button, Input, ProfileCircle } from "@/components";
import { User } from "@/types";

interface EditUserModalProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}

const EditUserModal = ({
  isVisible,
  setIsVisible,
  user,
}: EditUserModalProps) => {
  const { showMessage } = useMessage();

  const inputRef = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onUpdate = async () => {
    const access_token = localStorage.getItem("access_token");

    if (!access_token) {
      showMessage("Você precisa estar logado para editar seu perfil", "error");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    if (picture) {
      formData.append("picture", picture as File);
    }

    const { error } = await controller.patch("/users", formData, access_token);

    if (error) {
      showMessage(error, "error");
      return;
    }

    showMessage("Perfil editado com sucesso", "success");
    setIsVisible(false);
  };

  const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files ? evt.target.files[0] : null;
    setPicture(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  useEffect(() => {
    if (user) {
      setDescription(user.description ? user.description : "");

      if (user.picture) {
        setPreviewUrl(user.picture);
      }
    }
  }, [user]);

  if (!isVisible) {
    return null;
  }

  return (
    <TemplateModal className="gap-2">
      <div className="flex items-center justify-between p-2 border-b-2">
        <h1 className="text-2xl">Editar perfil</h1>
        <button
          className="text-3xl"
          onClick={() => {
            setIsVisible(false);
            setDescription("");
            setPicture(null);
            setPreviewUrl(user.picture ?? null);
          }}
        >
          <I.Close />
        </button>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 w-full p-2 border-b-2">
        <div className="flex items-center flex-col gap-4 w-full p-2 border-b-2">
          {(user.picture || picture) && (
            <ProfileCircle picture={previewUrl as string} size={160} />
          )}
          {!user.picture && !picture && <I.UserCircle className="size-40" />}
          <div className="flex justify-center gap-2 w-full">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={(evt) => {
                handleFileChange(evt);
              }}
              className="hidden"
            />
            <Button
              className="flex justify-center items-center gap-2 bg-blue-700 text-white text-lg max-w-44 px-2 hover:bg-blue-800"
              onClick={() => {
                inputRef.current?.click();
              }}
            >
              <I.Pencil />
              Editar perfil
            </Button>
            {picture && (
              <Button
                className="flex justify-center items-center gap-2 bg-red-700 text-white text-lg max-w-44 px-2 hover:bg-red-800"
                onClick={() => setPicture(null)}
              >
                <I.Trash />
                Deletar perfil
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2 w-full p-2">
          <Input
            label="Alterar descrição"
            id="description"
            value={description}
            setValue={setDescription}
            placeholder="Sua nova descrição"
          />
        </div>
      </div>
      <div className="flex justify-end w-full">
        <Button
          className="bg-blue-700 text-white text-lg hover:bg-blue-800"
          onClick={async () => await onUpdate()}
        >
          Salvar alterações
        </Button>
      </div>
    </TemplateModal>
  );
};

export { EditUserModal };
