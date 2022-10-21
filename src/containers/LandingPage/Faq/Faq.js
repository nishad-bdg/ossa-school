import React, { Component } from 'react'
import './Faq.css'

const Faq = () => {
    return (
      <div className="list">
        <h1>Faq</h1>
        <div className="list">
          <ul>
            <li>
              <input type="checkbox" checked/>
                <i></i>
                <h2>Languages Used</h2>
                <p>Items</p>
            </li>
            <li>
              <input type="checkbox" checked/>
              <i></i>
              <h2>Languages Used</h2>
              <p>Items</p>
            </li>
            <li>
              <input type="checkbox" checked/>
              <i></i>
              <h2>Languages Used</h2>
              <p>Items</p>
            </li>
          </ul>
        </div>
      </div>
    )
}

export default Faq;
