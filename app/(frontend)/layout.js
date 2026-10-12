import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ChatWidget from "../../components/ChatWidget";
import JsonLd from "../../components/seo/JsonLd";
import UtmCapture from "../../components/seo/UtmCapture";
import TrackClicks from "../../components/analytics/TrackClicks";
import "../globals.css";
import { gaMeasurementId } from "../../lib/analytics";
import { defaultSiteMetadata } from "../../lib/seo";
import { organizationSchema, websiteSchema } from "../../lib/schema";
import { readGlobal } from "../../lib/content";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = defaultSiteMetadata;

export default async function FrontendLayout({ children }) {
  const settings = await readGlobal("siteSettings");
  const gaId = gaMeasurementId();

  return (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans antialiased text-white`}>
        <JsonLd data={[organizationSchema(settings || {}), websiteSchema(settings || {})]} />
        <UtmCapture />
        <TrackClicks />
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        ) : null}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ypuu1ef5yj");`,
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
