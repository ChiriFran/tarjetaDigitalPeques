import React from 'react'
import '../styles/InstagramHashtag.css'
import camaraImg from '../../media/icons/camara.webp'

function InstagramHashtag() {
    return (
        <>
            <div className="instagramHashtagContainer">
                <img src={camaraImg} alt="camara icon" />
                <h2>¡Queremos ver todas sus fotos!</h2>
                <p>Pueden usar nuestro # en todas sus publicaciones e historias de Instagram</p>
                <span>#XVMARIA</span>
            </div>
        </>
    )
}

export default InstagramHashtag
