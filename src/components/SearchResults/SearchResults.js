import React, { useEffect } from "react";
import InfoBoxes from "./InfoBoxes";
import ResultMain, { SearchSuggestions } from "./ResultMain";
import PropTypes from "prop-types";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { BASEURL } from "../../connection/BaseUrl";
import Pagination from "./Pagination";
import Newapi from "./Newapi";
import BotResult from "./BotResult";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Grid } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import SliderImage from "./SliderImage";
import "./Carousel.css";
const styles = {
    container: {
        height: "150px",
        overflowY: "scroll",
        padding: "16px",
        // width: "450px",
    },
};

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { EffectCoverflow } from "swiper";

function SearchResults({ query }) {
    const [search_results, SetSearch_Results] = React.useState([]);
    const [array_search_results, SetArraySearch_Results] = React.useState([]);
    const [Results_State, SetResults_State] = React.useState(false);
    const [Results_Error, SetResults_Error] = React.useState(false);

    const [SsebowaResults, SetSsebowaResults] = React.useState([]);

    const [NewSearch, SetNewSearch] = React.useState([]);

    const [Combine_Results, SetCombineResults] = React.useState([]);

    const [CahtbotResults, SetChatbotResults] = React.useState("");

    const [ImageResult, SetImageResult] = React.useState([]);

    const [currentPage, setcurrentPage] = React.useState(1);
    const [postPerPage, setPostPerPage] = React.useState(5);

    useEffect(() => {
        fetch(`https://chatapi.ssebowa.org/new_search/?keyword=${query}`, {
            method: "post",
        })
            .then((response) => response.json())
            .then((data) => SetNewSearch(data))
            .catch((error) => console.error(error));
    }, [query]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`https://chatapi.ssebowa.org/chatbot/${query}`);
                console.log(response.data);

                SetChatbotResults(response.data.generated_text);
            } catch (error) {}
        }

        fetchData();

        return () => {};
    }, [query]);

    useEffect(() => {
        fetch(`https://chatapi.ssebowa.org/image/?keyword=${query}`, {
            method: "post",
        })
            .then((response) => response.json())
            .then((data) => SetImageResult(data.images))
            .catch((error) => console.error(error));
    }, [query]);

    var zain;
    zain = CahtbotResults.split(`\\`);
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPage = indexOfLastPost - postPerPage;
    const currentPosts = SsebowaResults.slice(indexOfFirstPage, indexOfLastPost);

    const paginate = (pageNumber) => setcurrentPage(pageNumber);

    if (NewSearch) {
        return (
            <div style={{}}>
                <div className="SearchResultsMain">
                    <div className="SearchResultsInnerLeft ">
                        <Card
                            style={{ height: "120px" }}
                            sx={{
                                width: {
                                    lg: "80vw",
                                    md: "90vw",
                                    xs: "90vw",
                                },
                                marginLeft: {
                                    lg: "0",
                                    xs: "15px",
                                },
                            }}
                        >
                            <CardContent>
                                <div style={styles.container}>
                                    {zain.map((res, index) => {
                                        return (
                                            <>
                                                <div key={index}> {res}</div> <br />
                                            </>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {NewSearch && (
                            <div className="result-slider mt-5" style={{ marginY: "10px" }}>
                                <div style={{ margin: "0 -15px" }}>
                                    <Swiper
                                        effect={"coverflow"}
                                        grabCursor={true}
                                        centeredSlides={true}
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        breakpoints={{
                                            300: {
                                                coverflowEffect: {
                                                    stretch: 100,
                                                },
                                            },
                                            700: {
                                                slidesPerView: 3,
                                                coverflowEffect: {
                                                    stretch: -5,
                                                },
                                            },
                                        }}
                                        coverflowEffect={{
                                            rotate: 5,
                                            stretch: 20.5,
                                            depth: 150,
                                            modifier: 3,
                                            slideShadows: false,
                                        }}
                                        pagination={false}
                                        modules={[EffectCoverflow]}
                                        className="mySwiper"
                                    >
                                        {NewSearch?.results?.map((item, i) => {
                                            return (
                                                <SwiperSlide key={i}>
                                                    <ResultMain key={i} data={item} />
                                                </SwiperSlide>
                                            );
                                        })}
                                    </Swiper>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    } else if (!Results_State) {
        return !Results_Error ? (
            <div className="w-100 d-flex align-items-center justify-content-center" style={{ height: "70vh" }}></div>
        ) : (
            <div className="w-100 d-flex align-items-center justify-content-center flex-column" style={{ height: "70vh" }}>
                <h6 className="text-danger fw-bold mb-5"> An Error Occured </h6>
                <button onClick={() => FetchSearchQuery()} type="button" className="btn btn-primary">
                    Retry
                </button>
            </div>
        );
    }
}

export default SearchResults;

SearchResults.propTypes = {
    query: PropTypes.string,
};
