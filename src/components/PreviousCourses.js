import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';

const css = `
    .prev-course-container{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .term-selector{
        width: 70%;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
    .term-selector > select{
        width: 300px;
    }

    .prev-course-list{
        display:flex;
        flex-direction: column;
        width: 70%;
        overflow-y:auto;
    }

    .prev-course{
        margin-bottom: 5px;
        background-color: #D9D9D9;
        border-radius: 10px;
        padding: 10px;
    }

    .prev-box-row{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

    }

    .prev-box-column{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .prev-box-column > span{
        margin: 2px;
    }
`

function PreviousCourses(props) {
    const navigate = useNavigate();

    const [termList, setTermList] = useState([
        {id: 0, termName: "Fall 2022"},
        {id: 1, termName: "Winter 2023"},
        {id: 2, termName: "Spring 2023"},
        {id: 3, termName: "Fall 2023"},
        {id: 4, termName: "Winter 2024"},
    ]);
    const [term, setTerm] = useState(termList[0]);
    const [listHeight, setListHeight] = useState(window.innerHeight - 242);

    const [prevCourseList, setPrevCourseList] = useState([
        {id:0, termId:0, courseTitle: "Algebra", department: "Mathematics", courseNumber: 65, sectionNumber: 400, crn: 124214, status:"Completed", units: 4, location:"Ecampus", instructor:"Hughes", grade: "B"},
        {id:1, termId:0, courseTitle: "Writing I", department: "English", courseNumber: 100, sectionNumber: 401, crn: 124532, status:"Completed", units: 4, location:"Ecampus", instructor:"Garcia", units: 3, grade: "B"},
        {id:2, termId:0, courseTitle: "Intro to Java", department: "Computer Science", courseNumber: 300, sectionNumber: 400, crn: 124214, status:"Completed", units: 4, location:"Ecampus", instructor:"Jaime", units: 4, grade: "A"},

        {id:4, termId:1, className:"MTH 200", units: 4, grade: "B"},
        {id:5, termId:1, className:"ENG 431", units: 5, grade: "A"},
        {id:6, termId:1, className:"CS 328", units: 3, grade: "B"},
        
        {id:7, termId:2, className:"CS 123", units: 4, grade: "C"},
        {id:8, termId:2, className:"PSY 123", units: 4, grade: "B"},
        {id:9, termId:2, className:"BIO 123", units: 4, grade: "A"},
        {id:10, termId:2, className:"GEO 123", units: 4, grade: "B"},

        {id:11, termId:3, className:"CS 234", units: 4, grade: "A"},
        {id:12, termId:3, className:"CS 444", units: 4, grade: "C"},
        {id:13, termId:3, className:"ENG 344", units: 4, grade: "B"},
        {id:14, termId:3, className:"MTH 345", units: 4, grade: "A"},

        {id:15, termId:4, className:"WR 123", units: 3, grade: "A"},
        {id:16, termId:4, className:"MTH 267", units: 4, grade: "B"},
        {id:17, termId:4, className:"CS 435", units: 4, grade: "C"},
    ])

    useEffect(() => {
        props.setPageTitle("Previous Courses");
      }, []);

    useEffect(() => {
    const handleResize = () => {
        setListHeight(window.innerHeight - 242);
    };
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
    };
    }, []);

    return (
        <div className='prev-course-container'>
            <style>{css}</style>
            <div className='term-selector'>
                    <h2 style={{marginBottom: 0, fontWeight: "normal"}}>Select A Term</h2>
                    <div className='flex-row' style={{width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                        <select onChange={(e) => setTerm(termList[e.target.value])}>
                            {termList.map((item, index)=>{
                                return (
                                <option value={index} selected={term.termName === item.termName}>{item.termName}</option>
                                )
                            })}
                        </select>
                        <button onClick={(e)=>navigate('/ViewAllPreviousCourses')}>View All</button>
                    </div>
                </div>
            <div className='prev-course-list' style={{height: listHeight}}>
                {prevCourseList.filter(course => course.termId == term.id).map((item)=>{
                    return (
                        <div className='prev-course'>
                            <div style={{marginBottom: "10px"}}>
                                <strong>{item.courseTitle+', '+ item.department +' '+ item.courseNumber +', Section '+ item.sectionNumber}</strong>
                            </div>
                            <div className='prev-box-row'>
                                <div className='prev-box-column'>
                                    <span><strong>{"Term: "}</strong>{term.termName}</span>
                                    <span><strong>{"CRN: "}</strong>{item.crn}</span>
                                    <span>
                                        <strong>{"Status: "}</strong>{"**"+item.status+"** "}
                                        <Moment format="MM/DD/YYYY">{item.dateRegistered}</Moment>
                                    </span>
                                    <span><strong>{"Credit Hours: "}</strong>{item.units}</span>
                                </div>
                                <div className='prev-box-column'>
                                    <span><strong>{"Campus: "}</strong>{item.location}</span>
                                    <span><strong>{"Schedule Type: "}</strong>{item.type}</span>
                                    <span>
                                        <strong>{"Start Date: "}</strong>
                                        <Moment format="MM/DD/YYYY">{item.startDate}</Moment>
                                    </span>
                                    <span>
                                        <strong>{"End Date: "}</strong>
                                        <Moment format="MM/DD/YYYY">{item.endDate}</Moment>
                                    </span>
                                </div>
                                <div className='prev-box-column'>
                                    <span><strong>{"Instructor: "}</strong>{item.instructor}</span>
                                    <span><strong>{"Grade: "}</strong>{item.grade}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PreviousCourses
