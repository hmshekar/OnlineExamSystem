import {
  NavLink,
  Switch,
  Route,
  BrowserRouter,
  useHistory,
} from "react-router-dom";
import { useEffect } from "react";
import style from "./StudentDashboard.module.css";
import Subject from "./Subject/Subject";
import Result from "./ResultComponent/Result";
import Exam from "./ExamComponent/Exam";
import Test from "./TestComponent/Test";

function StudentDashboard() {
  useEffect(() => {
    if (sessionStorage.getItem("user") == null) {
      alert("Detect Illegal Way of Entering");
      history.push("/StudentLogin");
    }
  });

  let history = useHistory();

  return (
    <>
      <BrowserRouter>
        {/* ===================================================================== */}

        <div id={style.displayBox}>
          <Switch>
            <Route exact path="/StudentDashboard" component={Subject} />
            <Route exact path="/StudentDashboard/Result" component={Result} />
            <Route
              exact
              path="/StudentDashboard/Exam/:category"
              component={Exam}
            />
            <Route
              exact
              path="/StudentDashboard/Exam/:category/:id"
              component={Test}
              hidden="true"
            />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default StudentDashboard;
