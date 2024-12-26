import { I } from "..";

interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => {
  return <I.Spinner className={`loader text-4xl ${className}`} />;
};

export { Loader };
