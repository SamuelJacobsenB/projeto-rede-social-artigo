"use client";

import React, { useState, useEffect } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import { I, EditorButton, Loader } from "..";
import "draft-js/dist/Draft.css";

interface EditorProps {
  label: string;
  id: string;
  value: EditorState;
  setValue: React.Dispatch<React.SetStateAction<EditorState>>;
}

const TextEditor: React.FC<EditorProps> = ({ label, id, value, setValue }) => {
  const [isWindowAvailable, setIsWindowAvailable] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsWindowAvailable(true);
    }
  }, []);

  const handleEditorChange = (state: EditorState) => {
    setValue(state);
  };

  const toggleInlineStyle = (style: string) => {
    handleEditorChange(RichUtils.toggleInlineStyle(value, style));
  };

  const toggleBlockType = (blockType: string) => {
    handleEditorChange(RichUtils.toggleBlockType(value, blockType));
  };

  if (!isWindowAvailable) {
    return (
      <div className="flex justify-center w-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div>
        <label
          htmlFor={id}
          className="block text-primary text-sm font-bold mb-2"
        >
          {label}
        </label>
        <div className="flex gap-1">
          <EditorButton
            title="Parágrafo"
            onClick={() => toggleBlockType("unstyled")}
          >
            <I.Paragraph />
          </EditorButton>
          <EditorButton
            title="Negrito"
            onClick={() => toggleInlineStyle("BOLD")}
          >
            <I.Bold />
          </EditorButton>
          <EditorButton
            title="Sublinhado"
            onClick={() => toggleInlineStyle("UNDERLINE")}
          >
            <I.Underline />
          </EditorButton>
          <EditorButton
            title="Itálico"
            onClick={() => toggleInlineStyle("ITALIC")}
          >
            <I.Italic />
          </EditorButton>
        </div>
        <div className="shadow border rounded w-full h-40 py-1.5 px-3 text-gray-700 focus:outline-none focus:shadow-outline focus:border-primary bg-white">
          <Editor
            editorState={value}
            onChange={handleEditorChange}
            placeholder="Seu conteúdo"
          />
        </div>
      </div>
    </div>
  );
};

export { TextEditor };
