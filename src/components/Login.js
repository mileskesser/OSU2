import React, { useState } from 'react'

const css = `
    .login-container{
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: 1fr 20%;
    }
    .login-footer{
        background: #333 url("https://login.oregonstate.edu/idp/images/treeline.png") repeat-x scroll left bottom;
        border-top: 5px solid #D73F09;
        padding: 10px;
    }
    .login-body{
        padding: 35px 0px;
        background: url("https://login.oregonstate.edu/idp/images/background_sm.jpg") #f5f2ed no-repeat center center /cover;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .login-inputs-box{
        padding: 10px;
        width: 400px;
        height: 200px;
        background-color: white;
    }
    .login-input{

    }

    .login-input > input{
        border-radius: 0px;
    }

    .login-inputs-box > button{
        background-color: #D73F09;
        color: white;
        border-radius: 0px;
        width: 100%;
        font-size: 18pt;
    }

    a:link {
        color: white;
        background-color: transparent;
        text-decoration: underline;
      }
      
      a:visited {
        color: white;
        background-color: transparent;
        text-decoration: underline;
      }
      
      a:hover {
        color: #D73F09;
        background-color: transparent;
        text-decoration: underline;
      }
      
      a:active {
        color: #D73F09;
        background-color: transparent;
        text-decoration: underline;
      }

`

function Login({setIsLoggedIn}) {
    const [username, setUsername] = useState("oregon");
    const [password, setPassword] = useState("oregon")

    //temporary
    const logIn = () =>{
        if(username === 'oregon' && password === 'oregon') {
            setIsLoggedIn(true);
        } else {
            alert('username and password are "oregon"')
        }
    }
    return (
        <div className='login-container'>
            <style>{css}</style>
            <div className='login-body'>
                <div className='login-inputs-box'>
                    <div className='flex-column login-input'>
                        <span>Username</span>
                        <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
                    </div>
                    <div className='flex-column login-input'>
                        <span>Password</span>
                        <input type="password" value={password} onChange={((e)=>setPassword(e.target.value))}></input>
                    </div>
                    <button style={{marginTop: 20}} onClick={(e)=>logIn()}>Log In</button>
                </div>
            </div>
            <div className='login-footer'>
                <span style={{color: "white"}}>If you continue to encounter difficulty, please contact the <a href='https://beav.es/help'>Service Desk</a> for assistance.</span>
            </div>
        </div>
    )
}

export default Login
