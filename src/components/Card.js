import React from 'react';
import CardMenu from './CardMenu';

function Card({ children }) {
  return <div className="card">{children}</div>;
}

Card.Header = ({ children }) => <div className="cardName">{children}</div>;
Card.Info = ({ children }) => <div className="cardInfo">{children}</div>;
Card.List = ({ children }) => <div className="cardList">{children}</div>;
Card.Menu = ({ children }) => <CardMenu>{children}</CardMenu>;

export default Card;
