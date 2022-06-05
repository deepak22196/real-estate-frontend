import React, { useEffect } from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import Basicinfo from "./basicinfo";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useContext } from "react";
import Propertyinfo from "./property-info";
import Genaralinfo from "./genaral-info";
import Locationinfo from "./location-info";
import axios from "axios";

const url = process.env.REACT_APP_API + "/form";
// const token = localStorage.getItem("token");
// axios.interceptors.request.use((config) => {
//   config.headers.authorization = `Bearer ${token}`;
// });

const FormParent = ({ token, setToken }) => {
  const { editID, userEmail, userName } = useParams();
  const navigate = useNavigate();

  console.log(editID);

  const [formData, setFormData] = useState({
    Property: "",
    Contact: "",
    Area: 0,
  });

  const [page, setPage] = useState(0);
  if (page < 0) {
    navigate(`/AllProperties/${userEmail}/${userName}`);
  }
  //
  //
  //

  const authTester = async () => {
    try {
      const response = await axios.get(`${url}/authTesting`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      if (error.response.status == 403) {
        navigate("/");
      }
    }
  };
  //
  //
  //
  useEffect(() => {
    authTester();
  });

  async function handleSubmit() {
    if (editID) {
      try {
        console.log("editing existing data");
        const response = await axios.put(`${url}/${editID}`, formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response);
        navigate(`/AllProperties/${userEmail}/${userName}`);
      } catch (error) {}
    } else {
      try {
        console.log("posting new data");
        const response = await axios.post(url, formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response);
        navigate(`/AllProperties/${userEmail}/${userName}`);
      } catch (error) {
        console.log(error);
        navigate("/");
      }
    }
  }
  //
  //
  //

  const FormPage = (setToken) => {
    if (page == 0) {
      return (
        <Basicinfo
          setToken={setToken}
          formData={formData}
          setFormData={setFormData}
          userEmail={userEmail}
          userName={userName}
        />
      );
    } else if (page == 1) {
      return (
        <Propertyinfo
          setToken={setToken}
          formData={formData}
          setFormData={setFormData}
          userEmail={userEmail}
          userName={userName}
        />
      );
    } else if (page == 2) {
      return (
        <Genaralinfo
          setToken={setToken}
          formData={formData}
          setFormData={setFormData}
          userEmail={userEmail}
          userName={userName}
        />
      );
    } else if (page == 3) {
      return (
        <Locationinfo
          setToken={setToken}
          formData={formData}
          setFormData={setFormData}
          userEmail={userEmail}
          userName={userName}
        />
      );
    } else if (page > 3) {
      console.log("inside form Page");
      handleSubmit();
    }
  };
  return (
    <div>
      {FormPage(setToken)}
      <div className="footer">
        <button className="btn1" onClick={() => setPage((page) => page - 1)}>
          Back
        </button>

        <button className="btn2" onClick={() => setPage((page) => page + 1)}>
          {page > 2 ? "Submit" : "Save & continue"}
        </button>
      </div>
    </div>
  );
};

export default FormParent;
