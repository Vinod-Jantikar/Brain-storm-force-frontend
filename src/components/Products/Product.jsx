import React, { useEffect, useState } from 'react'
import "./Product.css"
import Modal from '../modal/Modal';


const Product = () => {

    const [capsdata, setCapsData] = useState([]);
    const[isOpen, setOpen] = useState(false)
    const[serielId, setSerielID] = useState();

    const handleOpen = (id) => {
        setOpen(true)
      
        setSerielID(id)
        console.log("serielId", serielId)

    }

    const getData = () => {
        fetch('https://api.spacexdata.com/v3/capsules').then((res) => res.json()).then((data) => setCapsData(data))
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        
        if(isOpen){
            window.scrollTo({top: 0, left:0, behavior : 'smooth'});
        }
        
    }, [isOpen])
    console.log("serielId", serielId)

    return (
        <div style={{position: "relative"}}>
        
            <div className='navbarDiv'>
                <input type="text" name="" id="" placeholder='Search' />
            </div>

            <div className='bannerDiv'>
                <img src={'./assets/banner.jpg'} alt="banner" />
            </div>

            <h1>Capsules</h1>

            <div className='parentBox'>
                {capsdata.map((caps) => (
                    <div className='box' onClick={() => handleOpen(caps.capsule_serial)}>
                        <h2>Details: {caps.details}</h2>
                        <h2>Type: {caps.type}</h2>
                        <h2>Capsule Seriel: {caps?.capsule_serial}</h2>
                        <h2>Mission Name: {caps?.missions[0]?.name}</h2>
                    </div>
                ))}
            </div>
                    <Modal isOpen={isOpen} setOpen={setOpen} serielId={serielId}/>
        </div>
    )
}

export default Product
