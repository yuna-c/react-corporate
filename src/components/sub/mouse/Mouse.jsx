import React from 'react';
import './Mouse.scss';
import useMousePosition from './useMousePosition';
// https://medium.com/@jaredloson/custom-javascript-cursor-in-react-d7ffefb2db38

export default function Mouse() {
	const { clientX, clientY } = useMousePosition();
	return (
		<div className='Mouse'>
			Mouse
			<div
				style={{
					position: 'fixed',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					zIndex: 9999,
					pointerEvents: 'none'
				}}>
				<svg
					width={50}
					height={50}
					viewBox='0 0 50 50'
					style={{
						position: 'absolute',
						left: clientX,
						top: clientY,
						transform: 'translate(-50%, -50%)'
					}}>
					<circle cx='25' cy='25' r='8' />
				</svg>
			</div>
		</div>
	);
}
