import React from 'react';
import { SunspotLoader } from "react-awesome-loaders";

const Loading = () => {
    return (
        <div className="loading">
            <SunspotLoader
              gradientColors={["#db202c", "##e50914"]}
              shadowColor={"#e7e7e7"}
              desktopSize={"128px"}
              mobileSize={"100px"}
            />
        </div>
    )
}

export default Loading;
