import React from 'react';
import { ImageGroup, Image } from 'react-fullscreen-image';

import "../styles/imageViewer.css";

// loading proxy from package.json
import proxy from '.././package.json';


function ImageViewer({ images }) {

    return (
        <div className="container">
          <ImageGroup>
            <ul className="images">
              {images.map(i => (
                <li key={i}>
                    {/*imagePath is store as /public/img/abcdefghijklmonp...
                    but we need /img/abcdefghijklmonp... so the path here*/}
                    <Image src={proxy.proxy+i.slice(6)} alt="mountains" />
                </li>
              ))}
            </ul>
          </ImageGroup>
        </div>
  )
}

export default ImageViewer;