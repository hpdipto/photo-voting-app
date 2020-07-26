import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';


function ImageCard({ imagePath }) {

    return (
        <div>
            <img className="card-img" src={imagePath} />
        </div>
    );
}

export default Image;