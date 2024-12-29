import Image from "next/image";

interface ProfileCircleProps {
  picture: string;
  size: number;
  className?: string;
}

const ProfileCircle = ({ picture, size, className }: ProfileCircleProps) => {
  return (
    <div
      className={`flex justify-center items-center bg-white size-${
        size / 4
      } rounded-full border-2 overflow-hidden ${className}`}
    >
      <Image src={picture} alt="Foto de perfil" width={size} height={size} />
    </div>
  );
};

export { ProfileCircle };
