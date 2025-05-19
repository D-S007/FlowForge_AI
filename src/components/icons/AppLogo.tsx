import type { SVGProps } from 'react';
import React from 'react';

const AppLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18 8L8 18L18 28L28 18L18 8Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M30 20L40 30L30 40L20 30L30 20Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
     <path
      d="M28 18L20 22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.7"
    />
     <path
      d="M22 28L18 30"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.7"
    />
  </svg>
);

export default AppLogo;
