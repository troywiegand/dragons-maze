import {useState} from 'react';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import MoveCard from '~/components/MoveCard';
import GameBoard from '~/components/GameBoard';

const INIT_BOARD = [3, 3, 4, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1];
const card1 = [0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,0,0,0,0,0,0,0,0,0,0];
const card2 = [0,0,0,0,0,1,0,0,0,0,0,1,2,1,0,0,0,0,0,0,0,1,0,0,0];
const card3 = [1,0,0,0,0,0,0,0,1,0,0,1,2,1,0,0,0,0,1,0,0,0,0,0,0];
const card4 = [0,0,0,0,0,0,0,1,0,0,0,0,2,0,0,0,0,1,0,0,0,0,0,0,0];
const card5 = [0,0,0,0,0,1,0,0,0,1,0,0,2,0,0,0,0,1,0,0,0,0,0,0,0];


export default function Page() {
  const router = useRouter();
  const {data: sessionData} = useSession();
  const [gameState, setGameState] = useState(INIT_BOARD);
  const [card, setCard] = useState(card1);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [whiteCards, setWhiteCards] = useState([card1,card2]);
  const [blackCards, setBlackCards] = useState([card3,card4]);
  const [neutralCards, setNeutralCards] = useState([card5]);


  const resetGame = () => {
    setGameState(INIT_BOARD)
  }

  const pickACard = (c: number) => { return (event) => {
    switch(c){
      case 1:
        setCard(card1);
        break;
      case 2:
        setCard(card2);
        break;
      case 3:
        setCard(card3);
      case 4:
        setCard(card4);
      case 5:
        setCard(card5);
        break;
    }}
  }

  return <>
    {sessionData?.user && <img src={sessionData?.user?.image || undefined}></img>}
    <p>Game Number: {router.query.instance}</p>
    {gameState.includes(4) && !gameState.includes(2) && <><p>BLACK WINS</p><button onClick={resetGame}>RESET</button></>}
    {gameState.includes(2) && !gameState.includes(4) && <><p>WHITE WINS</p><button onClick={resetGame}>RESET</button></>}

    <p>BLACK HAND:</p>
    {blackCards.map(x=>(
      // <MoveCard
    ))}
    <GameBoard gameState={gameState} setGameState={setGameState} card={card} currentTurn={currentTurn} setCurrentTurn={setCurrentTurn}/>
    <MoveCard pattern={card1} cardClick={pickACard(1)}/>
    <MoveCard pattern={card2} cardClick={pickACard(2)}/>
    <MoveCard pattern={card3} cardClick={pickACard(3)}/>
    <MoveCard pattern={card4} cardClick={pickACard(4)}/>
    <MoveCard pattern={card5} cardClick={pickACard(5)}/>
    </>;
}