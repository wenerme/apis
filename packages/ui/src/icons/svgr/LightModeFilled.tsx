import * as React from 'react';

function SvgLightModeFilled(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" {...props}>
      <g fillRule="evenodd">
        <path fillRule="nonzero" d="M21 10.5l-3 3V18h-4.5l-3 3-3-3H3v-4.5l-3-3 3-3V3h4.5l3-3 3 3H18v4.5z" />
        <circle cx={10.5} cy={10.5} r={4} stroke="#FFF" strokeWidth={1.5} />
      </g>
    </svg>
  );
}

export default SvgLightModeFilled;
