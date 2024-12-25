"use client";

import { useRef } from "react";
import { I, EditorButton } from "..";

interface EditorProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Editor = ({ label, id, value, setValue, ...props }: EditorProps) => {
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  const addTag = (tag: string) => {
    setValue(value + ` <${tag}> </${tag}>`);
  };

  const addLink = () => {
    setValue(value + "<a href='https://example.com' target='_blank'> </a>");
  };

  return (
    <div className="w-full">
      <div>
        <label
          htmlFor={id}
          className="block text-primary text-sm font-bold mb-2"
        >
          {label}
        </label>
        <div className="flex justify-between">
          <div className="flex gap-1">
            <EditorButton title="Parágrafo" onClick={() => addTag("p")}>
              <I.Paragraph />
            </EditorButton>
            <EditorButton title="Negrito" onClick={() => addTag("b")}>
              <I.Bold />
            </EditorButton>
            <EditorButton title="Sublinhado" onClick={() => addTag("u")}>
              <I.Underline />
            </EditorButton>
            <EditorButton title="Itálico" onClick={() => addTag("em")}>
              <I.Italic />
            </EditorButton>
          </div>
          <div className="flex gap-1">
            <EditorButton title="Link" onClick={() => addLink()}>
              <I.Link />
            </EditorButton>
          </div>
        </div>
        <textarea
          ref={editorRef}
          name={id}
          id={id}
          className="shadow border rounded w-full min-h-40 py-1.5 px-3 text-gray-700
         focus:outline-none focus:shadow-outline focus:border-primary"
          value={value}
          onChange={(evt) => setValue(evt.target.value)}
          {...props}
        ></textarea>
      </div>
      <div>
        <p className="block text-primary text-sm font-bold mb-2">
          {label} renderizado
        </p>
        <div
          dangerouslySetInnerHTML={{ __html: value }}
          className="flex flex-col gap-2 text-justify shadow border rounded w-full min-h-10 py-1.5 px-3 text-gray-700
         "
        />
      </div>
    </div>
  );
};

export { Editor };
