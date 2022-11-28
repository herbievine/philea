import type React from "react";
import { SVGProps } from "react";

interface ILoadingProps extends SVGProps<SVGSVGElement> {}

const Loading: React.FC<ILoadingProps> = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: "auto",
        background: "0 0",
        display: "block",
        shapeRendering: "auto",
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <circle
        cx={50}
        cy={50}
        fill="none"
        stroke="#fff"
        strokeWidth={12}
        r={25}
        strokeDasharray="117.80972450961724 41.269908169872416"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        />
      </circle>
    </svg>
  );
};

export default Loading;
