import { useEffect, useRef } from 'react';
import './Layout.scss';
import { useSplitText } from '../../../hooks/useText';

export default function Layout({ children, title }) {
	const refFrame = useRef(null);
	const refTitle = useRef(null); //h2
	const splitText = useSplitText();

	useEffect(() => {
		splitText(refTitle.current, title, 0.7, 0.15);
		// 지연시간을 통해 scss가 적용될 시간을 줌
		setTimeout(() => {
			refFrame.current.classList.add('on');
		}, 300);
	}, [splitText, title]);

	return (
		/* S : Layout */
		<main ref={refFrame} className={`layout ${title}`}>
			<div className='content-layout'>
				<div className='content-padding'>
					<h2 ref={refTitle}>{title}</h2>
					{children}
				</div>
			</div>
		</main>
		/* E : Layout */
	);
}
