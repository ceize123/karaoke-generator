export default function RoundedBtn({
  sizeClass,
  text,
  onHandleClick,
  processing = false,
}) {
  return (
    <button
      onClick={() => {
        onHandleClick()
      }}
      className={`bg-primary ${sizeClass}`}
      disabled={processing}
    >
      {text}
    </button>
  )
}
