import React, { ReactNode } from "react";
import "./App.css";
import { Navigate } from "react-router-dom";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, Register, PostPage } from "./pages";
import { Additional, Navbar, Sidebar, TemporarySidebar } from "./components";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { Box } from "@mui/material";

const App: React.FC = () => {
  interface ProtectedRouteProps {
    children: ReactNode;
  }

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Sidebar />
            <Outlet />
            <Additional />
            <TemporarySidebar />
          </Box>
        </QueryClientProvider>
      </>
    );
  };

  const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    if (!localStorage.getItem("user")) {
      return <Navigate to="/login" />;
    }

    return <>{children}</>;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/post/:postId",
          element: <PostPage />,
        },
        {
          path: "/profile/:userId",
          element: <PostPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
