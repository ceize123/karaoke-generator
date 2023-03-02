export default function RoundedBtn({ text, onHandleClick }) {
  return (
    <button
      onClick={() => {
        onHandleClick()
      }}
      className='bg-primary'
    >
      {text}
    </button>
  )
}
