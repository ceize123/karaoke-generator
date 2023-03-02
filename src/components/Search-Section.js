import SearchCard from './Search-Card'

export default function SearchSection({
  res,
  onHandleClick,
  processing,
  complete,
}) {
  console.log(res)
  const handleDownloadClick = (id) => {
    onHandleClick(id)
  }

  return (
    <section className='w-full flex justify-center md:mt-20 mt-8 mb-8'>
      {res.length > 1 ? (
        <div className='grid grid-cols-3 gap-x-4 gap-y-8 mx-6'>
          {res.map((item, idx) => {
            return (
              <div
                key={idx}
                className='p-3 bg-secondary rounded-lg text-center relative'
              >
                <SearchCard
                  info={item}
                  single={false}
                  onHandleClick={() => handleDownloadClick(item.id)}
                  processing={processing}
                  complete={complete}
                />
              </div>
            )
          })}
        </div>
      ) : (
        <div className='p-3 rounded-lg text-center relative md:w-1/2 w-4/5'>
          <SearchCard
            info={res[0]}
            single={true}
            onHandleClick={() => handleDownloadClick(res[0].id)}
            processing={processing}
            complete={complete}
          />
        </div>
      )}
    </section>
  )
}
