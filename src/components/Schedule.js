import React, { useState, useEffect  } from 'react'
import { useNavigate } from 'react-router-dom';



const css =`

.schedule-container {
    width: calc(100% - 20px);
    height: 100%;

    padding: 0px 10px;
    display: grid;
    grid-template-columns: 15vw 1fr;
    gap: 10px;
    
    font-family: Arial, sans-serif;
    overflow: auto;
}

.schedule-sidebar {
    margin-top: 20px;
}

.checkbox-list {
    background-color: #f9f9f9;
    border: 1px solid #ccc;

    list-style: none;
    padding: 5px;
    margin: 0;
}

.checkbox-list li {
    margin: 10px 0;
}

.schedule-main {
    border-collapse: collapse;
    margin-top: 20px;
    width: 100%;
}

.schedule-main th, 
.schedule-main td {
    border: 1px solid black;
    padding: 10px;
    text-align: center;
    min-width: 10%;
}


.schedule-main th {
    background-color: #e0e0e0;
}

.class-session {
    margin-bottom: 15px;
    padding: 10px;
    background-color: #f0f0f0; /* Light shade for the box */
    border: 1px solid #ddd; /* Slight border for definition */
    border-radius: 5px; /* Optional: rounded corners */
  }`

const Schedule = (props) => {
    const navigate = useNavigate();
    const [pageHeight, setPageHeight] = useState(500);

    const schedule = {
        'Sunday': [],
        'Monday': [{ time: '7am - 10am', name: 'CS 463', room: '100', campus: 'Ecampus', instructor: 'K. Winters', units: '2' }],

        'Tuesday': [
            { time: '7am - 10:30am', name: 'HORT 331', room: '101', campus: 'Ecampus', instructor: 'L. Hooven', units: '4' },
            { time: '11am - 1pm', name: 'HORT 331', room: '101', campus: 'Ecampus', instructor: 'L. Hooven', units: '4' }
        ],
        'Wednesday': [{ time: '7am - 10am', name: 'PSY 201', room: '102', campus: 'Corvallis : MLM - Milam Hall 236', instructor: 'J. Cavalli', units: '4' }],
        'Thursday': [
            { time: '9am - 10:30am', name: 'BA 213', room: '103', campus: 'Corvallis : RICH - Richardson Hall 243', instructor: 'J. Henry', units: '4' },
            { time: '2pm - 3:30pm', name: 'BA 213', room: '103', campus: 'Corvallis : RICH - Richardson Hall 243', instructor: 'J. Henry', units: '4' }
        ],
        'Friday': [{ time: '11am - 1pm', name: 'CH 130', room: '104', campus: 'N/A', instructor: 'S. Flores', units: '4' }],
        'Saturday': []
      };



  useEffect(() => {
    props.setPageTitle("Schedule");
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

    // cool helper that counts total minutes since midnight 
    function timeStringToMinutes(timeString) {
        const [time, modifier] = timeString.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (hours === 12) hours = 0; 
        if (modifier === 'PM') hours += 12;
        return hours * 60 + minutes;
    }

    function sortByTime(a, b) {
        return timeStringToMinutes(a.time) - timeStringToMinutes(b.time);
    }


    return (


    <div className="schedule-container" style={{height: pageHeight}}>
        <style>{css}</style>
        <div className="schedule-sidebar">
            <ul className="checkbox-list">
                <li><input type="checkbox" id="campus" /><label htmlFor="campus">Campus</label></li>
                <li><input type="checkbox" id="building" /><label htmlFor="building">Building</label></li>
                <li><input type="checkbox" id="room" /><label htmlFor="room">Room #</label></li>
                <li><input type="checkbox" id="instructor" /><label htmlFor="room">Instructor</label></li>
                <li><input type="checkbox" id="room" /><label htmlFor="units">Units</label></li>
                <li><input type="checkbox" id="room" /><label htmlFor="room">24-hour time</label></li>
                <li><input type="checkbox" id="room" /><label htmlFor="room">Include courses with no meeting</label></li>

            </ul>
        </div>
        <div>
            <table className="schedule-main">
                <thead>
                    <tr>

                    <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>

                    </tr>
                </thead>
                <tbody>
                <tr>
                    {Object.keys(schedule).map(day => {
                    let daySchedule = schedule[day].length > 0 
                        ? [...schedule[day]].sort(sortByTime) : [];

                    return (
                        <td key={day} style={{ verticalAlign: 'top' }}>
                        {daySchedule.map((session, index) => (
                            <div key={index} className="class-session">
                            <p style={{ textAlign: 'left' }}><strong>Name:</strong> {session.name}</p>
                            <p style={{ textAlign: 'left' }}><strong>Time:</strong> {session.time}</p>
                            <p style={{ textAlign: 'left' }}><strong>Room:</strong> {session.room}</p>
                            <p style={{ textAlign: 'left' }}><strong>Campus:</strong> {session.campus}</p>
                            <p style={{ textAlign: 'left' }}><strong>Instructor:</strong> {session.instructor}</p>
                            <p style={{ textAlign: 'left' }}><strong>Units:</strong> {session.units}</p>
                            </div>
                        ))}
                        </td>
                    );
                    })}
                </tr>
                </tbody>

            </table>
        </div>
    </div>
);
};

export default Schedule;