function Logo() {
	return (
		<div className='flex flex-col items-center py-1 space-y-2'>
			<img
				src='images/logo.jpg'
				alt='company logo'
				className='inline-block tablet:max-h-24 rounded-full mobile:max-h-20'
			/>
			<p className='uppercase tablet:text-xs laptop:text-sm tablet:font-semibold tablet:tracking-normal laptop:tracking-wide mobile:tracking-tight mobile:text-xs mobile:font-normal'>
				The Weekend GetAway
			</p>
		</div>
	);
}

export default Logo;
