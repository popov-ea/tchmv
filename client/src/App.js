import logo from './logo.svg';
import { BrowserRouter, Redirect } from "react-router-dom";
import './App.css';
import Layout from "./components/Layout";

function App() {
  fetch("api/", {
    method: "GET",
  });
  return (
    <BrowserRouter>
      <Layout>

      </Layout>
    </BrowserRouter>
  );
}

export default App;
