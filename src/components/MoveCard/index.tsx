enum MoveCardPosValue {
  NotValid = 0,
  Valid = 1,
  Starting = 2,
}


const MoveCard = ({ pattern = (new Array(25)).fill(0), isSelected=false, cardClick=()=>{}}) => {

  const moveColor = (posValue: MoveCardPosValue) => {
    switch (posValue) {
      case MoveCardPosValue.Starting:
        return 'bg-red-600'
      case MoveCardPosValue.Valid:
        return 'bg-blue-800'
      default:
        return 'bg-yellow-400'
    }
  }

  const borderColor = (b: Boolean) => b ? 'bg-green-400' : 'bg-yellow-400'

  return (
    <>
      <div onClick={cardClick} className={` ${borderColor(isSelected)} w-80 h-80 place-items-stretch rounded-md p-5 overflow-hidden mx-2`}>
        <div className=" container grid grid grid-cols-5 gap-0 overflow-hidden	">
          {pattern?.map((x: MoveCardPosValue, i) => {
            return <div key={`spot-${i}`} className={`h-14 w-14 ${moveColor(x)} text-black border border-black`} />
          })}
        </div>
      </div>
    </>
  )
}

export default MoveCard;