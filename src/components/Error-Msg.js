export default function ErrorMsg({ error }) {
  return (
    <div className='error text-center mt-20'>
      <p>
        {error === 'Empty' ? (
          <>Must not have an empty input</>
        ) : error === 'Search' ? (
          <>
            Can't find what you're looking for?
            <br />
            Try using more
            <span className='text-pink'> specific keywords</span> or directly
            pasting the <span className='text-pink'>YouTube link.</span>
          </>
        ) : error === 'No Result' ? (
          <>
            No result.
            <br />
            Try using more
            <span className='text-pink'> specific keywords</span> or directly
            pasting the <span className='text-pink'>YouTube link.</span>
          </>
        ) : (
          <>
            Something went wrong...
            <br />
            Please Try again
          </>
        )}
      </p>
    </div>
  )
}
