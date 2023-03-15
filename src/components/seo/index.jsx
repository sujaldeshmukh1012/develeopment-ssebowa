import PropTypes from "prop-types";
import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title }) => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <meta name="robots" content="index, follow" />
            <meta name="description" content="Hope – Health &amp; Medical React JS Template" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

            <meta
                name="description"
                content="Ssebowa turns your searches to trees, food for hungry children and sanitary  pads for girls without pads. Search now to mitigate climate change and change lives."
            />
        </Helmet>
    );
};

SEO.propTypes = {
    title: PropTypes.string,
};

export default SEO;
