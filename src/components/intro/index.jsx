import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../button";
import Parallax from "parallax-js";
import Logo from "../logo";
import SearchBarHome from "../searchbarhome/SearchBarHome";
// import Bookmarks from "../Bookmarks/Bookmarks";
import { Link, useHistory } from "react-router-dom";
import styles from "./intro.module.css";
import logo from "../../assets/images/download.png";
import { faMagnifyingGlass, faMicrophone, faCode, faAlignLeft, faKeyboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import BottomSection from "../BottomSection/BottomSection";
import { SuggestSpan, VoiceModal } from "../NavBarUpdated/NavBarUpdated2";
import { BASEURL } from "../../connection/BaseUrl";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import AITools from "../AITools/AITools";

const Intro = ({ data }) => {
    const [AiMode,SetAiMode] = useState(null)
    const SetAiModeOption = (option) =>{
        if(option){
        SetAiMode(option)
        console.log(option)
        }
        else if(option === null){
            SetAiMode(option)
        console.log(option)
        }
    }
    return (
        <div className={styles.IntroMain}>
                    {AiMode  !== null ?
        <AITools mode={AiMode} SetAiModeOption={SetAiModeOption} />
        :
        <></>
}
            <IntroLogo />
            <MainSearchBar />
            <SlidingOptions SetAiModeOption={SetAiModeOption}/>
            <BottomSection />
        </div>
    );
};

Intro.propTypes = {
    data: PropTypes.object,
};

export default Intro;

const IntroLogo = () => {
    return <img className={styles.IntroLogo} src={logo} alt="Ssebowa logo" />;
};
const MainSearchBar = ({AiMode}) => {
    const history = useHistory();
    const [inputVal, SetInputVal] = React.useState("");
    const [SuggestionReady, SetSuggestionReady] = React.useState(false);
    const [Suggestions, SetSuggestions] = React.useState([]);

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

    return (
        <>

            {listening ? <VoiceModal listening={listening} transcript={transcript} SpeechRecognition={SpeechRecognition} /> : <></>}
            <div className={styles.MainSearchBarWrapper}>
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
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};

const SlidingOptions = ({SetAiModeOption}) => {
    return (
        <div className={styles.SlidingOptions}>
            <Options SetAiModeOption={SetAiModeOption} icon={faCode} title={"Generate Code"} subtitle={"use it now"} option={3} />
            <Options SetAiModeOption={SetAiModeOption} icon={faKeyboard} title={"Generate essay"} subtitle={"use it now"} option={1} />
            <Options SetAiModeOption={SetAiModeOption} icon={faAlignLeft} title={"Generate poem"} subtitle={"use it now"} option={2} />
        </div>
    );
};

const Options = ({ title, icon,option,SetAiModeOption}) => {
    const HandelClick = () =>{
        SetAiModeOption(option)
    }
    return (
        <button className={styles.Options} onClick={()=>HandelClick()} >
            <FontAwesomeIcon icon={icon} className={styles.OptionIcon} />
            <h6 className={styles.OptionTitle}>{title}</h6>
        </button>
    );
};
