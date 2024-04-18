import React, { useState, useEffect  } from 'react'
import { useNavigate } from 'react-router-dom'


const css = `
    .registration-status-container{
        height: 100%;
        width: 100%;
        overflow: auto;

        display: flex;
        flex-direction: column;
        align-items:  center;
        justify-content: flex-start;
    }

    .registration-status-box{
        width: 80%;
        margin-top: 20px;
        border: 1px solid black;
        padding: 20px 0px;
        
        display: flex;
        flex-direction: column;
        align-items:  center;
    }

    .registration-info{
        width: 90%;
        display: flex;
        flex-direction: column;
        justify-content: center; 
        align-items: center;

        background-color: #e0e0e0;
        font-size: 20px;
    }

    .reg-info-row{
        width: 100%;
        display: grid;
        grid-template-columns: 40% 1fr;
        margin-top: 5px;
        margin-bottom: 10px;
        text-align: center;
    }

    .reg-info-header{
        text-align: right;
        margin-right: 20px;
        font-weight: bold;
    }

    .reg-info-data{
        text-align: left;
    }

    table {
        border: 1px solid black;
        width: 90%;
     }
 
     td {
        text-align: left;
        height: 40px;
        padding: 5px 10px;
     }

    .cart-button{
        background-color: #e0e0e0;
        height: 50px;
        width: 15%;
        border-style: solid;
        border-width: 1px;
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
    }

    .reg-button-container{
        width: 90%;
        text-align: right;
        margin-top: 15px;
    }


    //unsure where these are used???
    .rcorners {
        border-radius: 15px;
        border: 2px solid black;
        min-height: 10px;
        background-color: #e0e0e0;
        font-size: 20px; 
        padding: 10px;
        margin-bottom: 30px;    
      }

    select {
        float: right;
        height: 30px;
        margin-right: 79%;
        margin-top: 4px;
        background-color: #e0e0e0;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    label {
        font-size: 25px;
        margin-left: 30px;
    }
`

function RegistrationStatus(props) {

    const navigate = useNavigate();

    const [term, setTerm] = useState({termName: "Spring 2024"});
    const [registeredCoursesList, setRegisteredCoursesList] = useState(props.cart);
    const [meetingTimesList, setMeetingTimesList] = useState([]);

    const [pageHeight, setPageHeight] = useState(500);

    useEffect(() => {
        props.setPageTitle("Registration Status");
        handleResize();
      }, []);

      useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

      const handleResize = () => {
        setPageHeight(window.innerHeight - 150);
    };

    
    
    
    return (
        <div className='registration-status-container' style={{height: pageHeight}}>
            <style>{css}</style>
            <div className='registration-status-box'>
                <div className='registration-info'>
                    <div className='reg-info-row'>
                        <span className='reg-info-header'>Priority Registration Time:</span>
                        <span className='reg-info-data'>February 11th, 8:00am PST</span>
                    </div>
                    <div className='reg-info-row'>
                        <span className='reg-info-header'>Holds:</span>
                        <span className='reg-info-data'>You currently have no holds on your account</span>
                    </div>
                    <div className='reg-info-row'>
                        <span className='reg-info-header'>Registration Status:</span>
                        <span className='reg-info-data'>Able to register on February 11th at 8:00am</span>
                    </div>
                    <div className='reg-info-row'>
                        <span className='reg-info-header'>Standing:</span>
                        <span className='reg-info-data'>Your class standing for registration purposes is senior</span>
                    </div>
                </div>
                
                <table>
                    <caption style={{textAlign: "left"}}>
                        <h2 style={{marginBottom: "10px"}}>Your Registered Classes for {term.termName}</h2>
                    </caption>
                    {registeredCoursesList.map((item) => {
                        return ( 
                            <tr>
                                <td>{item.course}</td>
                                <td>{item.courseName}</td>
                                <td>
                                    {item.units}
                                </td>
                                <td>{item.day}</td>
                                <td>{item.room}</td>
                            </tr>
                        )
                    })}
                </table>
                
                <div className='reg-button-container'>
                    <button onClick={(e)=>{ navigate("/AddClasses")}} className="cart-button">Edit/View Carts</button>
                </div>
            </div>
            
        </div>

    )
}

export default RegistrationStatus