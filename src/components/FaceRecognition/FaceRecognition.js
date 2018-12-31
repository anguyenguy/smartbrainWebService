import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({inputValue, box}) => {
	return(
		<div className=' center'>
			<div className='absolute mt2'>
				<img id='faceImage' alt='' src= {inputValue} width='500px' height='auto'/>
				<div className='boundingBox'
				style={{ top    :box.topRow,
						 right  :box.rightCol,
						 bottom :box.bottomRow,
						 left   :box.leftCol
				}}></div>
			</div>
		</div>
	);
}

export default FaceRecognition;
