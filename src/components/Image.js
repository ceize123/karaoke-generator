export default function Image({ thumbnail }) {
	return (
		<div
			className='overflow-hidden img-container mb-3'
			style={{
				background: `url(${thumbnail}) 
			no-repeat center center / contain `,
			}}
		></div>
	)
}
