import dynamic from "next/dynamic";

const Header = dynamic(() => import("./Header"), { ssr: false });
const Footer = dynamic(() => import("./Footer"), { ssr: false });

export default function Layout({ children, Component }) {
  return (
    <div className='font-Irancell_Medium'>
      <Header />
      <main className='font-Irancell_Medium'>{children}</main>
      <Footer />
    </div>
  );
}
