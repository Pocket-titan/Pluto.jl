import { useEffect, useRef } from "react";

declare global {
  interface Window {
    MathJax: any;
  }
}

const HTML = ({ body }: { body: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  console.log("raw?", body);

  console.log(`global.MathJax`, (global as any).MathJax);

  // useEffect(() => {
  //   try {
  //     // @ts-ignore
  //     window.MathJax.typeset([ref.current]);
  //     // @ts-ignore
  //     console.log(`window.MathJax`, window.MathJax);
  //   } catch (e) {
  //     console.error(`e`, e);
  //   }
  // }, [body]);

  const renderMath = () => {
    // window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, ref.current]);
    console.log(`window.MathJax`, window.MathJax);
  };

  useEffect(() => {
    renderMath();
  });

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: body }} />;
};

export default HTML;
