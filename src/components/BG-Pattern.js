import pattern from '../img/bg-pattern.png'
import orbit from '../img/orbit.png'

export default function BGPattern() {
  return (
    <div className='absolute top-0 right-0 w-[45vw] max-w-xl 3xl:max-w-3xl'>
      <div className='relative flex justify-end'>
        <div className='w-4/5'>
          <img className='w-full h-auto' src={pattern} alt='pattern' />
        </div>
        <div className='triangle text-pink absolute top-5 left-0'></div>
        <div className='triangle triangle2 text-pink absolute top-28 left-[5vw] 3xl:hidden sm:block hidden'></div>
        <img
          className='w-[7vw] 3xl:max-w-[200px] max-w-[100px] orbit absolute bottom-2 left-[15vw] 2xl:left-56'
          src={orbit}
          alt='orbit'
        />
      </div>
    </div>
  )
}
