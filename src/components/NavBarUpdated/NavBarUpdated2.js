/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useMediaQuery, useTheme } from "@mui/material";

import PropTypes from "prop-types"; // ES6
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../assets/images/download.png";
import StoreIcon from "@mui/icons-material/Store";
import React, { useState, useEffect,useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { faMicrophone, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "../../utils/style.css";
import { BASEURL } from "../../connection/BaseUrl";
import styles from "./NavBar.module.css";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SidebarUpdated from "../SidebarUpdated/SidebarUpdated";
import { Dropdown } from "react-bootstrap";
const NavBarUpdated = () => {
    const history = useHistory();
    const [inputVal, SetInputVal] = React.useState("");
    const [SuggestionReady, SetSuggestionReady] = React.useState(false);
    const [Suggestions, SetSuggestions] = React.useState([]);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const onScroll = () => setOffset(window.pageYOffset);
        console.log("scrolled");
        // clean up code
        window.removeEventListener("scroll", onScroll);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    var fetchUrl = BASEURL + "autocomplete-ssebowa/";
    const FetchSuggestions = (value) => {
        fetch(fetchUrl, {
            method: "POST",
            headers: {
                query: value,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((response) => {
                var sugg = response;
                SetSuggestionReady(true);
                SetSuggestions(sugg[1]);
            })
            .catch((err) => {
                var error = { status: "error", error: err };
                console.error(error);
                SetSuggestionReady(false);
            });
    };

    useEffect(() => {
        if (SuggestionReady) {
            window.addEventListener("click", function (e) {
                if (document.getElementById("suggestBox") && document.getElementById("suggestBox")?.contains(e.target)) {
                } else {
                    SetSuggestionReady(false);
                }
            });
        }
    }, [SuggestionReady]);

    const onChangeInput = (e) => {
        SetInputVal(e.target.value);
        if (e.target.value.replace(/\s/g, "").length) {
            FetchSuggestions(e.target.value);
        } else {
            SetSuggestionReady(false);
            SetSuggestions([]);
        }
        if (inputVal === "") {
            SetSuggestionReady(false);
            SetSuggestions([]);
        }
    };
    const SubmitSearchRequest = (e = false, text = "") => {
        let searchText = text;
        if (text === "") searchText = inputVal;
        if (e) e.preventDefault();
        if (searchText.replace(/\s/g, "").length) {
            history.push("/search?q=" + searchText, { replace: true });
        }
    };

    const [sideBar, SetsideBar] = useState(false);

    const TogglesideBar = () => {
        SetsideBar(!sideBar);
    };

    // Speech Recognition
    const { transcript, listening, finalTranscript } = useSpeechRecognition();

    useEffect(() => {
        SetInputVal(transcript);
        console.log(transcript.length);
    }, [transcript]);

    useEffect(() => {
        SetInputVal(finalTranscript);
        SubmitSearchRequest(false, finalTranscript);
    }, [finalTranscript]);

    const SetVoiceListening = (e) => {
        e.preventDefault();
    };
    // Sidebar
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleClicks = () => setOpen(!open);

    const handleClickOutsides = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutsides, true);
        return () => {
            document.removeEventListener("click", handleClickOutsides, true);};
        },[]);
    return (
        <>
            {listening ? <VoiceModal listening={listening} transcript={transcript} SpeechRecognition={SpeechRecognition} /> : <></>}
            <SidebarUpdated isOpen={sideBar} SetIsOpen={TogglesideBar} />
            <div className={offset >= 50 ? styles.AppNavBarDark : styles.AppNavBar}>
                <div className={styles.AppMiddleNavSection}>
                    <div className={styles.TopLeftSection}>
                        <a href="/">
                            <img className={styles.LogoNavMain} src={logo} alt={"Ssebowa Logo"} />
                        </a>
                        {offset >= 200 ? (
                            <NavBarSearchBar
                                inputVal={inputVal}
                                Suggestions={Suggestions}
                                SuggestionReady={SuggestionReady}
                                onChangeInput={onChangeInput}
                                SubmitSearchRequest={SubmitSearchRequest}
                                mobile={false}
                                SetVoiceListening={SetVoiceListening}

                            />
                        ) : (
                            <></>
                        )}
                    </div>
                    <div ref={dropdownRef}>
                    <Dropdown onClick={handleClicks} show={open}>
                                <Dropdown.Toggle variant="ghost" id="dropdown-menu">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        style={{ width: "30px" }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                                    </svg>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="menu menu-compact shadow bg-base-100 rounded-box w-52">
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <Link className="ms-5 mb-4 " to="/" style={{ color: "black" }}>
                                            Home
                                        </Link>
                                        <Link className="ms-5 mb-4" to="/about" style={{ color: "black" }}>
                                            About
                                        </Link>
                                        <Link className="ms-5 mb-4" to="/gallery" style={{ color: "black" }}>
                                            Gallery
                                        </Link>
                                        <Link className="ms-5 mb-4" to="/projects" style={{ color: "black" }}>
                                            Projects
                                        </Link>
                                        <Link className="ms-5 mb-4" to="/contacts" style={{ color: "black" }}>
                                            Contacts
                                        </Link>
                                        <Link className="ms-5 mb-4" to="/team" style={{ color: "black" }}>
                                            Team
                                        </Link>
                                        <Link className="ms-5 mb-4" to="/faq" style={{ color: "black" }}>
                                            Faq
                                        </Link>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>

                            </div>
                </div>
                {offset >= 200 ? (
                            <NavBarSearchBar
                                inputVal={inputVal}
                                Suggestions={Suggestions}
                                SuggestionReady={SuggestionReady}
                                onChangeInput={onChangeInput}
                                SubmitSearchRequest={SubmitSearchRequest}
                                mobile={true}
                                SetVoiceListening={SetVoiceListening}

                            />
                        ) : (
                            <></>
                        )}
            </div>
        </>
    );
};
export default NavBarUpdated;

export const SuggestSpan = ({ name, SubmitSearchRequest, SpeechRecognition }) => {
    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <span
            onClick={(e) => {
                SubmitSearchRequest(false, name);
            }}
            className="mainSearchBarSuggestionSpan"
        >
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="pt-1 pl-1"
                size="sm"
                style={{
                    color: "#59e3a7",
                    paddingHorizontal: 5,
                }}
            />{" "}
            {name}
        </span>
    );
};

SuggestSpan.propTypes = {
    name: PropTypes.string,
};
export const NavBarSearchBar=({SubmitSearchRequest,onChangeInput,inputVal,Suggestions,SuggestionReady,mobile}) =>{
    return(
        <div className={mobile ? styles.MainSearchBarWrapperMobile :styles.MainSearchBarWrapper }>
        <form className={styles.MainSearchBar} onSubmit={(e) => SubmitSearchRequest(e)}>
            <button className={styles.MainBtn} style={{ marginLeft: "1em" }} type="sumbit">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="pt-1 pl-1" size="md" />
            </button>
            <input
                className={styles.MainInput}
                value={inputVal}
                onChange={(e) => onChangeInput(e)}
                type="search"
                placeholder="Search to plant trees, feed and give sanitary pads"
            />
            <button className={styles.MainBtn} style={{ marginRight: "1em" }} type="button" onClick={SpeechRecognition.startListening}>
                <FontAwesomeIcon icon={faMicrophone} className="pt-1 pl-1" size="md" />
            </button>
        </form>
        {SuggestionReady ? (
            <div className={styles.MainSuggestions}>
                {Suggestions.length === 0 ?
                <div style={{width:"100%",marginTop:"-3em",marginBottom:"2em",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}} >No Suggestions</div>
                :
                <>
                {Suggestions.map((item, i) => {
                    return <SuggestSpan name={item} SubmitSearchRequest={SubmitSearchRequest} key={i} />;
                })}
            </>
            }

            </div>
    )
    :
    <></>
}
</div>
)}
const SuggestionDiv = ({ text, SubmitSearchRequest, Suggestions }) => {
    return (
        <div className={styles.SuggestionDiv}>
            {Suggestions.map((item, i) => {
                return <SuggestSpan name={item} SubmitSearchRequest={SubmitSearchRequest} key={i} />;
            })}
        </div>
    );
};

export const VoiceModal = ({ transcript,SpeechRecognition }) => {
    return (
        <div className={styles.VoiceRecordModal}>
            <div className={styles.VoiceRecordInner}>
                <button className={styles.VoiceRecordInnerCloseBtn} onClick={SpeechRecognition.abortListening}>
                    <span role="img" aria-label="close">
                        ❌
                    </span>
                </button>
                <button className={styles.VoiceRecordBtn} onClick={SpeechRecognition.stopListening}>
                    {/* <button className={styles.VoiceRecordBtn}  > */}
                    <KeyboardVoiceIcon size={30} />

                    <div className={styles.pulse_ring}></div>
                </button>
                <p>Start Speaking</p>
                <span>{transcript}</span>
            </div>
        </div>
    );
};
