import React, { useState, useEffect } from 'react';


function Test() {

    const [test, setTest] = useState(0);

    const increment = () => {
        setTest(test + 1);
    }

    const handleClick = () => {
        console.log(test);
    }

    return (
        <div>
            <h2>{test}</h2>
            <button onClick={() => {increment(); handleClick();}}>+</button>
        </div>
    );
}

export default Test;