import React from "react";
import Menu from "./menu";


const Base = ({
    title="My Title",
    description="My description",
    className="text-white p-4",
    children
}) => {
    return(
        <div>
            <Menu></Menu>
            <div className="container-fluid">
                <div className="jumbotron text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>
                    {children}
                </div>
            </div>
            <footer className="footer mt-auto py-3">
                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>If you got any questions, feel free to reach out</h4>
                    <button className="btn btn-warning btn-lg">Contact us</button>
                </div>
                <div className="container">
                    <span className="text-muted">
                        An amazing place to buy tshirt
                    </span>
                </div>
            </footer>
        </div>
    )
}

export default Base;