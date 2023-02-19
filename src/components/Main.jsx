import React from 'react';
import Container from 'react-bootstrap/Container';
import TeaCard from './TeaCard';
import { FaSearch, FaPlus } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import addTeaModal from './AddTeaModal';


const Main = () => {
  return (
    <div className = 'container-fluid py-2 vh-100 d-flex'>
    <addTeaModal/>
       <div className="d-flex flex-column">
          <div className ="input-group d-flex flex-row justify-content-center">
            <div className="form-outline py-2 mobileSearchBar">
              <input type="search" id="form1" class="form-control" placeholder='Search Tea..' />
              <label class="form-label" for="form1"></label>
            </div>
            <div className="teaDropDown py-2 px-2">
              <DropdownButton id="dropdown-basic-button" title="Tea Styles">
                <Dropdown.Item href="#/action-1">Green</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Black</Dropdown.Item>
                <Dropdown.Item href="#/action-3">White</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Herbal</Dropdown.Item>
              </DropdownButton>
            </div>
            {/* <button type="button" class="btn btn-primary">
              <i class="fas fa-search"><FaSearch/></i>
            </button> */}
          </div>
      <div class ='teaContainer vw-100 border border-danger'>
        <div className="addTeaBtnContainer">
            <div className="addTea d-flex flex-row align-items-center justify-content-center">
              <button className="btn btn-success"><FaPlus/> Add Tea</button>
            </div>
          </div>
          <div className = 'teaCardContainer col-sm col-12 border border-danger px-2'> 
              <TeaCard/>
              <TeaCard/>
          </div>
      </div>
      </div>
    </div>
  )
}

export default Main