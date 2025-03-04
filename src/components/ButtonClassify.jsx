import React from "react";

const ButtonClassify = () => {
    const choosefile = React.useRef();
    const handleClick = () => {
        
    }
    return (
        <input type="file" id="choosefile" ref={choosefile} />
    );
};

export default ButtonClassify;