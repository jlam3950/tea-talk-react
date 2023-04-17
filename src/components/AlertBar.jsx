import React from 'react';
import { useContext } from "react";
import { ListContext } from '../App';
import { FaExclamationCircle } from 'react-icons/fa';


const AlertBar = () => {
    const { alertFlag, alertInfo } = useContext(ListContext);
    // const alertFlag = true;
    // const alertInfo = 'test'

    return (
        // <div className={ alertFlag ? 'w-100 border border-warning bg-warning alertBar' : 'none'}>
        //     <span className='title d-flex justify-content-center'>{ alertFlag ? alertInfo : '' }</span>
        // </div>
        <div className = 'w-100 d-flex justify-content-end alertBar'>
            <div className={ alertFlag ? 'bg-warning mx-5 alertBar' : 'none'}>
                    {/* <FaExclamationCircle className = 'col-3 mx-0'/> */}
                    <span className='col-9 title d-flex justify-content-center'>{ alertFlag ? alertInfo : '' }</span>
            </div>
        </div>
    )
}

export default AlertBar;