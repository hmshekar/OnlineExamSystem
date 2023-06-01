import style from "./Home.module.css";

//  import pic4 from "../../images/5.jpg";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <div id={style.background1}>
        <div className=" ">
          <div
            className="d-flex justify-content-end"
            style={{ paddingTop: "5px", paddingRight: "150px" }}
          >
            <h2 id={style.button}>Login as</h2>
            <div className="" id={style.button}>
              <NavLink
                exact
                to="/StudentLogin"
                className="card-link btn btn-success"
              >
                <span className="">Student</span>
              </NavLink>
            </div>
            <div className="" id={style.button}>
              <NavLink to="/AdminLogin" className="card-link btn btn-success">
                <span className="">Teacher</span>
              </NavLink>
            </div>
            <div className="" id={style.button}>
              <NavLink to="/RootLogin" className="card-link btn btn-success">
                <span className="text-white">Admin</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
