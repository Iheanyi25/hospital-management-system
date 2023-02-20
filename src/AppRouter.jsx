import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewResultSheet from "./pages/resultSheet/ViewResultSheet";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<ViewResultSheet />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
