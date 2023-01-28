import Button from './Button';

export function SearchSec({ res, onHandleChange }) {
	return (
		<div className='grid grid-cols-3 gap-x-8 gap-y-12 mx-20'>
			{res.map((item, idx) => {
				const {title, thumbnail} = item
				return (
					<div key={idx} className='p-3 bg-slate-500 text-center'>
						<div className='relative tooltip text-left'>
							<h2 className='h-14'>{title.substring(0, 50)}{title.length > 50 && '...'}</h2>
							<span className='tooltip-text absolute p-1 rounded-md bg-black text-white text-sm'>{title}</span>
						</div>
						<div
							className='overflow-hidden img-container mb-3'
							style={{background: `url(${thumbnail}) 
							no-repeat center center / contain `}}
						></div>
						{/* https://stackoverflow.com/questions/72212466/react-changed-state-in-child-component-how-to-see-the-change-in-parent-compone */}
						<Button content={item} onHandleChange={onHandleChange} />
					</div>
				)
			})}
		</div>
	)
}

export function SearchSecSingle({ res, onHandleChange }) {
	const { title, duration, thumbnail } = res

	return (
		<div className='w-3/5 grid grid-cols-6 items-center'>
			<div className='col-span-2'>
				<h2>{title}</h2>
				<p>{duration}</p>
				<Button content={'true'} onHandleChange={onHandleChange} />
			</div>
			<div className='col-span-4'>
				<img src={thumbnail} alt={title} />
			</div>
		</div>
	)
}