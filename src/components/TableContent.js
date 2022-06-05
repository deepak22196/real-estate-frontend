import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import "../CSS-files/tablecontent.css";
import "../CSS-files/search.css";
import { Link, useNavigate } from "react-router-dom";
import blank_image from "../images/Icons/blank-image.png";
import eye from "../images/Icons/eye.png";
import edit from "../images/Icons/edit.png";
import search from "../images/Icons/search-icon.png";
import axios from "axios";
import { log } from "../App";
const url1 = process.env.REACT_APP_API + "/Allproperties";

// axios.interceptors.request.use((config) => {
//   config.headers.authorization = `Bearer ${token}`;
// });

function Tablecontent({ userEmail, userName, token }) {

  console.log(userEmail, userName);
  const btnref = useRef({});
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  // const [property, setProperty] = useState([]);
  //
  //
  const getAllProperties = async () => {
    try {
      const response = await axios.get(url1, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const result = response.data.user_properties;
      setItems(result);
    } catch (error) {
      console.log(error.response);
      if (error.response.status == 403) {
        navigate("/");
      }
    }
  };
  useEffect(() => {
    // if (!islog) {
    //   navigate("/");
    // }
    getAllProperties();
  }, []);

  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      const response = await axios.get(
        process.env.REACT_APP_API + `/search/${key}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      // console.log(response);
      const result = response.data;
      console.log(result);
      if (result) {
        setItems(result);
      }
    }
  };

  const handleClick = (id) => {
    const res = axios.put(
      process.env.REACT_APP_API + `/toggleStatus/${id}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  };

  const handleEdit = (PPDID) => {
    // setEditID(id);
    navigate(`/form/${PPDID}/${userEmail}/${userName}`);

    // const res = axios.put(
    //   `http://localhost:8000/toggleStatus/${id}`,
    //   {},
    //   {
    //     withCredentials: true,
    //   }
    // );
  };
  //
  //
  //
  const handleAddNew = () => {
    navigate(`/form/${userEmail}/${userName}`);
  };
  //
  //
  //
  if (!token) {
    navigate("/")
  }
  return (
    <div className="tablecontent">
      <form class="search-form">
        <input
          type="text"
          id="search"
          style={{ fonSize: "25px" }}
          placeholder="Search PPD ID"
          onChange={searchHandle}
        />

        <img style={{ margin: "-8px -50px" }} src={search} alt="no-img" />

        <button
          className=" add-user"
          type="submit"
          onClick={() => {
            handleAddNew();
          }}
        >
          + Add Property
        </button>
      </form>
      <tbody id="tbody">
        <tr>
          <th>PPDID</th>
          <th>Image</th>
          <th>Property</th>
          <th>Contact</th>
          <th>Area</th>
          <th>Views</th>
          <th>Status</th>
          <th>DaysLeft</th>
          <th>Action</th>
        </tr>
        {items.length > 0 ? (
          items.map((item, i) => (

            <tr key={i}>
              <td>PPID{item.PPDID.slice(3, 9)}</td>
              <td>
                <img
                  style={{ margin: "10px 10px 0px 20px" }}
                  src={blank_image}
                  alt="no image"
                />
              </td>
              <td>{item.Property}</td>
              <td>{item.Contact}</td>
              <td>{item.Area}</td>
              <td>{item.Views}</td>
              <td>
                <button
                  style={{
                    width: "90px",
                    height: "30px",
                    borderRadius: "10px",
                    border: "1px solid #eceaea",
                    color: "#416899",
                    cursor: "pointer"
                  }}
                  key={i}
                  ref={(node) => {
                    btnref.current[i] = node;
                  }}
                  onClick={() => {
                    btnref.current[i].textContent == "Unsold"
                      ? (btnref.current[i].textContent = "Sold")
                      : (btnref.current[i].textContent = "Sold");
                    handleClick(item._id);
                  }}
                >
                  {item.Status}
                </button>
              </td>
              <td>{item.DaysLeft}</td>
              <td>
                <img
                  style={{
                    margin: "5px 10px 0px 20px",
                    width: "20px",
                    cursor: "pointer",
                  }}
                  src={eye}
                  alt="no image"
                />
                <img
                  onClick={() => {
                    handleEdit(item.PPDID);
                  }}
                  style={{ margin: "5px 10px 0px 20px", cursor: "pointer" }}
                  src={edit}
                  alt="no image"
                />
              </td>
            </tr>
          ))
        ) : (
          <p className="no-res">No Result Found</p>
        )}
      </tbody>
    </div>
  );
}

export default Tablecontent;
