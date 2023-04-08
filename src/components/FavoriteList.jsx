import React from 'react';
import { useState, useContext } from "react";
import { ListContext } from '../App';
import { FaMinusCircle } from 'react-icons/fa';

const FavoriteList = ( { selectedtea } ) => {
const { refreshTeaList, currentTeas, list, setList, editMode, setEditMode, userProfile} = useContext(ListContext);
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
            "tea": tea.id
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
                        <div className ='listName' id={listName} onClick = {(e) => addTeaToList(e.target.id, selectedtea)}>
                            {editMode ? <FaMinusCircle style = {{color : 'red'}} onClick = {() => deleteList(listName)}/> : ''} {listName}
                        </div>
                        <div className ='listLength'>
                            {`Saved Teas: ${list[listName].length}`}
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
