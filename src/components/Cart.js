import React, { useState, useEffect  } from 'react'
import { useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSlash, faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

const css = `
    .cart-container{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        
    }

    table{
        margin-top: 30px;
        width: 80%;
        border: solid black 1px;
        border-collapse: collapse;
    }
    th, td{
        border: solid black 1px;
        border-collapse: collapse;
        text-align: center;
        padding: 5px;
    }

    .drop-button{
        color: red;
        cursor: pointer;
    }
    .drop-button:hover{
        text-decoration: underline;
    }

    .cart-icon{
        margin-left: 5px;
        height: 20px;
        width: 20px;
    }
    .cart-icon:hover{
        font-size: 30px;
    }
`


function Cart(props) {
    const navigate = useNavigate();

    const [cartList, setCartList] = useState([
        {id: 0, name: "Primary"},
        {id: 1, name:"Spring 2023"}, 
    ]);

    const [currentCart, setCurrentCart] = useState(cartList[0]); //later will default set to the primary cart id

    useEffect(() => {
        props.setPageTitle("Cart and Current Courses");
      }, []);

    const drop = (c) =>{
        if(window.confirm("Do you want to drop: "+ c.course+": "+c.courseName+"?\nThis can not be undone\n\n")){
            let tempCart = [...props.cart];

            let index = tempCart.indexOf(c);
            if (index > -1) {
                tempCart.splice(index, 1);
                props.setCart(tempCart);
            }
        }
    }

    const submit = () => {
        let tempCart = [...props.cart];

        tempCart.forEach(course => {
            if(course.status == "In Cart"){
                course.status = "Registered";
            }
        });
        props.setCart(tempCart);
    }

    const rename = () => {
        if(currentCart.name === "Primary"){
            alert("Primary cart cannot be renamed")
        }
        else{
            //temporary change, real think will call db based on cart id and rename
            let index = cartList.findIndex((c) => c.id === currentCart.id);    
            let tempCartList = [...cartList]; 
            tempCartList.splice(index, 1);
            
            let tempCart = {id: currentCart.id, name: currentCart.name};
            tempCart.name = prompt("Enter new cart Name");

            tempCartList.push(tempCart);
            setCartList(tempCartList);
            setCurrentCart(tempCart);
        }
    }

    const addNewCart = () =>{
        let id = new Date().getTime();
        let tempCartList = [...cartList];
        let name = prompt("Enter new cart Name\n(Note: this will only be for the currently selected term)");

        if(!name) return;

        let newCart = {id: id, name: name};
        tempCartList.push(newCart);

        setCartList(tempCartList);
        setCurrentCart(newCart);
    }

    const setCurrentCartById = (selectedId) =>{
        //sets the cart being used, this is used in the map to pull the courses that are part of that cart
        let index = cartList.findIndex((c) => c.id === selectedId);
        setCurrentCart(cartList[index]);
    }

    const deleteCart = () =>{
        if(currentCart.name === "Primary"){
            alert("You cannot delete your primary cart.");
        }
        else{
            let confirm = window.confirm("Are you sure you want to delete " + currentCart.name+"? \nWarning: This Cannot Be Undone");
            if(confirm){
                let index = cartList.findIndex((c) => c.id === currentCart.id);    
                let tempCartList = [...cartList]; 
                tempCartList.splice(index, 1);

                setCartList(tempCartList); //i think in the real thing well be calling the db again to pull all carts, rather than doing a temporary fix like this
                setCurrentCart(cartList[0]); //after removing a cart get set back to primary
            }
        }
        
    }

    return (
        <div className='cart-container'>
            <style>{css}</style>            
            <table>
                <caption>
                    <div className='flex-row' style={{justifyContent:"space-between", paddingBottom: 5}}>
                        <div>
                            <select onChange={(e) => setCurrentCartById(parseInt(e.target.value))}>
                                {cartList.map((item)=>{
                                    return (
                                    <option value={item.id} selected={currentCart.id === item.id}>{item.name}</option>
                                    )
                                })}
                            </select>
                            <FontAwesomeIcon onClick={(e) => rename()} className='cart-icon' icon={faPencil} title='Rename Cart'/>
                            <FontAwesomeIcon onClick={(e) => deleteCart()} className='cart-icon' icon={faTrash} title='Delete Cart' />
                            <FontAwesomeIcon onClick={(e) => addNewCart()} className='cart-icon' icon={faPlus} title='Create Cart'/>
                        </div>
                        <div>
                            <input type='number' placeholder='Enter CRN'></input>
                            <button>Add Class</button>
                        </div>
                        <button onClick={(e)=>navigate("/SearchForCourses", {state:{isTermSelected:true}})}>Search For Class</button>
                    </div>
                </caption>
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Units</th>
                        <th>Day/Time</th>
                        <th>Room</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.cart.filter(course => course.cartId == currentCart.id).map((c)=>{
                        return (
                            <tr>
                                <td style={{textAlign: "left"}}>{c.course + ":  "+ c.courseName}</td>
                                <td>{c.units}</td>
                                <td>{c.day}</td>
                                <td>{c.room}</td>
                                <td style={{color: c.status === "Registered"? "green": c.status === "Waitlisted"? "blue": "grey"}}>{c.status}</td>
                                <td>
                                    <span className="drop-button" onClick={(e)=>drop(c)}>
                                        <FontAwesomeIcon icon={faUserSlash} style={{marginRight: "2px"}} />
                                        Drop
                                    </span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div style={{width:'80%', textAlign:'right', paddingTop: 5}}>
                <button onClick={(e)=>submit()}>Submit</button>
            </div>
        </div>
    )
}

export default Cart
