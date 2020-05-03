import Document, {Head, Main, NextScript } from 'next/document';
import { Fragment } from 'react';
// import Head from 'next/head'

export default class MyDocument extends Document {

    static async getInitialProps(ctx) {
        // Check if in production
        // const originalRenderPage = ctx.renderPage
        // ctx.renderPage = () =>
        //     originalRenderPage({
        //         // useful for wrapping the whole react tree
        //         enhanceApp: App => App,
        //         // useful for wrapping in a per-page basis
        //         enhanceComponent: Component => Component,
        //     })

        // const isProduction = process.env.NODE_ENV === 'production';
        const initialProps = await Document.getInitialProps(ctx);
        // Pass isProduction flag back through props
        return {...initialProps};
    }

    setGoogleTags() {
        return {
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-98881321-1');
          `
            
        };
    }

    setSecondTags(){
        return {
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-KRWR7Z3');`
        }
    }

    render(){
        return(
            <html lang="en">
                <Head>
                    <meta charSet='utf-8' />
                    <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                    <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
                    <meta name='description' content='Description' />
                    <meta name='keywords' content='Keywords' />
                    {/* <title>Next.js PWA Example</title> */}
                    <link rel="manifest" href="/manifest.json" />
                    <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
                    <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
                    <link rel="apple-touch-icon" href="/apple-icon.png"></link>
                    <meta name="theme-color" content="#317EFB" />
                </Head>
                <head>
                <script 
                    dangerouslySetInnerHTML={this.setSecondTags()}
                >
                </script>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <meta name="description" content="" />
                    {/* <title>{this.props.dangerousAsPath}</title> */}
                            
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Acme&display=swap" />
                    <link rel="stylesheet" href="/dist/css/app.css" />
                    {/* <link rel="stylesheet" href="/_next/static/chunks/styles.chunk.css" /> */}
                </head>
                <body>
                    {/* <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KRWR7Z3"
                        height="0" width="0" style="display:none;visibility:hidden"></iframe>
                    </noscript> */}
                    <Main />
                    <NextScript />
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=UA-98881321-1"
                        />
                    <script dangerouslySetInnerHTML={this.setGoogleTags()} />
                </body>
            </html>
        )
    }
}