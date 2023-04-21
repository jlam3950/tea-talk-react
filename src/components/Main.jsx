import React from 'react';
import { useState, useContext } from 'react';
import TeaCard from './TeaCard';
import { FaPlus } from 'react-icons/fa';
import TeaForm from './TeaForm';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Pagination from 'react-bootstrap/Pagination';
import { ListContext } from '../App';


const Main = ( {teaArray} ) => {
  const { currentTeas, setCurrentTeas } = useContext(ListContext);
  const [modalShow, setModalShow] = useState(false);
  const [listModal, setListModal] = useState(false);
  const [search, setSearch] = useState('');
  
  return (
  
    <div className = 'container-fluid py-2 d-flex'>
       <div className="d-flex flex-column">
          <div className ="input-group d-flex flex-row justify-content-center">
            <div className="form-outline py-2 mobileSearchBar">
            {/* disabled search bar for now */}
              {/* <input type="search" id="form1" className="form-control" placeholder='Search Tea..' onChange={(e)=>setSearch(e.target.value)} /> */}
              <label className="form-label" htmlFor="form1"></label>
            </div>
            <div className="teaDropDown py-2 px-2">
             <Pagination>  
                <Pagination.Item>Popular</Pagination.Item>  
                {/* <Pagination.Item active>Black</Pagination.Item>   */}
                <Pagination.Item>Black</Pagination.Item>  
                <Pagination.Item>Green</Pagination.Item>  
                <Pagination.Item>Herbal</Pagination.Item>  
                <Pagination.Item>Decaf</Pagination.Item>  
              </Pagination>
            </div>
          </div>
      <div className ='teaContainer vw-100'>
        <div className="addTeaBtnContainer">
            <div className="addTea">
              <button className="btn btn-success addTeaBtn" onClick={() => setModalShow(true)}><FaPlus/> Add Tea</button>
              <TeaForm
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </div>
          </div>
          <div className = 'teaCardContainer col-sm col-10'> 
            {currentTeas.filter((input) => {
              if(search === ''){
                return input; 
              } else if (input.name.toLowerCase().includes(search.toLowerCase()) || input.brand.toLowerCase().includes(search.toLowerCase())){
                return input; 
              }}).map((tea, i) => {
                return <TeaCard name={tea.name} brand={tea.brand} type={tea.type} rating={tea.rating} img={tea.imageURL} id = {tea._id} key ={i} />;
              })}  
          </div>
      </div>
      </div>
    </div>
  )
}

export default Main