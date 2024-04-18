import React, { useState, useEffect  } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const css=`
    .course-search-container{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .search-header-container{
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .search-body{
        display: grid;
        grid-template-columns: 20vw 1fr;
    }

    .filter-sidebar{
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        border: 1px solid black;
        margin-left: 10px;
        padding-bottom: 5px;
    }

    .filter{
        display: flex;
        flex-direction: column;
        padding: 10px 10px 5px 10px;
    }

    .filter > input{
        background-color:#e0e0e0;
    }
    .filter > select{
        font-size: 14px;
        border-radius: 7px;
    }

    .filter > span{
        font-weight: bold;
        margin-bottom: 5px;
    }

    .search-results{
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y:auto;
        padding: 5px;
    }

    .course-box{
        width: 95%;
        border: solid black 1px;
        margin: 10px 5px;
        border-radius: 10px;
        padding: 10px;
        background-color: #e0e0e0;
    }

    .course-title{
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid grey;
    }

    .course-description{
        padding: 5px;
        margin-bottom: 10px;
        margin-top: 5px;
        border-radius: 7px;
    }

    table{
        width: 100%;
        border: solid black 1px;
        border-collapse: collapse;
        background-color: white;
    }

    th{
        min-width: 40px;
    }

    td{
        text-align: right;
        padding-right: 10px;
        min-width: 40px;
        border: solid black 1px;
        border-collapse: collapse;
    }

    .cart-icon{
        margin-right: 20px;
        font-size: 20px;
        cursor: pointer;
    }

    .add-to-cart{
        text-align: center;
        padding-right: 0px;
        color: #D73F09; 
    }

    .add-to-cart:hover{
        cursor: pointer;
        text-decoration: underline;
        color: white;
        background-color: #D73F09; 
    }

    .question-icon{
        border: 1px solid black;
        border-radius: 10px;
        width: 15px;
        height: 15px;
        text-align: center;
        font-size: 11px;
        font-weight: bold;
        margin-left: 5px;
        background-color: white;
    }
    .question-icon:hover{
        background-color: #e0e0e0;
        cursor: pointer;
    }
`
function CourseSearch(props) {

    const navigate = useNavigate();
    const location = useLocation();

    const isTermSelected = location?.state == null? props.isTermSelected: location.state.isTermSelected;
    
    const [listHeight, setListHeight] = useState(400);
    const [filterBoxHeight, setFilterBoxHeight] = useState(400);

    const [courseList, setCourseList] = useState([
        {id: 0, course: "CS 325", courseName: "Analysis Of Algorithms", category:"Computer Science", units:4, description: "Recurrence relations, combinatorics, recursive algorithms, proofs of correctness."},

        {id: 1, course: "CS 340", courseName: "Introduction To Databases", category:"Computer Science", units:4, description: "Design and implementation of relational databases, including data modeling with ER or UML, diagrams, relational schema, SQL queries, relational algebra, user interfaces, and administration."},

        {id: 2, course: "MTH 065", courseName: "ELEMENTARY ALGEBRA", category:"Math", units:3, description: "Arithmetic of signed numbers, order of operations, simplifying algebraic expressions, solutions of linear equations, and inequalities. Rules of exponents, addition, subtraction, and multiplication of polynomials, factoring, solution of quadratic equations by factoring, reducing rational expressions. Word problems involving linear equations, graphing of linear equations, inequalities."},

        {id: 3, course: "CS 261", courseName: "DATA STRUCTURES", category:"Computer Science", units:4, description: "Abstract data types, dynamic arrays, linked lists, trees and graphs, binary search trees, hash tables, storage management, complexity analysis of data structures."},
    ]);

    const [courseSectionList, setCourseSectionList] = useState([
        {id:0, courseId:0, crn:1234, instructor: "Prof A", sectionNumber: 123, maxSeats: 50, seatsTaken: 6},
        {id:1, courseId:0, crn:1245, instructor: "Prof A", sectionNumber: 124, maxSeats: 50, seatsTaken: 50},
        {id:2, courseId:0, crn:1236, instructor: "Prof B", sectionNumber: 125, maxSeats: 50, seatsTaken: 0},
        {id:3, courseId:0, crn:1247, instructor: "Prof B", sectionNumber: 126, maxSeats: 50, seatsTaken: 0},

        {id:4, courseId:1, crn:4624, instructor: "Prof B", sectionNumber: 344, maxSeats: 50, seatsTaken: 6},
        {id:5, courseId:1, crn:3453, instructor: "Prof B", sectionNumber: 345, maxSeats: 50, seatsTaken: 49},

        {id:6, courseId:2, crn:4662, instructor: "Prof C", sectionNumber: 753, maxSeats: 50, seatsTaken: 59},
        {id:7, courseId:2, crn:2368, instructor: "Prof C", sectionNumber: 754, maxSeats: 50, seatsTaken: 7},
        {id:8, courseId:2, crn:9564, instructor: "Prof A", sectionNumber: 755, maxSeats: 50, seatsTaken: 0},

        {id:9, courseId:3, crn:1234, instructor: "Prof C", sectionNumber: 966, maxSeats: 50, seatsTaken: 6},
        {id:10, courseId:3, crn:1245, instructor: "Prof D", sectionNumber: 967, maxSeats: 50, seatsTaken: 4},
        {id:11, courseId:3, crn:1236, instructor: "Prof D", sectionNumber: 975, maxSeats: 50, seatsTaken: 0},
        {id:12, courseId:3, crn:1247, instructor: "Prof C", sectionNumber: 956, maxSeats: 50, seatsTaken: 0},
    ]);
    const [subjectList, setSubjectList] = useState([
        {name:"Select A Subject", abbreviation:""},
        {name:"Academic Learning Services", abbreviation:"(ALS)"},
        {name:"Accounting", abbreviation:"(ACTG)"},
        {name:"Adult Education & Higher Education Leadership", abbreviation:"(AHE)"},
        {name:"Aeronautical & Astronautical Engineering", abbreviation:"(AAE)"},
        {name:"Aerospace Studies", abbreviation:"(AS)"},
        {name:"Agricultural Education", abbreviation:"(AED)"},
        {name:"Agricultural Sciences", abbreviation:"(AGRI)"},
        {name:"Agriculture-General", abbreviation:"(AG)"},
        {name:"American Sign Language", abbreviation:"(ASL)"},
        {name:"American Studies Program", abbreviation:"(AMS)"},
        {name:"Animal Sciences", abbreviation:"(ANS)"},
        {name:"Anthropology", abbreviation:"(ANTH)"},
        {name:"Applied Economics", abbreviation:"(AEC)"},
        {name:"Applied Journalism", abbreviation:"(AJ)"},
        {name:"Architectural Engineering", abbreviation:"(ARE)"},
        {name:"Art", abbreviation:"(ART)"},
        {name:"Artificial Intelligence", abbreviation:"(AI)"},
    ]);

    const [subject, setSubject] = useState({name:"Select A Subject", abbreviation:""});

    const [searchKeyword, setSearchKeyword] = useState("");
  
    const [courseNum, setCourseNum] = useState("");
    const [instructor, setInstructor] = useState("");
    const [campus, setCampus] = useState("");

    const [termList, setTermList] = useState([
        {id: 0, termName: "Fall 2023", startDate: "Sep 27", lastAdd: "Oct 8", lastDrop: "Oct 8"},
        {id: 1, termName: "Winter 2024", startDate: "Jan 8", lastAdd: "Jan 14", lastDrop: "Jan 14"},
    ]);
    const [term, setTerm] = useState(termList[0]);
    
    const [cartList, setCartList] = useState([
        {id: 0, name: "Primary"},
        {id: 1, name:"Spring 2023"}, 
    ]);


    useEffect(() => {
        props.setPageTitle("Course Search");
        handleResize();
      }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleResize = () => {
        let height = window.innerHeight - 210;
        let filterMaxHeight = document.getElementById('subject').getBoundingClientRect().height * 8; // * how many filters there are, change if more added
        
        setListHeight(height);
        setFilterBoxHeight(height > filterMaxHeight? filterMaxHeight : height);
    };

    const clearFilters = () =>{
        setSearchKeyword("");
        setSubject({id:0, name:"Select A Subject", abbreviation:""});
        setCourseNum("");
        setInstructor("");
        setCampus("");
        
    }


    const addToCart = (section) =>{
        if(window.confirm("Add "+ courseList[section.courseId].course + " "+courseList[section.courseId].courseName+" Section: "+ section.sectionNumber + " to cart?")){
            let tempCart = [...props.cart];

            let course = courseList[section.courseId].course;
            let courseName = courseList[section.courseId].courseName;

            let index = tempCart.findIndex((c) => c.course === course);

            if(index >= 0){
                if(window.confirm(course +" is already in cart, do you want to replace with this section instead?")){
                    //removes the 1 item at index
                    tempCart.splice(index, 1);
                }
                else{
                    return
                }
            }

            let id = props.cart.length;
            let tempClass = {id:id, course: courseList[section.courseId].course, courseName: courseList[section.courseId].courseName, units: courseList[section.courseId].units, day: "TBA", room: "Online", status: "In Cart"}

            tempCart.push(tempClass);
            props.setCart(tempCart);
            alert("Added "+ course + " "+courseName+" Section: "+ section.sectionNumber)
        }
    }

    return (
        <div className='course-search-container' id='course-search-container'>
            <style>{css}</style>
            <div className='search-header-container' id='search-header-container'>
            <div className='flex-row' style={{alignItems: "center", marginLeft: "10px"}}>
                    {(searchKeyword || subject.id || courseNum || instructor || campus) &&
                        <button style={{ paddingLeft: "5px", paddingRight: "5px"}} onClick={(e)=>clearFilters()}>Clear Filters</button>
                    }
                </div>
                
                <FontAwesomeIcon className="cart-icon" onClick={(e)=>navigate("/AddClasses")} icon={faCartShopping} />
                
            </div>

            <div className='search-body'>
            <div className='filter-sidebar' style={{height: filterBoxHeight}}>
                <div className='filter'>
                    <button className='search-button' style={{backgroundColor: (!searchKeyword && !subject.id && !courseNum && !instructor && !campus)? "#e9e9e9": "#D73F09", color: (!searchKeyword && !subject.id && !courseNum && !instructor && !campus)? "black": "white"}}>Search</button>
                </div>

                <div className='filter'>
                    <div className='flex-row' style={{justifyContent:"space-between"}}>
                        <span style={{fontWeight: "bold", marginBottom: "5px"}}>Keyword Search:</span>
                        <div className='question-icon' onClick={(e)=>{alert("You can search by:\n- Course\n- Instructor\n- Course Abbreviation and Number\n- CRN")}}>?
                        </div>
                    </div>
                    
                    <input type='text' value={searchKeyword} onChange={(e)=>setSearchKeyword(e.target.value)} placeholder='Enter COURSE or KEYWORD'></input>
                </div>

                <div className='filter'>
                    <span>Term:</span>
                        <select onChange={(e) => {setTerm(termList[e.target.value])}}>
                            {termList.map((item, index)=>{
                                return (
                                <option value={index} selected={term.id === item.id}>{item.termName}</option>
                                )
                            })}
                        </select>
                    </div>
                <div className='filter'>
                <span>Cart:</span>
                    <select>
                        {cartList.map((item)=>{
                            return (
                            <option value={item.id}>{item.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='filter' id='subject'>
                    <span>Subject:</span>
                    <select onChange={(e) => setSubject(subjectList[e.target.value])}>
                        {subjectList.map((item, index)=>{
                            return (
                            <option value={index} selected={subject.abbreviation === item.abbreviation}>{item.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className='filter'>
                    <span>Number:</span>
                    <input type='text' value={courseNum} onChange={(e)=>setCourseNum(e.target.value.replace(/\D/g, ''))}  placeholder='Enter Number'></input>
                </div>
                <div className='filter'>
                    <span>Instructor:</span>
                    <input type='text' value={instructor} onChange={(e)=>setInstructor(e.target.value)}  placeholder='Enter Instructor'></input>
                </div>
                <div className='filter'>
                    <span>Campus:</span>
                    <input type='text' value={campus} onChange={(e)=>setCampus(e.target.value)}  placeholder='Enter Campus'></input>
                </div>


                </div>

                <div className='search-results' style={{height: listHeight}}>
                    {courseList.map((course) => {
                        return(
                            <div className='course-box'>
                                <div className='course-title'>
                                    <h3>{course.course}</h3>
                                    <h3 style={{marginLeft: "25%"}}>{course.courseName}</h3>
                                </div>

                                <div className='course-description'>
                                    <div style={{width:"100%", marginBottom: '10px'}}>
                                        <span style={{textDecoration:"underline", fontWeight:'bold'}}>Description:</span>
                                        <div style={{marginLeft: '5px', textIndent:"5px"}}>{course.description}</div>
                                    </div>
                                    <div style={{width:"100%", marginLeft: '5px', textIndent:"5px"}}>
                                        <span style={{textDecoration:"underline", fontWeight:'bold'}}>Units:</span>
                                        <div>{course.units}</div>
                                    </div>
                                </div>
                                
                                <table>
                                    <caption style={{textAlign:'left', fontWeight: 'bold'}}>Sections:</caption>
                                    <tr>
                                        <th>CRN</th>
                                        <th>Section Number</th>
                                        <th>Instructor</th>
                                        <th>Max Seats</th>
                                        <th>Current Enrollment</th>
                                        {isTermSelected && <th></th>}
                                    </tr>
                                    {courseSectionList.filter(sect => sect.courseId == course.id).map((section)=>{
                                    return (
                                        <tr>
                                            <td>{section.crn}</td>
                                            <td>{section.sectionNumber}</td>
                                            <td>{section.instructor}</td>
                                            <td>{section.maxSeats}</td>
                                            <td style={{color: section.seatsTaken >= section.maxSeats? "red":""}}>{section.seatsTaken}</td>
                                            {isTermSelected &&
                                                <td className="add-to-cart" onClick={(e)=>addToCart(section)}>
                                                    Add To Cart
                                                </td>
                                            }
                                            
                                        </tr>
                                        )
                                    })}
                                </table>
                                
                            </div>
                        )
                    })}

                </div>
            </div>
            
        </div>
    )
}

export default CourseSearch
