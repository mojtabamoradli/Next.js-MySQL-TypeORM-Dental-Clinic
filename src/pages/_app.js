import "@/styles/globals.css";
import {
  Irancell_Medium,
  Irancell_ExtraLight,
  Irancell_Light,
  Irancell_Bold,
} from "@/configs/font.config";
import dynamic from "next/dynamic";
import Notification from "@/utils/Notification";
import { QueryClient, QueryClientProvider } from "react-query";

const Layout = dynamic(() => import("../components/layout/Layout"), {
  ssr: false,
});

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return getLayout(
    <div
      className={`${Irancell_Bold.variable} ${Irancell_ExtraLight.variable} ${Irancell_Light.variable} ${Irancell_Medium.variable} `}
    >
      <QueryClientProvider client={queryClient}>
        <Layout Component={Component}>
          <Component {...pageProps} />
          <Notification />
        </Layout>
      </QueryClientProvider>
    </div>
  );
}
