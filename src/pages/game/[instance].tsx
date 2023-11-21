import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import MoveCard from '~/components/MoveCard';
import GameBoard, {Turn, Pieces} from '~/components/GameBoard';

const INIT_BOARD = [3, 3, 4, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1];

const emptyCard = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const card1 = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const card2 = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const card3 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
const card4 = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
const card5 = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];

type GameState = Array<Pieces>


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

  const updateGameState = (x: GameState) => {
    setGameState(x)
    currentTurn === 1 && setWhiteCards([neutralCards[0] || emptyCard, ...[whiteCards.find(c=>c!==card) || emptyCard]])
    currentTurn === -1 && setBlackCards([neutralCards[0] || emptyCard, ...[blackCards.find(c=>c!==card) || emptyCard]])
    setNeutralCards([card])
    setCard((currentTurn===-1 ? whiteCards[0]: blackCards[0]) || emptyCard)
  }

  const backgroundTurn = (ct: Turn) => currentTurn === ct ? 'bg-green-200' : ''

  return <>
    {/* {sessionData.user && <img src={sessionData?.user?.image || undefined}></img>} */}
    <p>Game Number: {router.query.instance}</p>
    <p>SELECTED CARD: {JSON.stringify(card)}</p>
    <p>currentTurn: {currentTurn}</p>
    {gameState.includes(4) && !gameState.includes(2) && <><p>BLACK WINS</p><button onClick={resetGame}>RESET</button></>}
    {gameState.includes(2) && !gameState.includes(4) && <><p>WHITE WINS</p><button onClick={resetGame}>RESET</button></>}

    <div className='flex flex-row'>
    <div className={`${backgroundTurn(-1)} h-81 p-1`}>
    <h2>BLACK HAND:</h2>
    <div className='flex flex-row'>
    {blackCards.map(x => (
      <MoveCard pattern={x} isSelected={card===x} cardClick={()=>{currentTurn === -1 ? setCard(x) : ()=>{}}} />
    ))}
    </div>
    </div>
    { card && <GameBoard gameState={gameState} setGameState={updateGameState} card={card } currentTurn={currentTurn} setCurrentTurn={setCurrentTurn} /> }

    <div className={`${backgroundTurn(1)} h-81 p-1`}>
    <h2>WHITE HAND:</h2>
    <div className='flex flex-row'>
    {whiteCards.map(x => (
      <MoveCard pattern={x} isSelected={card===x} cardClick={()=>{currentTurn === 1 ? setCard(x) : ()=>{}}} />
    ))}
    </div>
    </div>

    </div>




    <p>NEUTRAL CARDS:</p>
    <div className='flex flex-row'>
    {neutralCards.map(x => (
      <MoveCard pattern={x}/>
    ))}
    </div>
  </>;
}
