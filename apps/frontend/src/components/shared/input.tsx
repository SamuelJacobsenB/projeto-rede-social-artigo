import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({
  label,
  id,
  type = "text",
  value,
  setValue,
  ...props
}: InputProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-primary text-sm font-bold mb-2">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
        className="shadow border rounded w-full py-1.5 px-3 text-gray-700 
       focus:outline-none focus:shadow-outline focus:border-primary"
        {...props}
      />
    </div>
  );
};

export { Input };
