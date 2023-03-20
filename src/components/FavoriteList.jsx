import React from 'react';
import { useState } from "react";
import { ListContext } from '../App';
import { FaMinusCircle } from 'react-icons/fa';

const FavoriteList = ( { selectedtea } ) => {
const { refreshTeaList, currentTeas, list, setList, editMode, setEditMode, userProfile} = React.useContext(ListContext);
const [ render, setRender ] = useState('');
// const [listNames, setListNames] = useState(Object.keys(list));
// let updatedList = list;  replaced this variable /w list on lines 14,19

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
    // needs to update list
    // setList('fun times!');
    // console.log(list);
    setRender('');
    refreshTeaList(userProfile._id)
}

const addTeaToList = async (name, tea) =>  {
    if(editMode){
        return;
    }

    const id = userProfile._id; 
    const url = `http://localhost:5100/users/${id}/tealists`; 
    const res = fetch(url, {
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
    // const data = await res.json();
    // console.log(data);
    // not sure why this isn't working. need to check to see if there are duplicate tea that already exists in the list.
    // also need to see list size from backend

    // getUser(id);
    refreshTeaList(userProfile._id)
    setRender(`${tea.name} was added to ${name}!`); 
    setTimeout(() => {
        setRender('');
    },2000);
    refreshTeaList(userProfile._id)

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
