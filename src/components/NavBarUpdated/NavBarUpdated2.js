/* eslint-disable jsx-a11y/click-events-have-key-events */
import { AppBar, Box, Button, Grid, IconButton, Menu, MenuItem, Tab, Tabs, Toolbar, useMediaQuery, useTheme } from "@mui/material";

import PropTypes from "prop-types"; // ES6
import SearchIcon from "@mui/icons-material/Search";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import Modal from "@mui/material/Modal";

import BookIcon from "@mui/icons-material/Book";
import StoreIcon from "@mui/icons-material/Store";
import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import SearchBarForNavbar from "../SearchBarforNavbar/SearchBarForNavbar";
import NavbarDrawer from "./NavbarDrawer";

import { faBlog, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../utils/style.css";
import { Form } from "react-bootstrap";
import { BASEURL } from "../../connection/BaseUrl";

const style = {
    position: "absolute",
    top: "20%",
    left: "85%",
    transform: "translate(-50%, -50%)",
    width: 400,
    // bgcolor: "transparent",
    // border: "2px solid #000",
    // boxShadow: 24,
    // p: 4,
};

const NavBarUpdated = () => {
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

    const [anchorEl, setAnchorEl] = useState(null);
    const [searchBarOpen, setSearchBarOpen] = React.useState(false);

    const handleSearchBarOpen = () => {
        setSearchBarOpen(true);
    };
    const handleSearchBarClose = () => {
        setSearchBarOpen(false);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    // const location = useLocation();

    const [value, setValue] = useState();

    const linksArray = [
        { id: 0, navName: "Home", navLink: "/" },
        { id: 1, navName: "About", navLink: "/about" },
        { id: 2, navName: "Gallery", navLink: "/gallery" },
        { id: 3, navName: "Projects", navLink: "/projects" },
        { id: 4, navName: "Contact", navLink: "/contact" },
        { id: 5, navName: "Team", navLink: "/team" },
    ];

    const linksArrayForDrawer = [
        { id: 0, icon: "fa-solid fa-house", navName: "Home", navLink: "/" },
        { id: 1, icon: "fa-solid fa-circle-info", navName: "About", navLink: "/about" },
        { id: 2, icon: "fa-solid fa-image", navName: "Gallery", navLink: "/gallery" },
        { id: 3, icon: "fa-solid fa-history", navName: "Projects", navLink: "/projects" },
        { id: 4, icon: "fa-solid fa-phone", navName: "Contact", navLink: "/contact" },
        { id: 5, icon: "fa-solid fa-people-group", navName: "Team", navLink: "/team" },
        { id: 6, icon: "fa-solid fa-comment", navName: "Faq", navLink: "/faq" },
    ];

    const limitToMoreNavs = 3;
    const normalNavs = linksArray;
    const moreNavs = linksArray.slice(limitToMoreNavs, linksArray.length);

    return (
        <>
            <AppBar
                style={{
                    background: "#E5E5E5",
                    padding: "0px",
                    boxShadow: "none",
                }}
            >
                <Toolbar
                    sx={{
                        height: "126px",
                        width: "98vw",
                        padding: "0px",
                    }}
                >
                    {isMatch ? (
                        <>
                            <Grid
                                sx={{ placeItems: "center" }}
                                container
                                style={{ flexDirection: "row-reverse", justifyContent: " space-between", paddingBottom: "59px" }}
                            >
                                <Grid item xs={2}>
                                    <NavbarDrawer className="bg-white text-white" style={{ color: "white" }} linksArray={linksArrayForDrawer}></NavbarDrawer>
                                </Grid>

                                <Grid item xs={1} />

                                <Grid className="small-logo" item xs={2}>
                                    <Link to="/">
                                        <img style={{ maxWidth: "103px", marginLeft: "23px" }} src="https://i.ibb.co/2SRRBdJ/logo-jybeu2-png.png" alt="" />
                                    </Link>
                                </Grid>

                                <Grid className="" item xs={2} style={{ marginTop: "118px" }}>
                                    <div className="mainSearchBarMainDiv100">
                                        {location.pathname != "/" ? (
                                            <>
                                                <Form
                                                    method="NONE"
                                                    className="d-flex"
                                                    style={{
                                                        width: "95vw",
                                                        marginLeft: "5px",
                                                        position: "fixed",
                                                        top: "70px",
                                                    }}
                                                    onSubmit={(e) => SubmitSearchRequest(e)}
                                                >
                                                    <Form.Control
                                                        type="text"
                                                        // className="me-1"
                                                        aria-label="Search"
                                                        style={{
                                                            borderRadius: "100px 0px 0px 100px",
                                                            height: "38px",
                                                            border: "none",
                                                            fontSize: "13px",
                                                        }}
                                                        value={inputVal}
                                                        placeholder="Search to plant trees, feed and give pads..."
                                                        onChange={(e) => onChangeInput(e)}
                                                    />

                                                    <Button
                                                        variant="success "
                                                        className=" d-flex justify-content-center align-items-center"
                                                        style={{
                                                            color: "black",
                                                            borderRadius: "0 100px 100px 0",
                                                            backgroundColor: "#fff",
                                                            border: "none",
                                                        }}
                                                        type="submit"
                                                    >
                                                        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-black me-1" size="md" />
                                                    </Button>
                                                </Form>
                                            </>
                                        ) : (
                                            <>
                                                <Form
                                                    className="topSearchBar_Form topSearchBar_Form d-flex me-3 ms-3 pe-1 ps-1  align-items-center justify-content-center serch-focus"
                                                    style={{
                                                        width: "80vw",
                                                        height: "100%",
                                                        maxHeight: "200px",
                                                    }}
                                                    onSubmit={(e) => SubmitSearchRequest(e)}
                                                >
                                                    <div className="top-searchBar">
                                                        <div
                                                            className="d-flex"
                                                            style={{
                                                                width: "100vw",
                                                                marginLeft: "9px",
                                                                position: "fixed",
                                                                left: "-36px",
                                                                right: "2px",
                                                                top: "71px",
                                                                // maxWidth: "300px",
                                                                // minWidth: "100px",
                                                                // height: "80%",
                                                                // maxHeight: "50px",
                                                            }}
                                                        >
                                                            <Form.Control
                                                                type="text"
                                                                className=" serch-input"
                                                                aria-label="Search"
                                                                placeholder="Search to plant trees, feed and give pads..."
                                                                value={inputVal}
                                                                onChange={(e) => onChangeInput(e)}
                                                            />

                                                            <Button
                                                                type="submit"
                                                                className="  d-flex justify-content-center align-items-center search-text"
                                                                style={{
                                                                    color: "black",
                                                                    borderRadius: "0 100px 100px 0",
                                                                    backgroundColor: "#fff",
                                                                    border: "none",
                                                                }}
                                                            >
                                                                <div className="text-black ">
                                                                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-black me-2" size="lg" />
                                                                </div>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Form>
                                                {/* {searchBar ? (
                            <Form
                                className="topSearchBar_Form topSearchBar_Form d-flex me-3 ms-3 pe-1 ps-1  align-items-center justify-content-center serch-focus"
                                style={{
                                    width: "80vw",
                                    height: "100%",
                                    maxHeight: "200px",
                                }}
                                onSubmit={(e) => SubmitSearchRequest(e)}
                            >
                                <div className="top_searchBar d-flex">
                                    <Form.Control
                                        type="text"
                                        className=" serch-input"
                                        aria-label="Search"
                                        placeholder="Search the web to plant trees..."
                                        value={inputVal}
                                        onChange={(e) => onChangeInput(e)}
                                    />

                                    <Button
                                        type="submit"
                                        className="  d-flex justify-content-center align-items-center search-text"
                                        style={{
                                            color: "black",
                                            borderRadius: "0 100px 100px 0",
                                            backgroundColor: "#fff",
                                            border: "none",
                                        }}
                                    >
                                        <div className="text-black ">
                                            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-black me-2" size="lg" />
                                        </div>
                                    </Button>
                                    <Button style={{ backgroundColor: "gray" }} className="cncl-btn" onClick={() => setSearchBar(false)}>
                                        Cancle
                                    </Button>
                                </div>
                            </Form>
                        ) : (
                            <Form
                                className="homeSearchBar d-flex me-3 ms-3 pe-1 ps-1  align-items-center justify-content-center serch-focus"
                                style={{
                                    width: "80vw",
                                    height: "100%",
                                    maxHeight: "200px",
                                }}
                            >
                                <Form.Control
                                    type="text"
                                    className="me-1 serch-input"
                                    aria-label="Search"
                                    placeholder="Search the web to plant trees..."
                                    onClick={() => setSearchBar(true)}
                                />

                                <Button
                                    className="  d-flex justify-content-center align-items-center search-text"
                                    style={{
                                        width: "2px",
                                        color: "black",
                                        borderRadius: "0 100px 100px 0",
                                        position: "relative",
                                        right: "5px",
                                        backgroundColor: "#fff",
                                        border: "none",
                                    }}
                                >
                                    <div className="text-black bg-light">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-black me-2" size="lg" />
                                    </div>
                                </Button>
                            </Form>
                        )} */}
                                            </>
                                        )}

                                        {SuggestionReady ? (
                                            <div
                                                className="d-flex justify-content-center align-items-center search-bars "
                                                style={{ marginTop: "80px", marginRight: "45px" }}
                                            >
                                                <div
                                                    id="suggestBox"
                                                    className="mainSearchBarSuggestionDiv d-flex flex-column align-items-center justify-content-start ms-0"
                                                >
                                                    {Suggestions.length !== 0 ? (
                                                        <>
                                                            {Suggestions?.map((item, i) => {
                                                                return <SuggestSpan name={item} key={i} SubmitSearchRequest={SubmitSearchRequest} />;
                                                            })}
                                                        </>
                                                    ) : (
                                                        <div className="d-flex w-100 align-items-center justify-content-center" style={{ height: "100%" }}>
                                                            <p className="text-danger">No results Found</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </div>

                                    {/* <div className="mainSearchBarMainDiv100">
                                        {location.pathname != "/" ? (
                                            <>
                                                <Form
                                                    method="NONE"
                                                    className="d-flex"
                                                    style={{
                                                        width: "95vw",
                                                        marginLeft: "5px",
                                                        position: "fixed",
                                                        top: "70px",
                                                        // maxWidth: "300px",
                                                        // minWidth: "100px",
                                                        // height: "80%",
                                                        // maxHeight: "50px",
                                                    }}
                                                    onSubmit={(e) => SubmitSearchReques(e)}
                                                >
                                                    <Form.Control
                                                        type="text"
                                                        // className="me-1"
                                                        aria-label="Search"
                                                        style={{
                                                            // width: "80%",
                                                            // maxWidth: "300px",
                                                            // minWidth: "130px",
                                                            borderRadius: "100px 0px 0px 100px",
                                                            height: "38px",
                                                            border: "none",
                                                        }}
                                                        value={inputVal}
                                                        placeholder="Search the web to plant trees..."
                                                        onChange={(e) => onChangeInput(e)}
                                                    />

                                                    <Button
                                                        variant="success "
                                                        className=" d-flex justify-content-center align-items-center"
                                                        style={{
                                                            width: "10%",
                                                            // minWidth: "6px",
                                                            borderRadius: "0px 100px 100px 0px",
                                                            background: "white",
                                                        }}
                                                        type="submit"
                                                    >
                                                        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-black me-1" size="md" />
                                                    </Button>
                                                </Form>
                                            </>
                                        ) : (
                                            <>
                                                <Form
                                                    className="topSearchBar_Form topSearchBar_Form d-flex me-3 ms-3 pe-1 ps-1  align-items-center justify-content-center serch-focus"
                                                    style={{
                                                        width: "80vw",
                                                        height: "100%",
                                                        maxHeight: "200px",
                                                    }}
                                                    onSubmit={(e) => SubmitSearchReques(e)}
                                                >
                                                    <div className="top_searchBar d-flex">
                                                        <Form.Control
                                                            type="text"
                                                            className=" serch-input"
                                                            aria-label="Search"
                                                            placeholder="Search the web to plant trees..."
                                                            value={inputVal}
                                                            onChange={(e) => onChangeInput(e)}
                                                        />

                                                        <Button
                                                            type="submit"
                                                            className="  d-flex justify-content-center align-items-center search-text"
                                                            style={{
                                                                color: "black",
                                                                borderRadius: "0 100px 100px 0",
                                                                backgroundColor: "#fff",
                                                                border: "none",
                                                            }}
                                                        >
                                                            <div className="text-black ">
                                                                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-black me-2" size="lg" />
                                                            </div>
                                                        </Button>
                                                    </div>
                                                </Form>
                                            </>
                                        )}

                                        {SuggestionReady ? (
                                            <div
                                                className="d-flex justify-content-center align-items-center search-bars "
                                                style={{ marginTop: "80px", marginRight: "45px" }}
                                            >
                                                <div
                                                    id="suggestBox"
                                                    className="mainSearchBarSuggestionDiv d-flex flex-column align-items-center justify-content-start ms-0"
                                                >
                                                    {Suggestions.length !== 0 ? (
                                                        <>
                                                            {Suggestions?.map((item, i) => {
                                                                return <SuggestSpan name={item} key={i} SubmitSearchRequest={SubmitSearchRequest} />;
                                                            })}
                                                        </>
                                                    ) : (
                                                        <div className="d-flex w-100 align-items-center justify-content-center" style={{ height: "100%" }}>
                                                            <p className="text-danger">No results Found</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </div> */}
                                </Grid>
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid sx={{ placeItems: "center" }} container>
                                <Grid
                                    item
                                    xs={5}
                                    sx={{
                                        display: "flex",
                                        marginLeft: "auto",
                                    }}
                                >
                                    <Tabs
                                        indicatorColor="secondary"
                                        color="#3FAF04"
                                        textColor="inherit"
                                        value={value}
                                        onChange={(e, val) => setValue(val)}
                                        // sx={{
                                        //     color: "white",
                                        // }}
                                    >
                                        {normalNavs.map((linkInfo) => (
                                            <Tab
                                                sx={{
                                                    fontWeight: "bold",
                                                    fontSize: 14,
                                                    ":hover": {
                                                        color: "#2e7d32",
                                                        opacity: 1,
                                                    },
                                                }}
                                                key={linkInfo.id}
                                                label={linkInfo.navName}
                                                component={Link}
                                                to={linkInfo.navLink}
                                            ></Tab>
                                        ))}

                                        {/* <Tab
                                            aria-controls="tab-menu"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                            sx={{
                                                fontWeight: "bold",
                                                fontSize: 14,

                                                ":hover": {
                                                    color: "#2e7d32",
                                                    opacity: 1,
                                                },
                                            }}
                                            label="More"
                                            icon={<SouthEastIcon fontSize="small"></SouthEastIcon>}
                                            iconPosition="end"
                                        ></Tab> */}
                                    </Tabs>

                                    <Menu id="tab-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                                        {moreNavs.map((linksInfo) => (
                                            <MenuItem sx={{ color: "white" }} key={linksInfo.key} component={Link} to={linksInfo.navLink} onClick={handleClose}>
                                                {linksInfo.navName}
                                            </MenuItem>
                                        ))}
                                        {/* <MenuItem
                                            onClick={() => {
                                                window.open("https://blog.ssebowa.org/", "_blank");
                                                handleClose();
                                            }}
                                        >
                                            Blogs
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                window.open("https://store.ssebowa.org/", "_blank");
                                                handleClose();
                                            }}
                                        >
                                            Stores
                                        </MenuItem> */}
                                    </Menu>
                                </Grid>

                                <Grid item xs={2} sx={{ px: 4 }}>
                                    {/* <Link to="/">
                                        <img
                                            src="https://res.cloudinary.com/dicgvondb/image/upload/v1674668332/ssebowa/ssebowa.org/search-engine-static-frontend/images/logo/logo_jybeu2.png"
                                            alt=""
                                        />
                                    </Link> */}
                                </Grid>

                                <Grid item xs={1} />
                                <Grid item xs={4} className="d-flex justify-content-end">
                                    {/* {location.pathname === "/" ? (
                                        <>
                                            <Button
                                                sx={{ m: 1 }}
                                                onClick={() => {
                                                    window.open("https://blog.ssebowa.org/", "_blank");
                                                    handleClose();
                                                }}
                                                variant="contained"
                                                color="success"
                                                startIcon={<BookIcon />}
                                            >
                                                Blog
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    window.open("https://store.ssebowa.org/", "_blank");
                                                    handleClose();
                                                }}
                                                variant="contained"
                                                color="success"
                                                startIcon={<StoreIcon />}
                                                sx={{ m: 1 }}
                                            >
                                                {" "}
                                                Store
                                            </Button>
                                        </>
                                    ) : (
                                        <Box
                                            style={{ width: "500px" }}
                                            sx={{
                                                display: "flex",

                                                mx: "auto",
                                            }}
                                        >
                                            <SearchBarForNavbar></SearchBarForNavbar>
                                        </Box>
                                    )} */}
                                    {/* <a href="https://blog.ssebowa.org/" target="_blank" rel="noopener noreferrer"></a> */}
                                    {/* <a href="https://blog.ssebowa.org/" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon
                                            icon={faBlog}
                                            className="pt-1 ps-3 "
                                            size="xl"
                                            style={{
                                                color: "#3FAF04",
                                            }}
                                        ></FontAwesomeIcon>
                                    </a> */}
                                    {/* <a href="https://store.ssebowa.org/" target="_blank" rel="noopener noreferrer">
                                        <img style={{ width: "40px" }} src="https://i.ibb.co/mFC48c8/Capture-removebg-preview.png" alt="" />
                                    </a> */}
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default NavBarUpdated;

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
