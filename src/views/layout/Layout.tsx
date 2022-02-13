import { MainHeader } from "components";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";
import useStore from "store/AppStore";
import { Login } from "views/login";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function Layout() {
  let showLogin = useStore((state) => state.showLogin);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col h-screen">
        <MainHeader />
        {showLogin && <Login />}
        <main className="flex-1 overflow-y-auto p-5">
          <Outlet />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default Layout;
