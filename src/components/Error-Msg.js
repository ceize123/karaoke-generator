export default function ErrorMsg({ error }) {
  return (
    <div className='text-center mt-20'>
      <p className='text-base'>
        {error === 'empty' ? (
          <>Must not have an empty input</>
        ) : error === 'search' ? (
          <>
            Can't find what you're looking for?
            <br />
            Try using more
            <span className='text-pink'>specific keywords</span> or directly
            pasting the <span className='text-pink'>YouTube link.</span>
          </>
        ) : (
          <>Something went wrong...</>
        )}
      </p>
    </div>
  )
}
