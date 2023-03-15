import React, { useState, useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { EffectCoverflow } from "swiper";

import List from "@mui/material/List";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

function SearchResultsVideos({ query }) {

    const [videoUrls, setVideoUrls] = useState([]);

    const sliderRef = useRef(null);

    const handlePrev = React.useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = React.useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);


    useEffect(() => {
        fetch(`https://chatapi.ssebowa.org/get_video?keyword=${query}`, {
            method: "post",
        })
            .then((response) => response.json())
            .then((data) => setVideoUrls(data.video))
            .catch((error) => console.error(error));
    }, [query]);


    return (
        <div className="mt-4 px-2 px-lg-3">
            <div className="position-relative">
                {videoUrls && (

                    <Swiper
                        ref={sliderRef}
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
                        {videoUrls.map((videoInfo, index) => (
                            <SwiperSlide key={index}>
                                {" "}
                                <Card
                                    key={index}
                                    className="result-video-card"
                                >
                                    <a href={videoInfo.link} style={{ textDecoration: "none" }}>
                                        <CardMedia component="img" image={videoInfo.tump_img} className="video-ele"
                                                   sx={{ width: "200px", p: 1 }} />
                                    </a>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",

                                            width: "100%",
                                        }}
                                    >
                                        <CardContent
                                            sx={{
                                                flex: "flex",
                                                textAlign: "left",
                                            }}
                                        >
                                            <a href={videoInfo.link} style={{ textDecoration: "none" }}>
                                                <Typography component="div" variant="h5" sx={{ color: "blue" }}>
                                                    {videoInfo.title}
                                                </Typography>
                                            </a>
                                            <Typography component="h6" variant="h6" sx={{ color: "text.secondary" }}>
                                                {videoInfo.channel_name}
                                            </Typography>

                                            <Typography component="span" variant="h6">
                                                {videoInfo.video_platform}
                                                <span> </span>
                                            </Typography>
                                            <Typography component="span" variant="small" sx={{ color: "info.main" }}>
                                                <span> </span> {videoInfo.date}
                                            </Typography>
                                            <Typography component="div" variant="h6" sx={{ color: "text.secondary" }}>
                                                <span>views:</span> {videoInfo.views}
                                            </Typography>
                                        </CardContent>
                                        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                                            <Typography></Typography>
                                        </Box>
                                    </Box>
                                </Card>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
                <button className="prev-arrow" onClick={handlePrev} >
                    <FontAwesomeIcon icon={faCaretLeft} className={`icon`} />
                </button>
                <button className="next-arrow" onClick={handleNext} >
                    <FontAwesomeIcon icon={faCaretRight} className={`icon`} />
                </button>
            </div>
        </div>
    );
}

export default SearchResultsVideos;
