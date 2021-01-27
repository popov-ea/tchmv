import logo from './logo.svg';
import { BrowserRouter, Router } from "react-router-dom";
import './App.css';
import Layout from "./components/Layout";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter >
      <Layout>

      </Layout>
    </BrowserRouter>
  );
}

export default App;
