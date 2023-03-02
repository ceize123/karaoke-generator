export default function AudioSection({ data }) {
  return (
    <section>
      <div className='flex justify-center'>
        <audio controls>
          <source src={data} type='audio/x-wav' />
        </audio>
      </div>
    </section>
  )
}
