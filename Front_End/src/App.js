import Home from "./Components/HomeComponent/Home";

import StudentLogin from "./Components/StudentComponent/StudentLogin/StudentLogin";
import AdminLogin from "./Components/AdminComponent/AdminLogin/AdminLogin";
import AdminDashboard from "./Components/AdminComponent/AdminDashboard/AdminDashboard";
import StudentDashboard from "./Components/StudentComponent/StudentDashboard/StudentDashboard";
import RootLogin from "./Components/RootComponent/RootLogin/RootLogin";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import StudentSignup from "./Components/StudentComponent/StudentSignup/StudentSignup";
import RootDashboard from "./Components/RootComponent/RootDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/StudentLogin" component={StudentLogin}></Route>
          <Route exact path="/StudentSignup" component={StudentSignup}></Route>
          <Route exact path="/AdminLogin" component={AdminLogin}></Route>
          <Route exact path="/RootLogin" component={RootLogin}></Route>
          <Route exact path="/RootDashboard" component={RootDashboard}></Route>
          <Route
            exact
            path="/AdminDashboard"
            component={AdminDashboard}
          ></Route>
          <Route
            exact
            path="/StudentDashboard"
            component={StudentDashboard}
          ></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
