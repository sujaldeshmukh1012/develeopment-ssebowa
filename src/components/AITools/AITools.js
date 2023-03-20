import React, { useState, useEffect } from "react";
import styles from "./AITools.module.css";
import { faMagnifyingGlass, faMicrophone, faCode, faAlignLeft, faKeyboard, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASEURL_AI } from "../../connection/BaseUrl";
import { Dna } from "react-loader-spinner";

function AITools({ SetAiModeOption, mode }) {
    const [Results, SetResults] = useState([]);
    const [ResultReady, SetResultReady] = useState(false);
    const [CurrentState, SetCurrentState] = useState(false);


    const SubmitAiSearchRequest = (mode, query) => {
        const url = BASEURL_AI + "ai?keyword=" + query + "&option=" + mode;
        SetCurrentState("loading");
        var usrmsg = {
            role: 0,
            message: query,
        };
        SetResults((oldArray) => [...oldArray, usrmsg]);
        fetch(url, { method: "POST" })
            .then((r) => r.json())
            .then((response) => {
                var msg = {
                    role: 1,
                    message: response,
                };
                // RefineRequests(response)
                SetResultReady(true);
                SetResults((oldArray) => [...oldArray, msg]);
            SetCurrentState(false);
            })
            .catch((e) => {
                SetCurrentState("error");
            });
    };
    return (
        <div className={styles.AiToolsWrapper}>
            <div className={styles.AiToolsMain}>
                <button className={styles.AiToolsCrossBtn} onClick={() => SetAiModeOption(null)}>
                    <FontAwesomeIcon icon={faTimes} className="pt-1 pl-1" size="2x" color="red" />
                </button>
                <div className={styles.AIToolsTopWrapper}>
                    <h1 className={styles.AiToolsH1}>SSEBOWA AI TOOLS</h1>
                </div>
                <div className={styles.AiResultContainerBig}>
                    {Results.length > 0? (
                        <>
                            {Results.map((item, i) => {
                                if (item.role === 0) {
                                    return <RequestMessage text={item.message} />;
                                } else if (item.role === 1) {
                                    return <ResponseMessage text={item.message} />;
                                }
                            })}
                        </>
                    ) : (
                        <>START TYPING YOU QUERIES TO SEE AI HOW OUR AI WORKS</>
                    )}
                    {CurrentState === 'loading' ?<LoadingeMessage /> : CurrentState ==='error'? <ErrorMessage/> :<></>}
                </div>
                <div className={styles.AiActionContainerSmall}>
                    <div className={styles.AiToolsSelectDiv}>
                        <AiToolSelect SetAiModeOption={SetAiModeOption} option={3} selected={mode == 3} text={"Write code for"} />
                        <AiToolSelect SetAiModeOption={SetAiModeOption} option={1} selected={mode == 1} text={"Write an essay"} />
                        <AiToolSelect SetAiModeOption={SetAiModeOption} option={2} selected={mode == 2} text={"Write a poem"} />
                    </div>
                    <AiInputField mode={mode} SubmitAiSearchRequest={SubmitAiSearchRequest} />
                </div>
            </div>
        </div>
    );
}

export default AITools;

const AiToolSelect = ({ text, selected, SetAiModeOption, option }) => {
    return (
        <button className={selected ? styles.AiToolsSelectDark : styles.AiToolsSelect} onClick={() => SetAiModeOption(option)}>
            {text}
        </button>
    );
};

const AiInputField = ({ mode, SubmitAiSearchRequest }) => {
    const [inputVal, SetInputVal] = useState("");
    const [inpPlaceHolder, SetInpPlaceHolder] = useState("");
    useEffect(() => {
        if (mode == 3) {
            SetInpPlaceHolder("Write Code for ");
        } else if (mode == 2) {
            SetInpPlaceHolder("Write a poem on  ");
        } else if (mode == 1) {
            SetInpPlaceHolder("Write an essay on ");
        }
    }, [mode]);
    const onChangeText = (e) => {
        SetInputVal(e.target.value);
    };
    const SubmitSearch = (e) => {
        e.preventDefault();
        var text = inpPlaceHolder + inputVal;
        SubmitAiSearchRequest(mode, text);
    };

    return (
        <form
            className={styles.AiInputBox}
            onSubmit={(e) => {
                SubmitSearch(e);
                SetInputVal("");
            }}
        >
            <input
                type={"search"}
                className={styles.AiInputField}
                onChange={(e) => onChangeText(e)}
                value={inputVal}
                placeholder={mode == 3 ? "Write code for ..." : mode == 1 ? "Write an essay on ... " : "Write a poem on ..."}
            />
            <button className={styles.AiSubmitBtn} type={"submit"}>
                Submit
            </button>
        </form>
    );
};

const ResponseMessage = ({ text }) => {
    return (
        <div className={styles.ResponseMessage}>
            <div className={styles.ResponseMessageInner}>{text}</div>
        </div>
    );
};

const RequestMessage = ({ text }) => {
    return (
        <div className={styles.RequestMessage}>
            <div className={styles.RequestMessageInner}>{text}</div>
        </div>
    );
};

const LoadingeMessage = () => {
    return (
        <div className={styles.LoadingeMessage}>
            <div className={styles.LoadingeMessageInner}>
                <Dna visible={true} height="20" width="20" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="dna-wrapper" />
            </div>
        </div>
    );
};

const ErrorMessage = () => {
    return (
        <div className={styles.ErrorMessage}>
            <div className={styles.ErrorMessageInner}>
                An Error Occured Please Try again after some time
            </div>
        </div>
    );
};
