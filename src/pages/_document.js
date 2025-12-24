import Document, { Html, Head, Main, NextScript } from "next/document";
import { DocumentHeadTags } from "@mui/material-nextjs/v13-pagesRouter";
import createEmotionCache from "@/utils/createEmotionCache";
import { Helvetica_Neue, Helvetica_Neue_Arabic } from "@/theme/typography";
import createEmotionServer from "@emotion/server/create-instance";
import Script from "next/script";
import ArtfutLoader from "@/modules/ArtfutLoader";

export const GTM_ID = "GTM-KWXTV8V";
export const GA_ID = "G-20ZHK7ZNYB";

export default function MyDocument(props) {
  const { isRTL } = props;
  return (
    <Html
      lang={isRTL ? "ar" : "en"}
      className={isRTL ? Helvetica_Neue_Arabic.className : Helvetica_Neue.className}
      suppressHydrationWarning
    >
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-20ZHK7ZNYB"
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-20ZHK7ZNYB', {
                page_path: window.location.pathname,
                debug_mode: true,
                linker: { domains: [] } // 👈 disable _gl param
              });
            `}
        </Script>
        {/* <!-- End Google analytics --> */}

        {/* Facebook Pixel */}
        <Script
          id='Facebook-Pixel'
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `!(function (f, b, e, v, n, t, s) {
                if (f.fbq) return;
                n = f.fbq = function () {
                  n.callMethod
                    ? n.callMethod.apply(n, arguments)
                    : n.queue.push(arguments);
                };
                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = !0;
                n.version = "2.0";
                n.queue = [];
                t = b.createElement(e);
                t.async = !0;
                t.src = v;
                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
              })(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");
              fbq("init", "418641216127391");
              fbq("track", "PageView");
              fbq("init", "3863780167186594");
              fbq("track", "PageView");
              `
          }}
        />
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=418641216127391&ev=PageView&noscript=1" />
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=3863780167186594&ev=PageView&noscript=1" />
        </noscript>
        {/* Facebook Pixel End */}

        {/* TikTok Analytics */}
        <Script id="Tiktok-analytics" strategy="beforeInteractive">
          {`
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
                ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
                ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
                for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
                ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
                ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
                  ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
                  var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;
                  var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                ttq.load('CGM0OF3C77U84MT11HG0'); ttq.page();
              }(window, document, 'ttq');
            `}
        </Script>
        {/* TikTok Analytics End */}

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity-tracking" strategy="beforeInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document, "clarity", "script", "gh3ywsd4k4");`}
        </Script>
        {/* Microsoft Clarity End */}

        {/* Google Tag Manager - Removed duplicate script, kept only body implementation */}

        {/* Yandex Metrika (gated to production host) */}
        <Script id="yandex-metrika" type="text/javascript" strategy="afterInteractive">
          {`(function(){
              var isProd = typeof location !== 'undefined' && location.hostname === 'www.sedarglobal.com';
              if (!isProd) { return; }
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(93265458, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                ecommerce:"dataLayer"
              });
            })();`}
        </Script>
        {/* <Script id="yandex-metrika" type="text/javascript" strategy="afterInteractive">
            {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(93265458, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true,
                  webvisor:true,
                  ecommerce:"dataLayer"
              });`}
          </Script> */}
        {/* Yandex End */}

        {/* Snap Pixel */}
        <Script id="Snap-Pixel" type="text/javascript" strategy="afterInteractive">
          {`(function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function() {
                a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
                a.queue=[];var s='script';r=t.createElement(s);r.async=!0; r.src=n;
                var u=t.getElementsByTagName(s)[0]; u.parentNode.insertBefore(r,u);
              })(window,document, 'https://sc-static.net/scevent.min.js');
              snaptr('init', '725ccdf6-5ce4-4fc5-a89f-3e9c84a328b8', { 'user_email': '__INSERT_USER_EMAIL__' });
              snaptr('track', 'PAGE_VIEW');
              snaptr('init', '76a01b06-6d42-42c1-b913-83f3ac777a97', { 'user_email': '__INSERT_USER_EMAIL__' });
              snaptr('track', 'PAGE_VIEW');`}
        </Script>
        {/* Snap Pixel End */}
        {/* <Script async src="https://www.artfut.com/static/tagtag.min.js?campaign_code=98c772a893" /> */}
        <ArtfutLoader />


        <DocumentHeadTags {...props} />


      </Head>

      <body>
        {/* GTM noscript */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />

        {/* ✅ GTM: must also load beforeInteractive */}
        <Script
          id="google-gtm"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
                var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j, f);
              })(window, document, 'script', 'dataLayer', '${GTM_ID}');
            `,
          }}
        />

        <Main />
        <NextScript />

        {/* ElevenLabs */}
        <script
          src="https://unpkg.com/@elevenlabs/convai-widget-embed"
          async
          type="text/javascript"
        ></script>
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const { locale } = ctx;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  const isRTL =
    locale !== "default" &&
    locale?.split("-")?.[1] &&
    locale?.split("-")?.[1] === "ar";

  return {
    ...initialProps,
    emotionStyleTags,
    isRTL,
  };
};
