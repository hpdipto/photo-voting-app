import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import PollCard from './card.component';


// we will pass 4 polls to render in a row

function CardRow({polls}) {

    return(
        <div className="row">
            <div className="col-lg-3 mb-4">            
                {/*if 1 poll exists*/}
                {0 < polls.length ? 
                    <PollCard pollTitle={polls[0].pollTitle} pollId={polls[0].pollId} startDate={new Date(polls[0].startDate)} endDate={new Date(polls[0].endDate)} /> :
                    null
                }
            </div>
            <div className="col-lg-3 mb-4">                  
                {/*if 2 polls exist*/}
                {1 < polls.length ? 
                    <PollCard pollTitle={polls[1].pollTitle} pollId={polls[1].pollId} startDate={new Date(polls[1].startDate)} endDate={new Date(polls[1].endDate)} /> :
                    null
                }
            </div>
            <div className="col-lg-3 mb-4">
                {/*if 3 polls exist*/}
                {2 < polls.length ? 
                    <PollCard pollTitle={polls[2].pollTitle} pollId={polls[2].pollId} startDate={new Date(polls[2].startDate)} endDate={new Date(polls[2].endDate)} /> :
                    null
                }
            </div>
            <div className="col-lg-3 mb-4">
                {/*if 4 polls exist*/}
                {3 < polls.length ? 
                    <PollCard pollTitle={polls[3].pollTitle} pollId={polls[3].pollId} startDate={new Date(polls[3].startDate)} endDate={new Date(polls[3].endDate)} /> :
                    null
                }
           </div>
        </div>        
    );
}


export default CardRow;