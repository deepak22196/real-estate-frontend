import React, { useContext } from "react";
import "../CSS-files/header.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import "../CSS-files/header.css";
import Popup from "reactjs-popup";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
// const url1 = "http://localhost:8000/logout";
function Header({ userEmail, userName, setToken }) {
  var str = "";
  for (let i = 0; i < userEmail.length; i++) {
    if (userEmail[i] == "@") {
      break;
    }
    if (i % 2 == 0) {
      str += userEmail[i];
    } else {
      str += "*";
    }
  }
  str = str + "****@gmail.com";
  const navigate = useNavigate();
  const handleLogout = async () => {
    console.log("logging out");
    console.log(setToken);
    setToken(localStorage.clear());
    // localStorage.clear();
    // const response = await axios.get(url1, { withCredentials: true });

    navigate("/");
  };

  return (
    <div className="header">
      <div className="123">
        <div className="userid">
          <span className="userid">
            <h5>UserID:</h5>
            {str}
          </span>
        </div>
      </div>
      <div className="username" placeholder="username">
        <div>
          <PersonOutlineIcon />
        </div>
        <div class="dropdown">
          <div class="dropbtn">{userName}</div>
          <div class="dropdown-content">
            <div>
              <Popup
                trigger={
                  <button
                    style={{
                      backgroundColor: "rgb(240 223 223 / 95%)",
                      borderRadius: "20px",
                      width: "150px",
                      height: "40px",
                    }}
                  >
                    <h4 className="popup" style={{ marginTop: "10px" }}>
                      {" "}
                      SignOut
                    </h4>{" "}
                  </button>
                }
                position="right center"
              >
                <div className="popuptext">
                  <h3>Are sure You Want to Logout</h3>
                  {/* <button className='btn' onClick={handleCancel}>CANCEL</button> */}
                  <button
                    style={{ backgroundColor: "#6AB4F8" }}
                    className="logout-btn"
                    onClick={handleLogout}
                  >
                    LOG OUT
                  </button>
                </div>
              </Popup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
