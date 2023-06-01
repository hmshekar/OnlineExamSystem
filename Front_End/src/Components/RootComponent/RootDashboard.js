import style from "./RootDashboard.module.css";

import { useHistory } from "react-router-dom";

import { NavLink, BrowserRouter, Switch, Route } from "react-router-dom";

import pic4 from "./logo.png";
import Teacher from "./RootDashboard/TeacherComponent/Teacher";
import Student from "./RootDashboard/Student";

function RootDashboard() {
  let history = useHistory();

  function goToRootLogin() {
    history.push("/RootLogin");
  }

  return (
    <>
      <BrowserRouter>
        <div id={style.header}>
          <div id={style.headerHeadingBox}>
            <h3>Online Exam System</h3>
          </div>

          <div id={style.headerMenuBox}>
            <NavLink exact to="/">
              {" "}
              <span> Dashboard</span>{" "}
            </NavLink>
            <a>
              {" "}
              <span onClick={goToRootLogin}> Logout</span>
            </a>
          </div>
        </div>

        <div id={style.content}>
          <div id={style.sideMenubar}>
            <div id={style.sideMenubarImageBox}>
              <img src={pic4} alt="" />
              <h5 className="text text-white">Welcome Admin</h5>
            </div>

            <div id={style.sideMenubarList}>
              <NavLink
                exact
                className={style.removeUnderline}
                to="/RootDashboard/Teacher"
              >
                {" "}
                <button className="btn btn-dark">
                  {" "}
                  <span> Teacher </span>
                </button>
              </NavLink>
              <NavLink
                exact
                className={style.removeUnderline}
                to="/RootDashboard/Student"
              >
                {" "}
                <button className="btn btn-dark">
                  {" "}
                  <span> Student </span>
                </button>
              </NavLink>

              {/* <NavLink exact className={style.removeUnderline} to="/AdminDashboard/TrueFalseComponent"> <button > <span>  TrueFalseQuestion </span></button></NavLink> */}
            </div>
          </div>

          <div id={style.display}>
            <Switch>
              <Route exact path="/parth" component={RootDashboard}></Route>

              <Route
                exact
                path="/RootDashboard/Teacher"
                component={Teacher}
              ></Route>
              <Route
                exact
                path="/RootDashboard/Student"
                component={Student}
              ></Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default RootDashboard;
