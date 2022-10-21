import React, { useEffect, useRef, useState } from "react";

import "./Accordion.css";
import arrowDown from "./arrow-close.svg";
import arrowUp from "./arrow-up.svg";
import question from "./question.svg";

function Accordion(props) {
  const [active, setActive] = useState(false);
  const content = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    console.log("Height for ", props.title, ": ", height);
  }, [height]);

  function toggleAccordion() {
    setActive(!active);
    setHeight(active ? "0px" : `${content.current.scrollHeight}px`);
  }

  return (
    <div className="accordion__section">
      <div
        className={`accordion ${active ? "active" : ""}`}
        onClick={toggleAccordion}
      >
        <p className="accordion__title"><img src={question} alt='question' /> {props.title}</p>
        <span style={{ marginLeft: "20px" }}>{active ? <img src={arrowUp} alt='arrow up' /> : <img src={arrowDown} alt='arrow down' />}</span>
      </div>
      <div
        ref={content}
        style={{ maxHeight: `${height}`}}
        className="accordion__content"
      >        
        <div
          className="accordion__text"
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    </div>
  );
}

export default Accordion;
