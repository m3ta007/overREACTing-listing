import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

function Listing({ items }) {
  // Update the page's title:
  useEffect(() => {
    document.title = 'Etsy Listing React Component'
  })

  // Provide shortened title, if needed,
  // and escape Unicode in titles escaped by Webpack
  // to avoid dangerouslySetInnerHTML or extra plugins:
  const ANSCII_QUOT = '\u0022'
  const ASCII_APOST = '\u0027'
  const shortTitle = (title) => {
    title = title
      .replace(/&quot;/gi, ANSCII_QUOT)
      .replace(/&#39;/gi, ASCII_APOST)
    return title.length > 50 ? title.slice(0, 51) + '...' : title
  }

  // Provide dynamic currency format:
  const currency = (currCode, currPrice) => {
    if (currCode === 'USD') {
      return '$' + currPrice
    } else if (currCode === 'EUR') {
      return '€' + currPrice
    } else {
      return currPrice + ' ' + currCode
    }
  }

  // Provide dynamic stock status class:
  const stockClass = (quantity) => {
    let iq = 'item-quantity'
    return quantity > 20
      ? (iq += ' level-high')
      : quantity <= 10
      ? (iq += ' level-low')
      : (iq += ' level-medium')
  }
  // const stockClass = (quantity) => {
  //   let iq = 'item-quantity'
  // if (quantity <= 10) {
  //   return (iq += ' level-low')
  // } else if (quantity <= 20) {
  //   return (iq += ' level-medium')
  // } else {
  //   return (iq += ' level-high')
  // }
  // }

  return (
    <ul className="item-list">
      {items.map((item) => {
        return (
          // Include check for item.state to be "active":
          item.state === 'active' && (
            <li key={item.listing_id} className="item">
              <div className="item-image">
                <a href={item.url}>
                  <img src={item.MainImage.url_570xN} alt={item.title} />
                </a>
              </div>
              <div className="item-details">
                <p className="item-title">{shortTitle(item.title)}</p>
                {/* <p
                  className="item-title"
                  dangerouslySetInnerHTML={{
                    __html: shortTitle(item.title),
                  }}></p> */}
                <p className="item-price">
                  {currency(item.currency_code, item.price)}
                </p>
                <p className={stockClass(item.quantity)}>
                  {item.quantity + ' left'}
                </p>
              </div>
            </li>
          )
        )
      })}
    </ul>
  )
}

Listing.defaultProps = {
  items: [],
}

Listing.propTypes = {
  items: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
}

export default Listing
