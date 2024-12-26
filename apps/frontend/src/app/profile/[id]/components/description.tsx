import React from "react";

interface DescriptionProps {
  description?: string | null;
}

const Description = ({ description }: DescriptionProps) => {
  if (!description) {
    return null;
  }

  return (
    <div className="flex justify-start items-center w-full p-4 border-b-2 ">
      <p className="text-justify">{description}</p>
    </div>
  );
};

export { Description };
