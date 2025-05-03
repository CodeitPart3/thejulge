import { RouterProvider } from "react-router-dom";

import Modal from "./components/Modal/Modal";
import { router } from "./Router";

import ToastContainer from "@/components/Toast/ToastContainer";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
      <Modal />
    </>
  );
}
export default App;
