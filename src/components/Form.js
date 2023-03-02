import bgBar from '../img/bg-input-bar.png'

export default function Form({ handleSubmit, processing }) {
  return (
    <section className='md:w-2/3 w-full lg:h-[60vh] md:h-[50vh] h-[40vh] relative flex items-end mx-auto'>
      <form onSubmit={handleSubmit} className='text-center mx-1.5 sm:mx-0 grow'>
        <div>
          <h1 className='mb-2'>Karaoke Generator</h1>
          <p className='lg:mb-4 mb-2'>Easily remove vocals from music</p>
          <div
            className='sm:w-full w-[340px] flex justify-center items-center sm:h-[6vw] max-h-[75px] mx-auto'
            style={{
              background: `url(${bgBar}) no-repeat center center / contain`,
            }}
          >
            <div className='relative 3xl:w-3/5 sm:w-11/12 w-[320px]'>
              <input
                className='border-4 border-primary lg:py-4 py-2 px-5 w-full rounded-[40px]'
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
          >
            Search
          </button>
        </div>
      </form>
    </section>
  )
}
