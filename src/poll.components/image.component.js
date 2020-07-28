import React, { useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';

// loading proxy from package.json
import proxy from '.././package.json';


function ImageCard({ imagePath }) {

    return (
        <div>
            {/*imagePath is store as /public/img/abcdefghijklmonp...
            but we need /img/abcdefghijklmonp... so the path here*/}
            <img className="img-fluid" src={proxy.proxy+imagePath.slice(6)} />
        </div>
    );
}

export default ImageCard;