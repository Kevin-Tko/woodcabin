function Logo() {
	return (
		<div className='flex flex-col items-center py-1 space-y-2'>
			<img src='images/logo.jpg' alt='company logo' className='inline-block max-h-24 rounded-full' />
			<p className='uppercase text-sm font-semibold tracking-wider'>The Weekend GetAway</p>
		</div>
	);
}

export default Logo;
