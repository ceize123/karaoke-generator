import pattern from '../img/bg-pattern.png'

export default function BGPattern() {
  return (
    <div className='absolute top-0 right-0 w-[45vw] max-w-xl 3xl:max-w-3xl'>
      <div className='relative flex justify-end'>
        <div className='w-4/5'>
          <img className='w-full h-auto' src={pattern} alt='pattern' />
        </div>
      </div>
    </div>
  )
}
