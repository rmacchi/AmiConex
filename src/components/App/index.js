import { ThemeProvider } from "styled-components";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import * as React from "react";
import GlobalStyles from "../../assets/styles/global";
import defaultTheme from "../../assets/styles/themes/default";

import Header from "../Header/index";

import { Container } from "./styles";

import Home from "../../pages/Home";
import NewContact from "../../pages/NewContact";
import EditContact from "../../pages/EditContact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/new",
    element: <NewContact />,
  },
  {
    path: "/edit/:id",
    element: <EditContact />,
  },
]);

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />

      <Container>
        <Header />
        <RouterProvider router={router} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
