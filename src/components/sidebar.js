import React from "react";
import "../CSS-files/sidebar.css";
import {sidebardata} from "./sidebardata";

function Sidebar(){
    return(
        <div className="sidebar">
            <div className="logo1">
                Logo
            </div>
            <div className="sidedata">
                <ul className="sidebarlist" style={{color:"#AAAAAA"}}>
                    {sidebardata.map((val, key) =>{
                        return (
                            <li style={{color:"rgba(34, 137, 255, 1)"}} key={key} className="row"> 
                                
                                <div id="icon">{val.icon}</div>
                                <div  id="title">{val.title}</div>
                            </li>
                        )
                    })}
                </ul>
                
            </div>
            

        </div>
    );
}

export default Sidebar;