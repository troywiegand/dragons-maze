import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import MoveCard from '~/components/MoveCard';
import GameBoard from '~/components/GameBoard';

const INIT_BOARD = [3, 3, 4, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1];


const card1 = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const card2 = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
const card3 = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
const card4 = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
const card5 = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];


export default function Page() {

  const router = useRouter();
  const { data: sessionData } = useSession();
  const [gameState, setGameState] = useState(INIT_BOARD);
  const [card, setCard] = useState(card1);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [whiteCards, setWhiteCards] = useState([card1, card2]);
  const [blackCards, setBlackCards] = useState([card3, card4]);
  const [neutralCards, setNeutralCards] = useState([card5]);


  const resetGame = () => {
    setGameState(INIT_BOARD)
  }

  const updateGameState = (x) => {
    setGameState(x)
    currentTurn === 1 && setWhiteCards([neutralCards[0], ...[whiteCards.find(c=>c!==card)]])
    currentTurn === -1 && setBlackCards([neutralCards[0], ...[blackCards.find(c=>c!==card)]])
    setNeutralCards([card])
    setCard(currentTurn===-1 ? whiteCards[0]: blackCards[0])
  }

  return <>
    {/* {sessionData.user && <img src={sessionData?.user?.image || undefined}></img>} */}
    <p>Game Number: {router.query.instance}</p>
    <p>SELECTED CARD: {JSON.stringify(card)}</p>
    <p>currentTurn: {currentTurn}</p>
    {gameState.includes(4) && !gameState.includes(2) && <><p>BLACK WINS</p><button onClick={resetGame}>RESET</button></>}
    {gameState.includes(2) && !gameState.includes(4) && <><p>WHITE WINS</p><button onClick={resetGame}>RESET</button></>}

    { card && <GameBoard gameState={gameState} setGameState={updateGameState} card={card } currentTurn={currentTurn} setCurrentTurn={setCurrentTurn} /> }

    <p>BLACK HAND:</p>
    <div className='flex flex-row'>
    {blackCards.map(x => (
      <MoveCard pattern={x} cardClick={()=>{currentTurn === -1 ? setCard(x) : ()=>{}}} />
    ))}
    </div>

    <p>WHITE HAND:</p>
    <div className='flex flex-row'>
    {whiteCards.map(x => (
      <MoveCard pattern={x} cardClick={()=>{currentTurn === 1 ? setCard(x) : ()=>{}}} />
    ))}
    </div>

    <p>NEUTRAL CARDS:</p>
    <div className='flex flex-row'>
    {neutralCards.map(x => (
      <MoveCard pattern={x} cardClick={()=>{}} />
    ))}
    </div>
  </>;
}
