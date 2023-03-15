import PropTypes from "prop-types";
import { useState } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

const Funfact = ({ data }) => {
    const [didViewCountUp, setDidViewCountUp] = useState(false);

    const onVisibilityChange = (isVisible) => {
        if (isVisible) {
            setDidViewCountUp(true);
        }
    };
    return (
        // <div className="fanfact text-md-left text-center">
        //     <span className="title">
        //         <span className="counter">
        //             <VisibilitySensor>
        //                 <CountUp />
        //             </VisibilitySensor>
        //         </span>
        //         +
        //     </span>
        //     <h6 className="sub-title">{data.title}</h6>
        // </div>
        <div></div>
    );
};

Funfact.propTypes = {
    data: PropTypes.object,
};

export default Funfact;
