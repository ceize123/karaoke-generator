import bgBar from '../img/bg-input-bar.png'

export default function MusicForm({ handleSubmit, processing }) {
  return (
    <section className='md:w-2/3 w-full 2xl:h-80 md:h-[450px] h-80 relative flex items-end mx-auto overflow-hidden'>
      <form onSubmit={handleSubmit} className='text-center mx-2 sm:mx-0 grow'>
        <div>
          <h1 className='mb-2'>Karaoke Generator</h1>
          <p className='lg:mb-4 mb-2'>Easily remove vocals from music</p>
          <div
            className='sm:w-4/5 w-full flex justify-center items-center mx-auto rounded-[40px]'
            style={{
              background: `url(${bgBar}) no-repeat center center / cover`,
            }}
          >
            <div className='relative w-11/12'>
              <input
                className='border-4 border-primary lg:py-4 py-2 pl-5 lg:pr-32 sm:pr-24 pr-5  w-full rounded-[40px]'
                type='text'
                id='music'
                name='music'
                placeholder='Youtube link, song, any key words'
              />
              <button
                className='bg-primary absolute right-3.5 top-1/2 -translate-y-1/2 hidden sm:block disabled:opacity-75'
                type='submit'
                disabled={processing}
              >
                Search
              </button>
            </div>
          </div>
          <button
            className='bg-primary sm:hidden inline text-center mt-3'
            type='submit'
            disabled={processing}
          >
            Search
          </button>
        </div>
      </form>
    </section>
  )
}
