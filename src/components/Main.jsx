import React from 'react';
import TeaCard from './TeaCard';
import { FaPlus } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AddTeaModal from './AddTeaModal';
// import { createContext, useContext } from "react";


const Main = ( {teaArray} ) => {
  // const user = useContext(ListContext);
  const [modalShow, setModalShow] = React.useState(false);
  const [listModal, setListModal] = React.useState(false);
  const [search, setSearch] = React.useState('');
  
  return (
  
    <div className = 'container-fluid py-2 vh-100 d-flex'>
       <div className="d-flex flex-column">
          <div className ="input-group d-flex flex-row justify-content-center">
            <div className="form-outline py-2 mobileSearchBar">
              <input type="search" id="form1" className="form-control" placeholder='Search Tea..' onChange={(e)=>setSearch(e.target.value)} />
              <label className="form-label" htmlFor="form1"></label>
            </div>
            <div className="teaDropDown py-2 px-2">
              <DropdownButton id="dropdown-basic-button" title="Tea Styles">
                <Dropdown.Item href="#/action-1">Green</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Black</Dropdown.Item>
                <Dropdown.Item href="#/action-3">White</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Herbal</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
      <div className ='teaContainer vw-100'>
        <div className="addTeaBtnContainer">
            <div className="addTea d-flex flex-row align-items-center justify-content-center">
              <button className="btn btn-success" onClick={() => setModalShow(true)}><FaPlus/> Add Tea</button>
              {/* <AddTeaModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              /> */}
            </div>
          </div>
          <div className = 'teaCardContainer col-sm col-12 px-2'> 
            {teaArray.filter((input) => {
              if(search === ''){
                return input; 
              } else if (input.name.toLowerCase().includes(search.toLowerCase()) || input.brand.toLowerCase().includes(search.toLowerCase())){
                return input; 
              }}).map((tea) => {
                return <TeaCard name={tea.name} brand={tea.brand} type={tea.type} rating={tea.rating} img={tea.image} />;
              })}  
          </div>
      </div>
      </div>
    </div>
  )
}

export default Main