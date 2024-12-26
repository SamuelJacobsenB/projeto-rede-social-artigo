import React from "react";

interface TokenInputProps {
  value: number | "";
  setValue: React.Dispatch<React.SetStateAction<number | "">>;
}

const TokenInput = ({ value, setValue }: TokenInputProps) => {
  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!value) {
      setValue(evt.target.value ? Number(evt.target.value) : "");
    }

    if (evt.target.value === "") {
      setValue("");
    }
  };

  return (
    <input
      type="number"
      value={value}
      onChange={(evt) => onChange(evt)}
      className="no-spinner w-10 text-3xl text-center p-2 border-2 border-black rounded-md"
      required
    />
  );
};

export { TokenInput };
