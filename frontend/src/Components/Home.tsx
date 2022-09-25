import * as React from 'react';
import {useEffect, useState} from 'react';
import axios from "axios";
import Card from './Card';
import AddInterview from './AddInterview';
import '../App.css';

export default function Home() {
  const [interviews, setInterviews] = useState([]);
  const [ modalOpen, setModalOpen ] = useState(-1);

  const getData = () => {
    if(modalOpen !== 0 && modalOpen !== -1){
      return interviews[modalOpen];
    }
    return {};
  }

  useEffect(()=>{
    axios.get("http://localhost:8000/get-interviews/")
    .then((res) => {
      setInterviews(res.data.data);
    });
  }, []);

  return (
    <div className='wrapper'>
      <div className='header-wrapper'>
        <h2>List of interviews</h2>
        <div className='add-interview-button-wrapper'>
          <button className='add-interview-button' onClick={()=> setModalOpen(0)} style={{cursor: 'pointer'}}>Add Interviews</button>
        </div>
      </div>
      {
        modalOpen !== -1 && <AddInterview data={getData()} />
      }
      {
        modalOpen === -1 && interviews.map((i: any)=> <Card {...i} setModalOpen={setModalOpen} />)
      }
    </div>
  );
}