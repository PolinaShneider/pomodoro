import React from "react";

export default({show, children}) => {
    if (!show) {
        return null
    }

    return (
        <div className="technical-div">
            <h2>Statistics...</h2>
            {children}
        </div>
    )
}
