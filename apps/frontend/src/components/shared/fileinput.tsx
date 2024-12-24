"use client";

import React, { useRef } from "react";

interface FileInputProps {
  label: string;
  id: string;
  value: File | null;
  setValue: React.Dispatch<React.SetStateAction<File | null>>;
}

const FileInput = ({ label, id, value, setValue }: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files && evt.target.files.length > 0) {
      const file = evt.target.files[0];
      setValue(file);
    } else {
      setValue(null);
    }
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-primary text-sm font-bold mb-2">
        {label}
      </label>
      <div className="flex items-center">
        <input
          id={id}
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          Escolher Arquivo
        </button>
        <span className="ml-3 text-gray-700">
          {value ? value.name : "Nenhum arquivo selecionado"}
        </span>
      </div>
    </div>
  );
};

export { FileInput };
