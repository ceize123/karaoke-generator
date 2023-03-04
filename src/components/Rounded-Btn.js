export default function RoundedBtn({
  size,
  text,
  onHandleClick,
  processing = false,
}) {
  return (
    <button
      onClick={() => {
        onHandleClick()
      }}
      className={`bg-primary ${size}`}
      disabled={processing}
    >
      {text}
    </button>
  )
}
