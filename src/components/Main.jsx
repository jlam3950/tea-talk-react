import React from 'react';
import { useState, useContext, useEffect } from 'react';
import TeaCard from './TeaCard';
import { FaPlus } from 'react-icons/fa';
import TeaForm from './TeaForm';
import Pagination from 'react-bootstrap/Pagination';
import { ListContext } from '../App';

const Main = ( {teaArray} ) => {
  const { currentTeas, userProfile, isDarkMode, setDarkMode, toggleDarkMode } = useContext(ListContext);
  const [modalShow, setModalShow] = useState(false);
  const [search, setSearch] = useState('');
  const [loadFlag, setLoadFlag] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoadFlag(true);
      console.log(loadFlag)
    }, 1000)
  }, [])
  
  return (
  
    <div className = 'container-fluid py-2 d-flex' style = {isDarkMode? {}: {backgroundColor: 'black', color: 'white'}}>
       <div className="d-flex flex-column">
          <div className ="input-group d-flex flex-row justify-content-center">
            <div className="form-outline py-2 mobileSearchBar">
            {/* disabled search bar for now */}
              {/* <input type="search" id="form1" className="form-control" placeholder='Search Tea..' onChange={(e)=>setSearch(e.target.value)} /> */}
              <label className="form-label" htmlFor="form1"></label>
            </div>
            
            <div className="teaDropDown py-2 px-2">
             <Pagination>  
                {/* <Pagination.Item active>Black</Pagination.Item>   */}
                <Pagination.Item>
                  <div style = {{color: 'black'}}>
                    Popular
                  </div>
                </Pagination.Item>  
                <Pagination.Item>
                  <div style ={{color: 'black'}}>
                    Black
                  </div>
                </Pagination.Item>  
                <Pagination.Item>
                  <div style ={{color: 'black'}}>
                    Green
                  </div>
                </Pagination.Item>  
                <Pagination.Item>
                  <div style ={{color: 'black'}}>
                    Herbal
                  </div>
                </Pagination.Item>  
              <div className="addTea mx-4">
                <button className="btn btn-success" style = {{zIndex : '1'}} onClick={() => setModalShow(true)}><FaPlus/> Add Tea</button>
                <TeaForm
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
              </Pagination>
              <div className="add-tea-mobile">
                <button className="btn btn-success" style = {{zIndex : '1'}} onClick={() => setModalShow(true)}><FaPlus/> Add Tea</button>
                <TeaForm
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
            </div>
            
          </div>
      <div className ='teaContainer vw-100'>
          <div className = {loadFlag ? 'teaCardContainer col-sm col-10' : 'teaCardContainerLoading'} 
               style = {isDarkMode? {marginBottom: '5em'}: {backgroundColor: 'rgb(51, 51, 51)', marginBottom: '5em', border: 'black'}}
          > {
            loadFlag ? 
            currentTeas.filter((input) => {
              if(search === ''){
                return input; 
              } else if (input.name.toLowerCase().includes(search.toLowerCase()) || input.brand.toLowerCase().includes(search.toLowerCase())){
                return input; 
              }}).map((tea, i) => {
                return <TeaCard tea={tea} key ={i} />;
              })  : 
              <div className = 'vh-100 d-flex justify-content-center'
                style = {isDarkMode? {}: {backgroundColor: 'black'}}>
                <span className="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
              </div>
          }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main