import React from 'react';
import { useState, useContext, useEffect } from 'react';
import TeaCard from './TeaCard';
import { FaPlus } from 'react-icons/fa';
import TeaForm from './TeaForm';
import Pagination from 'react-bootstrap/Pagination';
import { ListContext } from '../App';

const Main = ( {teaArray} ) => {
  const { currentTeas, userProfile, isDarkMode, setDarkMode, toggleDarkMode, setAlertFlag, setAlertInfo } = useContext(ListContext);
  const [modalShow, setModalShow] = useState(false);
  const [search, setSearch] = useState('');
  const [loadFlag, setLoadFlag] = useState(false);
  const [tea, setTea] = useState('default');
  const [teaFlag, setTeaFlag] = useState(false);

  const setType = (teaType) => {
    setTea(teaType); 
    setLoadFlag(false)
        setTimeout(() => {
          setLoadFlag(true);
          displayTeas(tea)
        }, 1000)
  }

  // const teaFilter = (type) => {
  //   return currentTeas.filter((tea) => {
  //     console.log(tea.type)
  //     if(tea.type === type){
  //       return tea;
  //     }}).map((tea,i) => {
  //       console.log(tea)
  //       return <TeaCard tea = {tea} key = {i} />
  //     })
  // }

  const displayTeas = (tea) => {
    switch(tea){
      case 'Black':
        return currentTeas.filter((tea) => {
          if(tea.type === 'Black'){
            return tea;
          }}).map((tea,i) => {
            return <TeaCard tea = {tea} key = {i} />
          })
      case 'Green':
        return currentTeas.filter((tea) => {
          if(tea.type === 'Green'){
            return tea;
          }}).map((tea,i) => {
            return <TeaCard tea = {tea} key = {i} />
          })
      case 'Top Rated':
        return currentTeas.filter((tea) => {
          if((tea.ratingsTotal/tea.numberOfRatings) >= 4){
           return tea;
          }}).map((tea,i) => {
            return <TeaCard tea = {tea} key = {i} />
          })
      case 'Popular':
        return currentTeas.filter((tea) => {
          // rework this to rank order number of ratings. reduce()
          if((tea.numberOfRatings) >= 3){
           return tea;
          }}).map((tea,i) => {
            return <TeaCard tea = {tea} key = {i} />
          })
      case 'Herbal':
        return currentTeas.filter((tea) => {
          if((tea.type === 'Herbal')){
            // currently empty
           return tea;
          }}).map((tea,i) => {
            return <TeaCard tea = {tea} key = {i} />
          })
      default: 
        return currentTeas.map((tea, i) => {
        if( i >= 19){
          return;
        }
        return <TeaCard tea={tea} key ={i} />
    })
  }}

  useEffect(() => {
    setTimeout(() => {
      setLoadFlag(true);
    }, 1000)
  }, [])

  const setAlert = (alert) => {
    setAlertFlag(true);
    setAlertInfo(alert);
    setTimeout(() => {
      setAlertFlag(false);
      setAlertInfo('');
    }, 2000)
  }
  
  // filter((input) => {
  //   if(search === ''){
  //     return input; 
  //   } else if (input.name.toLowerCase().includes(search.toLowerCase()) || input.brand.toLowerCase().includes(search.toLowerCase())){
  //     return input; 
  //   }})

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
                  <div className = 'pagination-link' style = {{color: 'black'}} onClick = {() => setType('Top Rated')}>
                    Top Rated
                  </div>
                </Pagination.Item> 
                <Pagination.Item>
                  <div className = 'pagination-link' style = {{color: 'black'}} onClick = {() => setType('Popular')}>
                    Popular
                  </div>
                </Pagination.Item> 
                <Pagination.Item>
                  <div className = 'pagination-link' style ={{color: 'black'}} onClick = {() => setType('Black')}>
                    Black
                  </div>
                </Pagination.Item>  
                <Pagination.Item>
                  <div className = 'pagination-link' style ={{color: 'black'}} onClick = {() => setType('Green')}>
                    Green
                  </div>
                </Pagination.Item>
                <Pagination.Item>
                  <div className = 'pagination-link' style ={{color: 'black'}} onClick = {() => setType('Herbal')}>
                    Herbal
                  </div>
                </Pagination.Item>     
              <div className="addTea mx-4">
                {userProfile.length !== 0 ?
                <>
                  <button 
                    className="btn btn-success" 
                    style = {{zIndex : '1'}} 
                    onClick={() => setModalShow(true)}
                  >
                    <FaPlus/> Add Tea
                  </button>
                  <TeaForm
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </>
                :
                <button 
                  className="btn btn-success" 
                  style = {{zIndex : '1'}} 
                  onClick={() => setAlert('Sign in to Add Tea...')}
                >
                    <FaPlus/> Add Tea
                </button>}
              </div>
              </Pagination>
              <div className="add-tea-mobile">
                {userProfile.length !== 0 ?
                <>
                  <button 
                    className="btn btn-success" 
                    style = {{zIndex : '1'}} 
                    onClick={() => setModalShow(true)}
                  >
                    <FaPlus/> Add Tea
                  </button>
                  <TeaForm
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </>
                :
                <button 
                  className="btn btn-success" 
                  style = {{zIndex : '1'}} 
                  onClick={() => setAlert('Sign in to Add Tea...')}
                >
                    <FaPlus/> Add Tea
                </button>}
                {/* <TeaForm
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                /> */}
              </div>
            </div>
            
          </div>
      <div className ='teaContainer vw-100'>
          <div className = {loadFlag ? 'teaCardContainer col-sm col-10' : 'teaCardContainerLoading'} 
               style = {isDarkMode? {marginBottom: '5em'}: {backgroundColor: 'rgb(51, 51, 51)', marginBottom: '5em', border: 'black'}}
          > {
            loadFlag ? displayTeas(tea) : 
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