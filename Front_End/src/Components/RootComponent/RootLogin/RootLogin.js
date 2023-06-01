import style from "./RootLogin.module.css";

import { NavLink } from "react-router-dom";

import { useState } from "react";

import axios from "axios";

import { useHistory } from "react-router-dom";

import baseUrl from "../../baseUrl";

function RootLogin() {
  const [root, setRoot] = useState({
    admin_name: "",
    admin_password: "",
  });

  function handleInput(e) {
    setRoot(
      {
        ...root,
        [e.target.name]: e.target.value,
      },
      []
    );
  }
  let history = useHistory();

  async function login(e) {
    try {
      // const value = await axios.get(`${baseUrl}/admin/${root.admin_name}`);
      // value.data.name  value.data.password
      if ("admin" === root.admin_name) {
        if ("admin" === root.admin_password) {
          alert("success");
          history.push("/RootDashboard");
        } else {
          alert("Wrong Password");
        }
      } else {
        alert("Wrong Admin name");
      }
    } catch (e) {
      alert("Admin Does not exist, try other user name in again");
    }
  }

  return (
    <>
      <div className="container-fluid" id={style.background1}>
        <div className="col-md-6" id={style.loginbox}>
          <h2 className="display-4 ">Admin Login</h2>
          <div
            className="form-control"
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            <label htmlFor="email">
              {" "}
              <h3 className="">AdminName</h3>
              <input
                className=" form-control-lg"
                name="admin_name"
                onChange={(e) => handleInput(e)}
                type="text"
                placeholder="enter admin name"
                required
              />
            </label>

            <label htmlFor="password">
              {" "}
              <h3 className="">Password</h3>
              <input
                className=" form-control-lg"
                name="admin_password"
                onChange={(e) => handleInput(e)}
                type="password"
                id={style.password}
                placeholder="enter password"
                required
              />
            </label>
            <br />
            <br />

            <button
              onClick={(e) => login(e)}
              className="btn btn-warning btn-center "
            >
              Login
            </button>
            <span> </span>
            <button className="btn btn-warning btn-center ">
              <NavLink
                to="/"
                style={{ textDecoration: "none", color: "black" }}
              >
                {" "}
                Go Back
              </NavLink>{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RootLogin;
