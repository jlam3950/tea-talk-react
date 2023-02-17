import React from 'react';
import Container from 'react-bootstrap/Container';
import TeaCard from './TeaCard';

const Main = () => {
  return (
    <div className = 'container-fluid py-2 vh-100 d-flex'>
       <div className="d-flex flex-column">
          <div className ="input-group d-flex flex-column align-items-center justify-content-center">
            <div className="form-outline py-2 mobileSearchBar">
              <input type="search" id="form1" class="form-control" placeholder='Search Tea..' />
              <label class="form-label" for="form1"></label>
            </div>
            {/* <button type="button" class="btn btn-primary">
              <i class="fas fa-search"></i>
            </button> */}
          </div>
      <div class ='teaContainer vw-100 border border-danger'>
        <div className="addTeaBtnContainer">
            <div className="addTea d-flex flex-row align-items-center justify-content-center">
              <button className="btn-success">add tea +</button>
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