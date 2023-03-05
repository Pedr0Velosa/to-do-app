//global styles
import "@/styles/globals.css";

// auth provider
import AuthProvider from "@/utils/context/AuthContext";

//react toast container and css
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//react D&D lib
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <DndProvider backend={HTML5Backend}>
            <Component {...pageProps} />
            <ToastContainer
              position="top-right"
              autoClose={2 * 1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <ReactQueryDevtools initialIsOpen={false} />
            <ToastContainer />
          </DndProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
