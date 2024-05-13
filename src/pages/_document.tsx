import { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
export default function Document() {
  return (
    <Html lang="vi">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// Document.getInitialProps = async (ctx: DocumentContext) => {
//   const cache = createCache();
//   const originalRenderPage = ctx.renderPage;
//   ctx.renderPage = () =>
//     originalRenderPage({
//       enhanceApp: (App) => (props) => (
//         <StyleProvider cache={cache}>
//           <App {...props} />
//         </StyleProvider>
//       ),
//     });
//
//   const initialProps: any = await Document.getInitialProps(ctx);
//   const style = extractStyle(cache, true);
//   return {
//     ...initialProps,
//     styles: (
//       <>
//         {initialProps.styles}
//         <style dangerouslySetInnerHTML={{ __html: style }} />
//       </>
//     ),
//   } as any;
// };
