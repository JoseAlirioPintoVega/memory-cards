import "./App.css";
import * as Icons from "react-icons/all";
import { AiOutlineReload } from "react-icons/ai";
import cardData from "./data/cards";
import { useState } from "react";

function App() {
  const [cardList, setCardList] = useState(
    cardData.sort(() => Math.random() - 0.5)
  );
  const [prevIndexCard, setPrevIndexCard] = useState(-1);

  const handleClick = (index) => {
    cardList[index].status = "selected";
    setCardList([...cardList]);
    if (prevIndexCard === -1) {
      setPrevIndexCard(index);
    } else {
      validateCards(index);
      /*  setPrevIndexCard(-1); */
    }
  };

  const validateCards = (newIndexCard) => {
    setTimeout(() => {
      if (
        cardList[prevIndexCard].icon === cardList[newIndexCard].icon &&
        cardList[prevIndexCard].id !== cardList[newIndexCard].id
      ) {
        cardList[prevIndexCard].status = "up";
        cardList[newIndexCard].status = "up";
        setCardList([...cardList]);
        setPrevIndexCard(-1);
      } else {
        cardList[prevIndexCard].status = "down";
        cardList[newIndexCard].status = "down";
        setCardList([...cardList]);
        setPrevIndexCard(-1);
      }
    }, 500);
  };
  const handlereload = () => {
    location.reload();
  };
  return (
    <div className="main-container">
      <h1 className="title-main">Memory Cards</h1>
      <div className="container-circle">
        <div className="cards-container">
          {cardList.map((card, index) => {
            /* const Icon = Icons[card.icon]; */
            return (
              <div
                key={card.id}
                className={`${card.status} card`}
                onClick={() => handleClick(index)}
              >
                {card.status !== "down" && (
                  <div className="img-container">
                    <img className="img__cards" src={`${card.icon}`} alt="" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="container-reload">
          <AiOutlineReload className="reload" onClick={handlereload} />
        </div>
      </div>
    </div>
  );
}

export default App;
