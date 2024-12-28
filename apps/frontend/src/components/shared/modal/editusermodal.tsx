"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { TemplateModal, I, Button, Input } from "@/components";
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState<string | File | null>(null);

  useEffect(() => {
    if (user) {
      setDescription(user.description ? user.description : "");
      setPicture(user.picture);
    }
  }, [user]);

  if (!isVisible) {
    return null;
  }

  return (
    <TemplateModal className="gap-2">
      <div className="flex items-center justify-between border-b-2">
        <h1 className="text-2xl">Editar perfil</h1>
        <button className="text-3xl" onClick={() => setIsVisible(false)}>
          <I.Close />
        </button>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 w-full p-2 border-b-2">
        {picture ? (
          <Image
            src={picture as string}
            alt="Foto de perfil"
            width={160}
            height={160}
            className="rounded-full"
          />
        ) : (
          <I.UserCircle className="size-40" />
        )}
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(evt) =>
              setPicture(evt.target.files && evt.target.files[0])
            }
            className="hidden"
          />
          <Button
            className="bg-blue-700 text-white text-lg hover:bg-blue-800"
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            <I.Pencil />
            Editar perfil
          </Button>
          {picture && (
            <Button
              className="bg-red-700 text-white text-lg hover:bg-red-800"
              onClick={() => setPicture(null)}
            >
              <I.Remove />
              Deletar perfil
            </Button>
          )}
        </div>
        <div className="flex flex-col justify-center gap-2 w-full p-2">
          <h2 className="w-full">Descrição</h2>
          <Input
            label="Descrição"
            id="description"
            value={description}
            setValue={setDescription}
          />
        </div>
      </div>
      <div className="flex justify-end w-full">
        <Button className="bg-blue-700 text-white text-lg hover:bg-blue-800">
          Salvar alterações
        </Button>
      </div>
    </TemplateModal>
  );
};

export default EditUserModal;
