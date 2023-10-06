import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";

import * as React from "react";
import Router from "../../Router";
import GlobalStyles from "../../assets/styles/global";
import defaultTheme from "../../assets/styles/themes/default";

import Header from "../Header/index";

import { Container } from "./styles";

import ToastContainer from "../Toast/ToastContainer";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <ToastContainer />

        <Container>
          <Header />
          <Router />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
