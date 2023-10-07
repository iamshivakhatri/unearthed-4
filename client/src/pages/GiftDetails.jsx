

import React, {useState, useEffect} from 'react';
import './GiftDetails.css'
import {useParams} from 'react-router-dom';

const GiftDetails = ({data}) => {
    const {id } = useParams();


    const [gift, setGift] = useState({id: 0, name: "", pricepoint: "", audience: "", image: "", description: "", submittedby: "", submittedon: ""})


    useEffect(() => {

        const fetchGiftById = async () => {
            const response = await fetch(`http://localhost:3001/gifts/${id}`)
            const data = await response.json();
            setGift(data);
        }
        fetchGiftById()
    }, [data, id]);

   


    return (
        <div className="GiftDetails">
            <main id="gift-content" class="gift-info">
                <div class="image-container">
                    <img id="image" src={gift.image} />
                </div>
                <div class="gift-details">
                    <h2 id="name">{gift.name}</h2>
                    <p id="submittedBy">{'Submitted By: ' + gift.submittedby}</p>
                    <p id="pricePoint">{'Price: ' + gift.pricepoint}</p>
                    <p id="audience">{'Great For: ' + gift.audience}</p>
                    <p id="description">{gift.description}</p>
                </div>
            </main>
        </div>
    )
}

export default GiftDetails