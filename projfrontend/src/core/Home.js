import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";

export default function Home(){
    console.log("API is ", API);
    return(
        <Base title="HomePage">
            <div className="row">
                <div className="col-4">
                    <button className="btn btn-success">Test</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">Test</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">Test</button>
                </div>
            </div>
        </Base>
    )
}