/* eslint-disable jsx-a11y/click-events-have-key-events */
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types"; // ES6
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { BASEURL } from "../../connection/BaseUrl";
import Bookmarks from "../Bookmarks/Bookmarks";
import SideVideo from "./SideVideo/SideVideo";
import "../../utils/style.css";
import Profile from "../FooterUpdated/Profile";
import SearchesHints from "../SearchResults/SearchesHints";
import {VoiceModal,NavBarSearchBar} from "../NavBarUpdated/NavBarUpdated2"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";


function SearchBarHome() {
    const [searchBar, setSearchBar] = useState(false);

    const history = useHistory();
    const [inputVal, SetInputVal] = React.useState("");
    const [SuggestionReady, SetSuggestionReady] = React.useState(false);
    const [Suggestions, SetSuggestions] = React.useState([]);

    const location = useLocation();

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
    // Speech
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
    return (
        <div>
            {listening ? <VoiceModal listening={listening} transcript={transcript} SpeechRecognition={SpeechRecognition} /> : <></>}
            <div className="w-100 d-flex flex-column align-items-center">
                <div className="visibles">
                    <img src="https://i.ibb.co/2SRRBdJ/logo-jybeu2-png.png" alt="" />
                </div>
                <div className="text-center">
                    {/* <Profile/> */}
                </div>

                <div style={{width:"90vw",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                <NavBarSearchBar
                                inputVal={inputVal}
                                Suggestions={Suggestions}
                                SuggestionReady={SuggestionReady}
                                onChangeInput={onChangeInput}
                                SubmitSearchRequest={SubmitSearchRequest}
                                mobile={false}
                            />
                </div>
            </div>
        </div>
    );
}

export default SearchBarHome;

const SuggestSpan = ({ name, SubmitSearchRequest }) => {
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
