/**
 * CSS Modules型定義
 * ViteがCSS Modulesを処理するための型宣言
 */
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

declare module '*.css' {
  const css: string;
  export default css;
}
