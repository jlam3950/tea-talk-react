import React,  { useState } from 'react';
import { useContext } from "react";
import { ListContext } from '../App';


const FavoriteList = ({selectedTea}) => {
const { list, setList } = useContext(ListContext);
const [ render, setRender ] = useState('');
const [listNames, setListNames] = React.useState(Object.keys(list));

// const teaList = {
//     'Favorite Teas':[
//         {
//             "name": "British Blend",
//             "brand": "Tetly",
//             "type": "Black",
//             "description": "tea is yum",
//             "rating": 5, 
//         }
//     ],
//     'Least Favorite Teas':[
//         { 
//             "name": "British Brown Blend",
//             "brand": "W/C",
//             "type": "Brown",
//             "description": "tea is NOT yum",
//             "rating": 3, 
//         }
//     ]
//   }

const saveTeaToList = (id, selectedTea) => {
        console.log(selectedTea.name);
        let updatedList = list; 

        list[id].map((tea) => {
            if(tea.name === selectedTea.name){
                setRender('This tea already exists in this list!');
                setTimeout(() => {
                    setRender('');
                },2000);
            } else if (tea.name !== selectedTea.name){
                updatedList[id].push(selectedTea);
                setRender(`${selectedTea.name} was added to ${id}!`); 
                setTimeout(() => {
                    setRender('');
                },2000)
                console.log(list)
                return setList(updatedList)
            }
            // having a bug where a user can add more than one tea to secondary list 
        })
        console.log(list);
    };
 
return (
    <>
    {
        listNames.map((listName) => {
            return <div className ='listName' id={listName } onClick = {(e) => saveTeaToList(e.target.id, selectedTea)}>
                        {listName }
                        <div className ='listLength'>
                            {`Saved Teas: ${list[listName].length}`}
                          
                        </div>
                   </div>
        })
    }
    <div className = 'teaListMsg'>
    {render}
    </div>
    {/* make shift to get page to re-render */}
    </>
      
  )
}

export default FavoriteList