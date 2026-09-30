import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatWidget from "../components/ChatWidget";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: 'swap',
});

export const metadata = {
  title: "AgileDigitalEdge | Modern Digital Agency",
  description: "Building Digital Experiences That Give You an Edge. Web Development, Product Design, and more.",
  icons: {
    icon: "/logo/agile.png",
    shortcut: "/logo/agile.png",
    apple: "/logo/agile.png",
  },
  verification: {
    google: "BzFHuu6Sxw_ouhf4F5HW3mVdb_x50yCQrWZ6IkgNd60",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} font-sans antialiased text-white`}
      >
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
        <main>
          {children}
        </main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
