import { FC } from "react";

interface IHeaderProps {
  text: string;
}

const Header: FC<IHeaderProps> = ({ text }: IHeaderProps) => {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {text}
    </h2>
  );
};

export default Header;
