import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';

import OpenPoll from './vote.components/open.component';


function Vote({ loginStatus, setLoginStatus, user, setUser }) {

  let urlId = useLocation().pathname.slice(useLocation().pathname.lastIndexOf("/")+1);

  const [poll, setPoll] = useState({});
  const [votes, setVotes] = useState([]);
  const [reset, setReset] = useState(false);
  const [votesLeft, setVotesLeft] = useState(0);

  const [maxVoteLimit, setMaxVoteLimit] = useState(0);
  const [imageListLength, setImageListLength] = useState(0);

  const history = useHistory();

  const pollId = urlId;


  useEffect(() => {
    
    if(loginStatus === 0) {
      // unauthorized user tried to access poll
      setLoginStatus(3);
      history.push('/');
    }


    // we'll use axios token cancelation because
    // even after redirecting to some different location
    // axios will try to set `response` value that causes an error
    // source: https://www.youtube.com/watch?v=_TleXX0mxaY
    let source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/vote/poll/${pollId}`, {
          cancelToken: source.token
        });
        setPoll(response.data);
        // array initialization with 0s: https://stackoverflow.com/a/34104348/9481106
        setVotes(Array(response.data.imageList.length).fill(0));
        setVotesLeft(response.data.maxVoteLimit);
        setMaxVoteLimit (response.data.maxVoteLimit);
        setImageListLength(response.data.imageList.length);
      }
      catch (error) {
        if(axios.isCancel(error)) {
          // console.log('caught cancel');
        }
        else {
          throw error;
        }
      }
      
    }

    fetchData();


    // if user reset given votes
    // this option is updated in open.component.js
    if(reset) {
      setReset(false);
      setVotesLeft(maxVoteLimit);
      setVotes(Array(imageListLength));
    }



    // clean up function for canceling axios request
    return () => {
      source.cancel();
    }

  }, [history, pollId, loginStatus, setLoginStatus, reset, setReset, maxVoteLimit, imageListLength]);   // included  values to avoid warning



  const dashboard = () => {
    history.push("/dashboard");
  }



  const logOut = () => {
    axios.get('/api/user/logout')
        .then(res => {
          // after successful logout loginStatus become -1
          // empty the user data
          setLoginStatus(-1);
          setUser({});
          history.push('/');
        })
        .catch(err => {
          console.log(err)
        });
  }


  return (

    <div className="container">
        {/*nav bar*/}
        <div className="card card-body mb-4" style={{backgroundColor: "transparent"}}>
          <nav className="navbar navbar-light" style={{"backgroundColor": "#e3f2fd"}} >
            <h4 className="navbar-brand">{poll.pollTitle}</h4> 
            <div className="btn-group">
              <button onClick={dashboard} className="btn btn-outline-primary">Dashboard</button>
              <button onClick={logOut} className="btn btn-outline-danger">Log Out</button>
            </div>
          </nav>
        </div>

        <div className="content-body mb-4">
          <OpenPoll loginStatus={loginStatus} setLoginStatus={setLoginStatus}
                    poll={poll} imageList={poll.imageList} 
                    votes={votes} setVotes={setVotes}
                    reset={reset} setReset={setReset}
                    votesLeft={votesLeft} setVotesLeft={setVotesLeft} />
        </div>

        <footer>
          <div className="card card-body" style={{backgroundColor: "transparent"}}>
            <div className="navbar navbar-light" style={{"backgroundColor": "#e3f2fd"}}>
              <div>
                <p>© 2020 Copyright: Haris Development</p>
              </div>
              <div>
                <button className="btn btn-link btn-lg" type="button"><i className="fa fa-facebook-f"></i></button>
                <button className="btn btn-link btn-lg" type="button"><i className="fa fa-twitter"></i></button>
                <button className="btn btn-link btn-lg" type="button"><i className="fa fa-linkedin"></i></button>
                <button className="btn btn-link btn-lg" type="button"><i className="fa fa-instagram"></i></button>
              </div>
            </div>
          </div>
        </footer>
    </div>
    
  );
}

export default Vote;
