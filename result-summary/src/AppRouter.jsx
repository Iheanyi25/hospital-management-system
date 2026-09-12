import { BrowserRouter as Router, Switch } from "react-router-dom";
import ViewResultSheet from "./pages/ResultSheet/viewResultSheet";
import ViewSummarySheet from "./pages/SummarySheet/viewSummarySheet";
import { MainRouter } from "./routers/mainRouter";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <MainRouter
          title={"View Result Sheets"}
          path={"/"}
          exact
          component={ViewResultSheet}
        />
      </Switch>
    </Router>
  );
};

export default AppRouter;
