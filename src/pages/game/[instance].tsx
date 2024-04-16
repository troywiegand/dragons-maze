import { MouseEventHandler, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import Head from 'next/head';
import MoveCard from '~/components/MoveCard';
import GameBoard, { Turn, Pieces } from '~/components/GameBoard';

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
  const isFun = Boolean(router.query.cardset)
  const { data: sessionData } = useSession();
  const [gameState, setGameState] = useState(INIT_BOARD);
  const [card, setCard] = useState(isFun ? card1 : card2);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [whiteCards, setWhiteCards] = useState(isFun ? [card1, card2] : [card2, card5]);
  const [blackCards, setBlackCards] = useState(isFun ? [card3, card4] : [card1, card3]);
  const [neutralCards, setNeutralCards] = useState(isFun ? [card5] : [card4]);


  const resetGame = () => {
    setGameState(INIT_BOARD)
  }

  const updateGameState = (x: GameState) => {
    setGameState(x)
    currentTurn === 1 && setWhiteCards([neutralCards[0] || emptyCard, ...[whiteCards.find(c => c !== card) || emptyCard]])
    currentTurn === -1 && setBlackCards([neutralCards[0] || emptyCard, ...[blackCards.find(c => c !== card) || emptyCard]])
    setNeutralCards([card])
    setCard((currentTurn === -1 ? whiteCards[0] : blackCards[0]) || emptyCard)
  }

  const backgroundTurn = (ct: Turn) => currentTurn === ct ? 'bg-green-200' : 'bg-orange-100'

  return <>
    <Head>
      <title>Dragon's Maze Lobby #{router.query.instance}</title>
    </Head>
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#3A4A41] to-[#455148]">
      <h3 className='items-center justify-center text-xl text-center text-white'>Lobby #{router.query.instance}{sessionData ? ` - ${sessionData?.user.name}` : ''}</h3>
      {gameState.includes(4) && !gameState.includes(2) && <><p className='items-center justify-center text-xl text-center'>BLACK WINS <ResetButton onClick={resetGame} /></p></>}
      {gameState.includes(2) && !gameState.includes(4) && <><p className='items-center justify-center text-xl text-center'>WHITE WINS <ResetButton onClick={resetGame} /></p></>}

      <div className='flex flex-col lg:flex-row items-center mb-4 gap-4 lg:gap-0'>
        <div className={`${backgroundTurn(-1)} h-81 p-1 mr-4 border border-orange-100`}>
          <h2 className='text-emerald-500 text-center'>BLACK HAND</h2>
          <div className='flex flex-row lg:flex-col 2xl:flex-row gap-4'>
            {blackCards.map(x => (
              <MoveCard pattern={x} isSelected={card === x} cardClick={() => { currentTurn === -1 ? setCard(x) : () => { } }} />
            ))}
          </div>
        </div>
        {card && <GameBoard gameState={gameState} setGameState={updateGameState} card={card} currentTurn={currentTurn} setCurrentTurn={setCurrentTurn} />}

        <div className={`${backgroundTurn(1)} h-81 p-1 ml-4 border border-orange-100`}>
          <h2 className='text-emerald-500 text-center'>WHITE HAND</h2>
          <div className='flex flex-row lg:flex-col 2xl:flex-row gap-4'>
            {whiteCards.map(x => (
              <MoveCard pattern={x} isSelected={card === x} cardClick={() => { currentTurn === 1 ? setCard(x) : () => { } }} />
            ))}
          </div>
        </div>

      </div>



      <div className={`bg-orange-100 h-81 rounded-md p-1 ml-4`}>
      <h2 className='text-emerald-500 text-center'>NUETRAL CARD</h2>
      <div className='flex flex-row'>
        {neutralCards.map(x => (
          <MoveCard pattern={x} />
        ))}
      </div>
      </div>
    </main>
  </>;
}

const ResetButton = ({ onClick }: { onClick: MouseEventHandler }) => {
  return <>
    <button
      className="rounded-full bg-amber-900 px-10 py-3 font-semibold text-white no-underline transition hover:bg-amber-700"
      onClick={onClick}
    >RESET</button>
  </>
}
