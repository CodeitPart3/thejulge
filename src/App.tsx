import { RouterProvider } from "react-router-dom";

import { router } from "./Router";

import ToastContainer from "@/components/Toast/ToastContainer";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}
export default App;
