import React from 'react'
import { useNavigate } from 'react-router-dom'

const css =`
    .nav-popup-container{
        background-color: #e0e0e0;
        position: absolute;
        top: 1;
        left: 0;
        min-width: 200px;
        height: calc(100% - 100px);
        border-right: 3px solid #cdcdcd;
    }

    ul{
        list-style-type: none;
        padding-left: 10px;
        padding-right: 10px;
    }
    li{
        padding-bottom: 10px;
    }
    li:hover{
        font-weight: bold;
        cursor: pointer;
    }

    .nav-x-out{
        background-color: #e0e0e0;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 1;
        left: 200px;
        text-align: center;
        border-right: 3px solid #cdcdcd;
        border-bottom: 3px solid #cdcdcd;
    }
    .nav-x-out:hover{
        background-color: #cdcdcd;
    }
`
function NavPopup(props) {
    const navigate = useNavigate();

    return (
        <div className='nav-popup-container'>
            <style>{css}</style>
            <div className="nav-x-out" onClick={(e)=>props.setOpenNav(false)}>X</div>
            <ul>
                {props.navList.map((nav, index)=>{
                    return (
                        <li style={{textDecoration: window.location.pathname == nav.route? "underline":"none"}} onClick={(e)=>{navigate(nav.route); props.setOpenNav(false)}}>
                            {nav.title}
                        </li>
                        )
                    })}
            </ul>
        </div>
    )
}

export default NavPopup
