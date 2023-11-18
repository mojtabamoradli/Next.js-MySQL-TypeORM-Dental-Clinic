import dynamic from "next/dynamic";

const Header = dynamic(() => import("./Header"), { ssr: false });
const Footer = dynamic(() => import("./Footer"), { ssr: false });

export default function Layout({ children, Component }) {
  const shouldRenderHeaderFooter = !Component.getLayout;
  return (
    <div className="font-Irancell_Medium ">
      {shouldRenderHeaderFooter && <Header />}
      <main className="font-Irancell_Medium min-h-screen">{children}</main>
      {shouldRenderHeaderFooter && <Footer />}
    </div>
  );
}
