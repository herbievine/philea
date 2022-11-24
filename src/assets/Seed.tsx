import type React from "react";
import { SVGProps } from "react";

interface ISeedProps extends SVGProps<SVGSVGElement> {}

const Seed: React.FC<ISeedProps> = ({ ...props }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <path d="M512 64c0 113.6-84.6 207.5-194.2 222-7.1-53.4-30.6-101.6-65.3-139.3C290.8 78.3 364 32 448 32h32c17.7 0 32 14.3 32 32zM0 128c0-17.7 14.3-32 32-32h32c123.7 0 224 100.3 224 224v128c0 17.7-14.3 32-32 32s-32-14.3-32-32v-96C100.3 352 0 251.7 0 128z" />
    </svg>
  );
};

export default Seed;
