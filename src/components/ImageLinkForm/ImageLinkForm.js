import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonClick}) => {
	return(
		<div className='form'>
			<p className='f3'>
				{'This brain will detect faces in your image. Let do it!'}
			</p>
			<div className='main center shadow-4 pa3'>
				<input className='w-80 center' type='text' onChange={onInputChange} />
				<button className='button center grow bg-light-blue f4' onClick={onButtonClick}>
					Detect
				</button>
			</div>
		</div>

	);
}

export default ImageLinkForm;
