import React, { useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';


function ImageCard({ imagePath }) {

    // need to change it
    const proxy = 'http://localhost:5000';

    return (
        <div>
            <img className="card-img" src={imagePath.slice(6)} />
        </div>
    );
}

export default ImageCard;