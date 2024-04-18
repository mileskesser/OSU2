import React, { useState, useEffect  } from 'react'
import { useNavigate } from 'react-router-dom'


const css = `
    .home-container{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .info-box{
        border: 1px solid black;
        width: 50%;
        display: grid:
        grid-template-rows: 50% 50%;
        padding: 15px;
    }

    .messages{
        background-color: #e0e0e0;
        width: 50%;
        justify-content: center;
        align-items: flex-start;
        padding: 20px;
    }

    .info-box-buttons{
        justify-content: center;
        align-items: center;
        width: 50%;
        padding: 10px;
    }

    .dates{
        background-color: #e0e0e0;
        justify-content: center;
        align-items: flex-start;
        margin-top: 10px;
        padding: 20px;
    }
`

function Home(props) {
    const navigate = useNavigate();

    const [termList, setTermList] = useState([
        {id: 0, termName: "Fall 2023", startDate: "Sep 27", lastAdd: "Oct 8", lastDrop: "Oct 8"},
        {id: 1, termName: "Winter 2024", startDate: "Jan 8", lastAdd: "Jan 14", lastDrop: "Jan 14"},
    ]);
    const [term, setTerm] = useState(termList[0]);

    const setOpenNav = props.setOpenNav;
    useEffect(() => {
        props.setPageTitle("Home");
        props.setOpenNav(true);
      }, []);

    return (
        <div className='home-container'>
            <style>{css}</style>
            {/* width calc(50% + 30px) is to account for additional 30px padding of info box*/}
            <div className='flex-row' style={{width:"calc(50% + 30px)", alignItems:"center", justifyContent:"flex-start", marginBottom: 5}}>
                <h1 style={{margin: 0, marginRight:5}}>Select A Term: </h1>
                <select onChange={(e) => setTerm(termList[e.target.value])}>
                    {termList.map((item, index)=>{
                        return (
                        <option value={index} selected={term.termName === item.termName}>{item.termName}</option>
                        )
                    })}
                </select>
            </div>
            <div className='info-box'>
                <div className='flex-row'>
                    <div className='messages flex-column'>
                        <h3 style={{margin: 0, marginBottom: 10}}>Messages</h3>
                        <span style={{textDecorationLine:"underline", marginBottom:5}}>View Priority Registration Time</span>
                        <span style={{textDecorationLine:"underline"}}>View Holds</span>
                    </div>
                    
                    <div className='info-box-buttons flex-column'>
                        <button style={{marginBottom: 10}} onClick={(e)=>{setOpenNav(false); navigate("/ViewRegistrationStatus" )}}>View Registration Status</button>
                        <button onClick={(e)=>{ setOpenNav(false); navigate("/AddClasses")}}>Add Courses</button>
                    </div>
                </div>
                <div className='dates flex-column'>
                    <h3 style={{margin: 0, marginBottom: 10}}>Important Term Dates</h3>
                    <span style={{marginBottom:5}}>Start of Term: <strong>{term.startDate}</strong></span>
                    <span style={{marginBottom:5}}>Last Day to Add A Course: <strong>{term.lastAdd}</strong></span>
                    <span>Last Day to Drop A Course (100% Tuition Refund): <strong>{term.lastDrop}</strong></span>
                </div>
            </div>
        </div>
    )
}

export default Home
