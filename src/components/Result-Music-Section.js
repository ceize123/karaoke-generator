import MusicCard from './Music-Card'

export default function ResultMusicSection({
  res,
  onHandleClick,
  processing,
  hasAudio,
}) {
  const handleDownloadClick = (id) => {
    onHandleClick(id)
  }

  return (
    <section className='w-full flex justify-center md:mt-20 mt-8 mb-6'>
      {res.length > 1 ? (
        <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-x-4 gap-y-8 sm:mx-6 mx-3'>
          {res.map((item, idx) => {
            return (
              <div
                key={idx}
                className='p-3 bg-secondary rounded-lg text-center relative'
              >
                <MusicCard
                  info={item}
                  single={false}
                  onHandleClick={() => handleDownloadClick(item.id)}
                  processing={processing}
                />
              </div>
            )
          })}
        </div>
      ) : (
        <div className='p-3 rounded-lg text-center relative lg:w-3/5 md:w-4/5 w-11/12'>
          <MusicCard
            info={res[0]}
            single={true}
            onHandleClick={() => handleDownloadClick(res[0].id)}
            processing={processing}
            hasAudio={hasAudio}
          />
        </div>
      )}
    </section>
  )
}
