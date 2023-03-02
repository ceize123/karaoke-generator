export default function AudioSection({ data, info }) {
  return (
    <section>
      <div className='flex justify-center'>
        {/* <AudioPlayer playList={playList} /> */}
        <audio controls>
          <source src={data} type='audio/x-wav' />
        </audio>
      </div>
    </section>
  )
}
