import React from "react";
import { I } from "..";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  formError: string;
  setFormError: React.Dispatch<React.SetStateAction<string>>;
}

const Form = ({ children, formError, setFormError, ...props }: FormProps) => {
  return (
    <form {...props}>
      {formError && (
        <div className="flex items-center justify-between bg-red-700 text-white text-lg w-full h-12 p-2 rounded ">
          {formError}
          <I.Close
            className="text-xl cursor-pointer"
            onClick={() => setFormError("")}
          />
        </div>
      )}
      {children}
    </form>
  );
};

export { Form };
