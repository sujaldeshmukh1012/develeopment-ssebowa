import React from "react";
import "./SearchHints.css";
import { BsCodeSlash, BsFileEarmarkCodeFill } from "react-icons/bs";
import { RiTextDirectionR } from "react-icons/ri";

const SearchesHints = () => {
    return (
        <div>
            <div className="searchHints-main-container">
                {/* <div className="searchHints-data">
                    <h1>searchHints</h1>
                    <p>
                        Feel inspired and get confident to search on the Ssebowa. You could become a testimony to many
                        <br /> people and make them join you to search for a good cause.
                    </p>
                </div> */}
                {/* <div className="SlideContainer"> */}
                {/* <h1 style={{ "text-align": "center" }}>React Card Slider</h1> */}
                <div className="cardHints-container">
                    <div className="SearchHintsCard me-lg-5" style={{ padidngTop: "30px" }}>
                        <h1 style={{ fontSize: "18px", marginTop: "17px" }}>
                            <BsFileEarmarkCodeFill /> Query for code
                        </h1>
                    </div>
                    <div className="SearchHintsCard me-lg-5">
                        <h1 style={{ fontSize: "18px", marginTop: "17px" }}> Genrate eassy</h1>
                    </div>
                    <div className="SearchHintsCard">
                        <h1 style={{ fontSize: "18px", marginTop: "17px" }}>
                            <RiTextDirectionR />
                            Genrate poem
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchesHints;
