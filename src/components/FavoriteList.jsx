import React from 'react';
import { useState, useContext } from "react";
import { ListContext } from '../App';
import { FaMinusCircle } from 'react-icons/fa';

const FavoriteList = ( { selectedtea } ) => {
const { refreshTeaList, list, editMode, userProfile} = useContext(ListContext);
const [ render, setRender ] = useState('');

const deleteList = async (name) => {
    const id = userProfile._id; 
    const url = `http://localhost:5100/users/${id}/tealists`; 
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
         'content-type': 'application/json',
        },
        body: JSON.stringify({
         "action": "delete list",
         "payload":{
            "listName": name, 
         }
        })
      })

    const data = await res.json(); 
    console.log(data);
    setRender('');
    refreshTeaList(userProfile._id);
}

const addTeaToList = async (name, tea) =>  {
    if(editMode){
        return;
    }

    const id = userProfile._id; 
    const url = `http://localhost:5100/users/${id}/tealists`; 
    const res = await fetch(url, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            "action": "add tea",
            "payload":{
            "listName": name,
            "tea": tea._id
            }
        })
    })
    const data = await res.json();
    refreshTeaList(userProfile._id);
    if (res.ok){
        setRender(`${tea.name} was added to ${name}!`); 
    } else {setRender(`${data.message}`)}
    setTimeout(() => {
        setRender('');
    },2000);
    refreshTeaList(userProfile._id);
}

return (
    <>
    {
        Object.keys(list).map((listName, i) => {
            return <div key = {i} className ='listNameContainer'>
                        <div className ='listName d-flex justify-content-between'>
                            <div className = 'd-flex flex-column col-12' id={listName} onClick = {(e) => addTeaToList(e.target.id, selectedtea)}>
                                {listName} 
                                <div className ='listLength mt-1'>
                                    {`Saved Teas: ${list[listName].length}`}
                                </div>
                            </div>
                            { editMode ? <><div className ='mx-2'></div> <button className ='btn btn-danger' style = {{'fontSize': '.5em'}}> Delete </button></> : '' }
                            {/* {editMode ? <FaMinusCircle style = {{color : 'red'}} onClick = {() => deleteList(listName)}/> : ''} {listName} */}
                       </div>
                   </div>
                        
        })
    }
    <div className = 'teaListMsg'>
        {render}
    </div>
    </>
      
  )
}

export default FavoriteList
