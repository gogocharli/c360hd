/* 
  svg type from Gabriel Mochi
  @see https://stackoverflow.com/questions/62715379/how-to-declare-types-of-props-of-svg-component-react-typescript-and-webpack
  
  Others from Duncan Leung
  @see https://duncanleung.com/typescript-module-declearation-svg-img-assets/
*/
declare module '*.svg' {
  import { ReactElement, SVGProps } from 'react';
  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}
declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: string;
  export default content;
}

// @see https://github.com/vercel/next.js/issues/2177
declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}
