import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';


import VoteForm from "./dashboard.components/vote.component";
import CreatePoll from "./dashboard.components/create.component";
import DashboardBody from "./dashboard.components/dashboard.component";
import EmptyDashboard from "./dashboard.components/empty.component";


function Dashboard({ loginStatus, setLoginStatus, user, setUser }) {

  const [vote, setVote] = useState(0);
  const [poll, setPoll] = useState(0);
  const [polls, setPolls] = useState([]);
  const history = useHistory();


  useEffect(() => {
    
    if(loginStatus === 0) {
      // unauthorized user tried to access dashboard
      setLoginStatus(3);
      history.push('/');
    }


    // we'll use axios token cancelation because
    // even after redirecting to some different location
    // axios will try to set `polls` value that causes an error
    // source: https://www.youtube.com/watch?v=_TleXX0mxaY
    let source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get('/poll', {
          cancelToken: source.token
        });
        setPolls(response.data);
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


    // after a poll successfully created, unmount create poll component
    if(poll === 2) {
      setPoll(0);
    }


    // clean up function for canceling axios request
    return () => {
      source.cancel();
    }

  }, [loginStatus, setLoginStatus, history, poll, polls]);   // included  values to avoid warning



  const voteForm = () => {
    vote === 1 ? setVote(0) : setVote(1);
    setPoll(0);
  }



  const createPoll = () => {
    poll === 1 ? setPoll(0) : setPoll(1);
    setVote(0);
  }



  const logOut = () => {
    axios.get('/user/logout')
        .then(res => {
          // after successful logout loginStatus become -1
          // also set user object to empty {}
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
      <div className="card card-body">
        <nav className="navbar navbar-light" style={{"backgroundColor": "#e3f2fd"}} >
          <p className="navbar-brand"> Dashboard for {user.name} </p>
          <div className="btn-group">
            <button onClick={voteForm} className="btn btn-outline-primary">Vote</button>
            <button onClick={createPoll} className="btn btn-outline-info">Create</button>
            <button onClick={logOut} className="btn btn-outline-danger">Log Out</button>
          </div>
        </nav>
      </div>

      <br />

      <div>
        {vote ? <VoteForm vote={vote} setVote={setVote} /> : null}
      </div>


      <div>
        {poll ? <CreatePoll loginStatus={loginStatus} setLoginStatus={setLoginStatus} poll={poll} setPoll={setPoll} /> : null}
      </div>


      <div>
        {polls.length ? 
          <DashboardBody loginStatus={loginStatus} setLoginStatus={setLoginStatus} polls={polls} /> : 
          <EmptyDashboard loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
        }
      </div>
    </div>
    
  );
}

export default Dashboard;
