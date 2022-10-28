/* eslint-disable */
import React, { useEffect, useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Footer from "components/Footer";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import db from "../firebase";
import {
  collection,
  getDoc,
  onSnapshot,
  doc,
  query,
  where,
} from "firebase/firestore";
import { async } from "@firebase/util";
import AuthContext from "../auth";

export default function Login() {
  const [loginEmail, setloginEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setloggedIn] = useState(false);
  const [user, setuser] = useState([]);
  const [roles, setRole] = useState([]);
  const [admindata, setAdminData] = useState([]);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const nav = useNavigate();
  const authCtx = useContext(AuthContext);

  const adminDatas = () => {
    const regsiterdata = collection(db, "admins");
    const q = query(regsiterdata);
    onSnapshot(q, (snapshot) => {
      let regdata = [];
      snapshot.docs.forEach((doc) => {
        regdata.push({ ...doc.data(), id: doc.id });
      });

      setAdminData(regdata);
    });
  };

  const loginBtn = (e) => {
    e.preventDefault();
    // signInWithEmailAndPassword(auth, loginEmail, password)

    if (
      admindata.find(
        (data) =>
          data.username !== loginEmail &&
          admindata.find((data) => data.password !== password)
      ) ||
      (loginEmail === "" && password === "")
    ) {
      Swal.fire(
        "Please enter correct username and password",
        " Try again",
        "error"
      );
      localStorage.clear("token");
      nav("/");
      setloginEmail("");
      setPassword("");
    } else {
      if (
        admindata.find(
          (data) => data.username === loginEmail && data.password === password
        )
        // admindata.find((data) => )
      ) {
        const userdata = collection(db, "admins");
        const q = query(
          userdata,
          where("username", "==", loginEmail),
          where("password", "==", password)
        );
        onSnapshot(q, (snapshot) => {
          let userdata = [];
          snapshot.docs.forEach((doc) => {
            userdata.push({ ...doc.data(), id: doc.id });
          });
          // .then(() => {
          setuser(userdata);
          console.log("userdata", userdata);

          const token = "loginToken";
          const expirationTime = new Date(new Date().getTime() + +1000 * 1000);

          authCtx.login(token, expirationTime.toISOString());
          window.location.replace("/dashboard");

          localStorage.setItem("token", token);
          localStorage.setItem("role", userdata[0].role);
          localStorage.setItem("username", userdata[0].username);

          setloggedIn(true);
          nav("/dashboard");

          // });
        });
      } else {
        Swal.fire(
          "Please enter correct username and password",
          " Try again",
          "error"
        );
        localStorage.clear("token");
        nav("/");
        setloginEmail("");
        setPassword("");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === "loginToken") {
      setloggedIn(true);
      nav("/dashboard");
    } else {
      setloggedIn(false);
      nav("/");
    }
  }, []);

  useEffect(() => {
    adminDatas();
  }, []);

  return (
    <div>
      <div className="auth-page-wrapper pt-5">
        <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
          <div className="bg-overlay"></div>
          <div className="shape"></div>
        </div>
      </div>
      <div className="auth-page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <a href="index.html" className="d-inline-block auth-logo">
                    <img src="" alt="" height="20" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card mt-4">
                <div className="card-body p-4">
                  <div className="text-center mt-2">
                    <h5 className="logintext">Sign into Dashboard</h5>
                  </div>
                  <div className="p-2 mt-4">
                    <form action="">
                      <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          value={loginEmail}
                          onChange={(e) => setloginEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label" for="password-input">
                          Password
                        </label>
                        <div className="position-relative auth-pass-inputgroup mb-3">
                          <input
                            type="password"
                            className="form-control pe-5"
                            placeholder="Password"
                            id="password-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <button
                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                            type="button"
                            id="password-addon"
                          >
                            <i className="ri-eye-fill align-middle"></i>
                          </button>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          className="btn btn-success w-100 loginbtn"
                          type="submit"
                          onClick={loginBtn}
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
