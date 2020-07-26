import React from "react";

import 'bootstrap/dist/css/bootstrap.css';

import ImageCard from "./image.component";

function ImageRow({ imageList }) {

    return (
        <div className="row">
            <div className="col-lg-4 mb-4">
                {0 < imageList.length ? <ImageCard imagePath={imageList[0]}/> : null}
            </div>
            <div className="col-lg-4 mb-4">
                {1 < imageList.length ? <ImageCard imagePath={imageList[1]}/> : null}
            </div>
            <div className="col-lg-4 mb-4">
                {2 < imageList.length ? <ImageCard imagePath={imageList[2]}/> : null}
            </div>
        </div>
    );
}

export default ImageRow;