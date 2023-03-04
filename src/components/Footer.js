import RoundedBtn from './Rounded-Btn'

export default function Footer({ initial }) {
  const handleClick = () => {
    console.log(123)
  }

  return (
    <footer
      className={`flex flex-col items-center border-t border-t-zinc-600 py-4 mt-24 w-full ${
        initial ? 'fixed bottom-0' : ''
      }`}
    >
      <p className='mb-4'>Let us know your opinion!</p>
      <RoundedBtn text='Contact' onHandleClick={handleClick} />
      <p className='mt-6 text-[12px]'>All Rights Reserved.</p>
    </footer>
  )
}
