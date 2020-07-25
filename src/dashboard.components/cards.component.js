import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import PollCard from './card.component';


// we will pass 4 polls to render in a row

function CardRow({polls}) {

    return(
        <div>
            <div className="card-deck">
                {/*if 1 poll exists*/}
                {0 < polls.length ? 
                    <PollCard pollTitle={polls[0].pollTitle} pollId={polls[0].pollId} startDate={polls[0].startDate} endDate={polls[0].endDate} /> :
                    null
                }
                {/*if 2 polls exist*/}
                {1 < polls.length ? 
                    <PollCard pollTitle={polls[1].pollTitle} pollId={polls[1].pollId} startDate={polls[1].startDate} endDate={polls[1].endDate} /> :
                    null
                }
                {/*if 3 polls exist*/}
                {2 < polls.length ? 
                    <PollCard pollTitle={polls[2].pollTitle} pollId={polls[2].pollId} startDate={polls[2].startDate} endDate={polls[2].endDate} /> :
                    null
                }
                {/*if 4 polls exist*/}
                {3 < polls.length ? 
                    <PollCard pollTitle={polls[3].pollTitle} pollId={polls[3].pollId} startDate={polls[3].startDate} endDate={polls[3].endDate} /> :
                    null
                }
            </div>
            <br />
        </div>
    );
}


export default CardRow;