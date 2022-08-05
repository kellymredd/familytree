import React from "react";

export default function Dialog({ instance }) {
  const { isOpen, configuration, reject, resolve } = instance;
  return isOpen ? (
    <>
      <div className="my-modal-cover"></div>
      <div className="dialog">
        <div className="body">
          <p>{configuration.message}</p>
        </div>
        <footer>
          <button className="btn btn-link" onClick={reject}>
            No
          </button>
          <button className="btn btn-primary" onClick={resolve}>
            Yes
          </button>
        </footer>
      </div>
    </>
  ) : null;
}
