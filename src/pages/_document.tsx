// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
