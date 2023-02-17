export default function RoundedBtn({ text, onHandleClick }) {
  return (
    <button
      onClick={() => {
        onHandleClick()
      }}
      className='bg-primary py-1.5 px-3.5 rounded-[40px]'
    >
      {text}
    </button>
  )
}
