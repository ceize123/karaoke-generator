import RoundedBtn from './Rounded-Btn'

const timeFormat = (duration) => {
  const mins = Math.floor(duration / 60)
  const secs = duration % 60
  let res = ''

  res += mins + ':' + (secs < 10 ? '0' : '')
  res += '' + secs

  return res
}

export default function SearchCard({
  info,
  single,
  onHandleClick,
  processing,
  hasAudio,
}) {
  const { title, thumbnail, duration } = info
  const time = timeFormat(duration)
  return (
    <>
      <div className='overflow-hidden img-container relative rounded-lg bg-black mb-3'>
        <div
          className='img-container'
          style={{
            background: `url(${thumbnail})
                    no-repeat center center / cover `,
          }}
        ></div>
        <span className='bg-pink p-1 absolute right-2 bottom-2 rounded'>
          {time}
        </span>
      </div>
      <div className={`tooltip text-left ${single ? 'md:mb-12 mb-6' : 'mb-3'}`}>
        {single ? (
          <h3>{title}</h3>
        ) : (
          <h3>
            {title.substring(0, 30)}
            {title.length > 30 && '...'}
          </h3>
        )}
        {!single && (
          <span className='tooltip-text absolute top-2 p-1 rounded-md bg-black text-white text-sm'>
            {title}
          </span>
        )}
      </div>
      {/* https://stackoverflow.com/questions/72212466/react-changed-state-in-child-component-how-to-see-the-change-in-parent-compone */}
      {/* <Button content={item} onHandleChange={onHandleChange} /> */}
      {!hasAudio && (
        <RoundedBtn
          size={`${single ? 'text-2xl py-4 px-6' : 'text-base py-2 px-6'}`}
          text='Generate'
          onHandleClick={onHandleClick}
          processing={processing}
        />
      )}
    </>
  )
}
