import { Provider } from "react-redux";
import styled from "styled-components";
import Upload from "./components/Upload";
import GlobalStyle from "./styles/GlobalStyle";
import store from './store/store'
import FileList from "./components/FileList";

function App() {
  return (
    <Provider store={store}>
      <Container>
        <GlobalStyle />
        <Content>
          <Upload />
          <FileList />
        </Content>
      </Container>
    </Provider>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  padding: 12px;
  background: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default App;
