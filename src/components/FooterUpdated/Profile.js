import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { faBlog, faTree } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

function Profile() {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(2500);

    const [pads, setPads] = useState(350);
    const [meals, setMeals] = useState(2604);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((sec) => sec + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (seconds === 60) {
            setSeconds(0);
            setMinutes((min) => min + 1);
        }
    }, [seconds]);

    useEffect(() => {
        if (minutes === 1440) {
            setMinutes(0);
            setHours((hr) => hr + 1);
        }
        return(()=>{
            console.log("")
        })
    }, [minutes]);

    useEffect(() => {
        if (minutes === 1440) {
            setMinutes(0);
            setPads((hr) => hr + 1);
        }
    }, [minutes]);

    useEffect(() => {
        if (minutes === 1440) {
            setMinutes(0);
            setMeals((hr) => hr + 1);
        }
    }, [minutes]);

    return (
        <div>
            {/* <h1 className="heading-title">
                Due to your search at ssebow we have planted a <FontAwesomeIcon style={{ fontSize: "30px", color: "#4AB421" }} icon={faTree} />{" "}
                <span style={{ color: "#4AB421", fontWeight: "bold", fontSize: "26px" }}> {hours.toString().padStart(2, "0")} </span>
                <span className="d-none">
                    :&nbsp; Minutes: {minutes.toString().padStart(2, "0")} :&nbsp; Seconds: {seconds.toString().padStart(2, "0")}
                </span>{" "}
                trees, give out <span style={{ color: "#4AB421", fontWeight: "bold", fontSize: "26px" }}> {pads.toString().padStart(2, "0")} </span>
                <span className="d-none">
                    :&nbsp; Minutes: {minutes.toString().padStart(2, "0")} :&nbsp; Seconds: {seconds.toString().padStart(2, "0")}
                </span>{" "}
                pads and served <span style={{ color: "#4AB421", fontWeight: "bold", fontSize: "26px" }}> {meals.toString().padStart(2, "0")} </span>
                <span className="d-none">
                    :&nbsp; Minutes: {minutes.toString().padStart(2, "0")} :&nbsp; Seconds: {seconds.toString().padStart(2, "0")}
                </span>{" "}
                meals
            </h1> */}
            <h1 className="heading-title" >The World’s Most  <span style={{ color: "#4AB421", fontWeight: "bold", fontSize: "26px" }}> Private</span> Search Engine</h1>
        </div>
    );
}

export default Profile;
