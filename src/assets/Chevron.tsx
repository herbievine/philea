import type React from "react";
import { SVGProps } from "react";

interface IChevronProps extends SVGProps<SVGSVGElement> {}

const Chevron: React.FC<IChevronProps> = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height={7}
      width={14}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.75 1.54 8.516 5.004a2 2 0 0 1-2.532 0L1.75 1.54"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        xmlns="http://www.w3.org/2000/svg"
      />
    </svg>
  );
};

export default Chevron;
