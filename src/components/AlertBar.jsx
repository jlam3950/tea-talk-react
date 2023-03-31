import React from 'react';
import { useContext } from "react";
import { ListContext } from '../App';


const AlertBar = () => {
    const { alertFlag, alertInfo } = useContext(ListContext);

    return (
        <div className={ alertFlag ? 'w-100 border border-warning bg-warning alertBar' : 'none'}>
            <span className='title d-flex justify-content-center'>{ alertFlag ? alertInfo : '' }</span>
        </div>
    )
}

export default AlertBar;