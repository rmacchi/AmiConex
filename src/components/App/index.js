import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";

import GlobalStyles from "../../assets/styles/global";
import defaultTheme from "../../assets/styles/themes/default";

import Header from "../Header/index";
// import ContactsList from "../Contacts";
import Routes from "../../Routes";

import { Container } from "./styles";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />

        <Container>
          <Header />
          {/* <ContactsList /> */}
          <Routes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
