import { PageContainer } from "./container/PageContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"

const App = () => {
  return (
    <div>
      <PageContainer />
      <ToastContainer position="top-right" autoClose={3000} theme="dark"/>
    </div>
  );
}

export default App
