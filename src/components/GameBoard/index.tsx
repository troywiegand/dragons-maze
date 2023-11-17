import { useState } from 'react';

enum Pieces {
  None = 0,
  WhitePawn = 1,
  WhiteKing = 2,
  BlackPawn = 3,
  BlackKing = 4
}

enum Turn {
  None = 0,
  White = 1,
  Black = -1
}

const initialPosition = [
  Pieces.BlackPawn, Pieces.BlackPawn, Pieces.BlackKing, Pieces.BlackPawn, Pieces.BlackPawn,
  Pieces.None, Pieces.None, Pieces.None, Pieces.None, Pieces.None,
  Pieces.None, Pieces.None, Pieces.None, Pieces.None, Pieces.None,
  Pieces.None, Pieces.None, Pieces.None, Pieces.None, Pieces.None,
  Pieces.WhitePawn, Pieces.WhitePawn, Pieces.WhiteKing, Pieces.WhitePawn, Pieces.WhitePawn,
]

const PIECE_CLASS = 'align-middle	text-center text-7xl'

const GameBoard = ({ gameState = initialPosition, setGameState, card, currentTurn, setCurrentTurn, whiteKingPiece }) => {

  const [selectedPiece, setSelectedPiece] = useState(-10);

  const performMove = (gameStateLocation: number) => {
    return (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const newGame = JSON.parse(JSON.stringify(gameState))
      newGame[gameStateLocation] = gameState[selectedPiece]
      newGame[selectedPiece] = Pieces.None
      setSelectedPiece(-1)
      setCurrentTurn(currentTurn === Turn.White ? Turn.Black : Turn.White)
      setGameState(newGame)
      
    }
  }

  const cardFunc0 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === (sp %5===(ct === Turn.White ? 1 : 3 ) || sp %5===(ct === Turn.White ? 0 : 4 ) ? false : sp+(ct === Turn.White ? -12 : 12 ) )
  }

  const cardFunc1 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === (sp %5===(ct === Turn.White ? 0 : 4 ) ? false : sp+(ct === Turn.White ? -11 : 11 ) )
  }

  const cardFunc2 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === sp + (ct === Turn.White? -1 : 1) * 10
  }

  const cardFunc3 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === (sp %5===(ct === Turn.White ? 4 : 0 ) ? false : sp+(ct === Turn.White ? -9 : 9 ) )
  }

  const cardFunc4 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === (sp %5===(ct === Turn.White ? 3 : 1 ) || sp %5===(ct === Turn.White ? 4 : 0 ) ? false : sp+(ct === Turn.White ? -8 : 8 ) )
  }

  const cardFunc5 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === (sp %5===(ct === Turn.White ? 1 : 3 ) || sp %5===(ct === Turn.White ? 0 : 4 ) ? false : sp+(ct === Turn.White ? -7 : 7 ) )
  }

  const cardFunc6 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === (sp %5===(ct === Turn.White ? 0 : 4 ) ? false : sp+(ct === Turn.White ? -6 : 6 ) )
  }


  const cardFunc7 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === sp + (ct === Turn.White? -1 : 1) * 5
  }

  const cardFunc8 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === (sp %5===(ct === Turn.White ? 4 : 0 ) ? false : sp+(ct === Turn.White ? -4 : 4 ) )
  }

  const cardFunc9 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === (sp %5===(ct === Turn.White ? 3 : 1 ) || sp %5===(ct === Turn.White ? 4 : 0 ) ? false : sp+(ct === Turn.White ? -3 : 3 ) )
  }


  const cardFunc10 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === (sp %5===(ct === Turn.White ? 1 : 3 ) || sp %5===(ct === Turn.White ? 0 : 4 ) ? false : sp+(ct === Turn.White ? -2 : 2 ) )
  }

  const cardFunc11 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === (sp %5===(ct === Turn.White ? 0 : 4 ) ? false : sp+(ct === Turn.White ? -1 : 1 ) )
  }

  const cardFunc13 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === (sp %5===(ct === Turn.White ? 4 : 0 ) ? false : sp+(ct === Turn.White ? 1 : -1 ) )
  }

  const cardFunc14 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === (sp %5===(ct === Turn.White ? 3 : 1 ) || sp %5===(ct === Turn.White ? 4 : 0 ) ? false : sp+(ct === Turn.White ? 2 : -2 ) )
  }

  const cardFunc15 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === (sp %5===(ct === Turn.White ? 1 : 3 ) || sp %5===(ct === Turn.White ? 0 : 4 ) ? false : sp+(ct === Turn.White ? 3 : -3 ) )
  }

  const cardFunc16 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === (sp %5===(ct === Turn.White ? 0 : 4 ) ? false : sp+(ct === Turn.White ? 4 : -4 ) )
  }

  const cardFunc17 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === sp + (ct === Turn.White? 1 : -1) * 5
  }

  const cardFunc18 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === (sp %5===(ct === Turn.White ? 4 : 0 ) ? false : sp+(ct === Turn.White ? 6 : -6 ) )
  }

  const cardFunc19 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === (sp %5===(ct === Turn.White ? 3 : 1 ) || sp %5===(ct === Turn.White ? 4 : 0 ) ? false : sp+(ct === Turn.White ? 7 : -7 ) )
  }


  const cardFunc20 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === (sp %5===(ct === Turn.White ? 1 : 3 ) || sp %5===(ct === Turn.White ? 0 : 4 ) ? false : sp+(ct === Turn.White ? 8 : -8 ) )
  }

  const cardFunc21 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === (sp %5===(ct === Turn.White ? 0 : 4 ) ? false : sp+(ct === Turn.White ? 9 : -9 ) )
  }

  const cardFunc22 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === sp + (ct === Turn.White? 1 : -1) * 10
  }

  const cardFunc23 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === (sp %5===(ct === Turn.White ? 4 : 0 ) ? false : sp+(ct === Turn.White ? 11 : -11 ) )
  }

  const cardFunc24 = (gsl: number, sp: number, ct: Turn) => {
    return gsl === (sp %5===(ct === Turn.White ? 3 : 1 ) || sp %5===(ct === Turn.White ? 4 : 0 ) ? false : sp+(ct === Turn.White ? 12 : -12 ) )
  }

  const moveFunctions = [
    cardFunc0, cardFunc1, cardFunc2, cardFunc3, cardFunc4, cardFunc5, cardFunc6, cardFunc7, cardFunc8, cardFunc9, cardFunc10, cardFunc11, ()=>{} ,cardFunc13, cardFunc14, cardFunc15, cardFunc16, cardFunc17, cardFunc18, cardFunc19, cardFunc20, cardFunc21, cardFunc22, cardFunc23, cardFunc24

  ]

  console.log(card, moveFunctions, card[0], card[0]===1,  card.map((x,i)=>x?`${i}`:0).filter(x=>x))

  const IsValidMove = (gameStateLocation: number) => {
    return selectedPiece >= 0 && card.map((x,i)=>x?`${i}`:0).filter(x=>x).some(x=>moveFunctions[Number.parseInt(x)](gameStateLocation,selectedPiece,currentTurn))
    // (moveFunctions.filter((x,i)=>{card[i]===1}).some(x=>x(gameStateLocation,selectedPiece,currentTurn)))
  }

  const makeMoveOrSetSelectedPiece = (gameStateLocation: number, whatPlayer: Turn, card: number[]) => {
    return (event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
      currentTurn === whatPlayer ? setSelectedPiece(gameStateLocation) : performMove(gameStateLocation)(event) 
    }
  }
  const createPiece = (piece: Pieces, gameStateLocation: number) => {
    switch (piece) {
      case Pieces.BlackPawn:
        return <button onClick={makeMoveOrSetSelectedPiece(gameStateLocation,Turn.Black)} disabled={!(currentTurn === Turn.Black) && !(selectedPiece > 0 && currentTurn === Turn.White && IsValidMove(gameStateLocation))} className={PIECE_CLASS+((selectedPiece > 0 && currentTurn === Turn.White && IsValidMove(gameStateLocation))?' bg-red-400':'')}>♟</button>
      case Pieces.BlackKing:
        return <button onClick={makeMoveOrSetSelectedPiece(gameStateLocation,Turn.Black)} disabled={!(currentTurn === Turn.Black) && !(selectedPiece > 0 && currentTurn === Turn.White && IsValidMove(gameStateLocation))} className={PIECE_CLASS+((selectedPiece > 0 && currentTurn === Turn.White && IsValidMove(gameStateLocation))?' bg-red-400':'')}>♚</button>
      case Pieces.WhitePawn:
        return <button onClick={makeMoveOrSetSelectedPiece(gameStateLocation,Turn.White)} disabled={!(currentTurn === Turn.White) && !(selectedPiece > 0 && currentTurn === Turn.Black && IsValidMove(gameStateLocation))} className={PIECE_CLASS+((selectedPiece > 0 && currentTurn === Turn.Black && IsValidMove(gameStateLocation))?' bg-red-400':'')}>♙</button>
      case Pieces.WhiteKing:
        return <button onClick={makeMoveOrSetSelectedPiece(gameStateLocation,Turn.White)} disabled={!(currentTurn === Turn.White) && !(selectedPiece > 0 && currentTurn === Turn.Black && IsValidMove(gameStateLocation))} className={PIECE_CLASS+((selectedPiece > 0 && currentTurn === Turn.Black && IsValidMove(gameStateLocation))?' bg-red-400':'')}>{whiteKingPiece? <img src={whiteKingPiece}></img> :'♔'}</button>
      default:
        return IsValidMove(gameStateLocation) ? <button onClick={performMove(gameStateLocation)} className=' w-12 h-12 bg-red-400' /> : <div />
    }
  }

  return (
    <>
      {selectedPiece}
      MOVE: {currentTurn === Turn.Black ? 'BLACK' : 'WHITE'}
      <div className="bg-orange-100 max-w-96 rounded-md p-12 overflow-hidden	">
        <div className=" container grid grid grid-cols-5 gap-0 max-w-96 justify-center justify-items-stretch">
          {gameState?.map((x: Pieces, i) => {
            return <div key={`spot-${i}`} className={`h-20 w-15 text-black border border-black `}>
              {createPiece(x, i)}
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default GameBoard;