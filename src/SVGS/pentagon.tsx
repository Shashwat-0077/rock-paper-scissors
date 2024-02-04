import * as React from "react";
import { SVGProps } from "react";
const Pentagon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        width={800}
        height={800}
        viewBox="0 0 350 350"
    >
        <path
            stroke="#000"
            strokeWidth={17}
            d="m180.644 11.041 155.964 118.494a9.5 9.5 0 0 1 3.326 10.383l-59.893 192.755a9.501 9.501 0 0 1-9.072 6.681H78.824a9.5 9.5 0 0 1-9.072-6.681L9.86 139.918a9.5 9.5 0 0 1 3.325-10.383L169.149 11.041a9.501 9.501 0 0 1 11.495 0Z"
        />
    </svg>
);
export default Pentagon;
