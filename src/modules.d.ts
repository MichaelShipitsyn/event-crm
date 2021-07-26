// Support imports
declare module '*.jpg' {
  const url: string;
  // noinspection all
  export default url;
}
declare module '*.png' {
  const url: string;
  // noinspection all
  export default url;
}
declare module '*.gif' {
  const url: string;
  // noinspection all
  export default url;
}
declare module '*.woff2' {
  const url: string;
  // noinspection all
  export default url;
}
declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const source: string;
  export default source;
}
declare module '*.css';
