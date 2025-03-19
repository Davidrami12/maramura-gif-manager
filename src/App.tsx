import { PageContainer } from "./container/PageContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"

const App = () => {
  return (
    <div>
      <h1>GIF Generator Manager</h1>
      <PageContainer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App
