import RoundedBtn from './Rounded-Btn'

export default function Footer() {
  const handleClick = () => {
    console.log(123)
  }

  return (
    <footer className='flex flex-col items-center border-t border-t-zinc-600 py-4'>
      <p className='mb-4'>Let use know your opinion!</p>
      <RoundedBtn text='Contact' onHandleClick={handleClick} />
      <p className='mt-6 text-[12px]'>All Rights Reserved.</p>
    </footer>
  )
}
