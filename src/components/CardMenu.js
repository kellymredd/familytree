import React, { useState, useEffect, useRef } from "react";

export default function CardMenu({ children }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickAway(e) {
      e.preventDefault();

      if (open && !menuRef?.current?.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClickAway, false);
    return () => document.removeEventListener("click", handleClickAway);
  }, [open]);

  function handleClick(e) {
    e.preventDefault();

    setOpen((prev) => !prev);
  }

  return (
    <div className="cardMenu">
      <button className="menuButton" onClick={(e) => handleClick(e)}>
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </button>
      {open ? (
        <div className="menuMenu" ref={menuRef}>
          {children}
        </div>
      ) : null}
    </div>
  );
}
