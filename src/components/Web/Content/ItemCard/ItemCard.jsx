import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { faStar, faShoppingBag, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { faStar as faRegularStar, faHeart } from '@fortawesome/free-regular-svg-icons'
import IconButton from '../../../../Utils/IconButton'
import useAuth from "../../../../Hooks/UseAuth"
import { db } from '../../../../config/FirebaseConfig'

import './ItemCard.scss'

const ItemCard = (props) => {

  const userData = useAuth();

  const saveProductToCart = async(e) => {
    e.preventDefault();
    const maceticaDoc = await db.collection('maceticas').doc(props.id).get();
    const maceticaRef = maceticaDoc.ref;
    const queryUser = await db.collection('user').where('email', '==', userData.email).get();
    const userDoc = queryUser.docs[0]
    const userInfo = userDoc.data();
    userInfo.cart.push(maceticaRef.path);
    db.collection('user').doc(userDoc.id).set(userInfo).then( response => {
      console.log('200 OK');
    }).catch( err => {
      console.log('Error while saving the product: ' + err);
    });
  }

  return (
    <div className="item-card">
      <div className="card-container">
        <div className="product-image">
          <Link to="#">
            <div className="labels">
              {
                maceticaNewOrOffer(props.maceticaIsNew, props.maceticaOffer)
              }
            </div>
            <div className="image-effect">
              <img src={props.maceticaImg} alt={props.maceticaAltImg} className="post-image"/>
              <div className="hover-content"/>
            </div>
          </Link>
        </div>
        <div className="product-content">
          <span className="category-list">
            {
              !props.maceticaCategories ?
              (
                <span>Sin Categoria</span>
              ):(
                props.maceticaCategories.map((category, index) => (
                  <Link key={index} to="#">{category} </Link>
                ))
              )
            }
          </span>
          <Link to="#" className="product-title-anchor">
            <h3 className="product-title">{props.maceticaName}</h3>
          </Link>
          <div className="rating-wrap">
            <IconButton icon={faStar} size="xs"/>
            <IconButton icon={faStar} size="xs"/>
            <IconButton icon={faStar} size="xs"/>
            <IconButton icon={faStar} size="xs"/>
            <IconButton icon={faRegularStar} size="xs"/>
          </div>
          <span className="price"><span className="amount"><span className="currency-symbol">COP$</span>{props.maceticaPrice}k</span><small> IVA Incluido</small></span>
          <div className="add-links-wrap">
            <div className="add-links clear-fix">
              <a onClick={saveProductToCart} className="add-to-cart-button">
                <IconButton icon={faShoppingBag} size="lg"/>
                Añadir al carrito
              </a>
              <div className="add-to-wishlist">
                <Link to="#" className="add-to-wishlist-button"><IconButton icon={faHeart} size="lg"/></Link>
              </div>
              <div className="quick-view">
                <Link to ="#" className="quick-view-button">
                  <IconButton icon={faExternalLinkAlt} size="lg"/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function maceticaNewOrOffer(maceticaNew, maceticaOffer) {

  return(
    <>
      {
        maceticaNew ?
        <div className='top-rated label'>Nuevo</div>
        :
        null
      }
      {
        maceticaOffer ?
        <div className='on-sale label'>{`Oferta ${maceticaOffer}%`}</div>
        :
        null
      }
    </>
  )
}

export default ItemCard
