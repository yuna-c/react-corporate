import './Layout.scss';
import { useEffect, useRef, useState } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import { useSplitText } from '../../../hooks/useText';

export default function Layout({ children, title }) {
	const refTitle = useRef(null);
	const refBtnTop = useRef(null);
	const [Frame, setFrame] = useState(null);
	const splitText = useSplitText();

	const handleCustomScroll = scroll => {
		scroll >= 100 ? refBtnTop.current.classList.add('on') : refBtnTop.current.classList.remove('on');
	};
	const { scrollTo, refEl } = useScroll(handleCustomScroll, 0);

	useEffect(() => {
		splitText(refTitle.current, title, 0.7, 0.1);
		setTimeout(() => {
			refEl.current?.classList.add('on');
		}, 300);
	}, [splitText, title, refEl]);

	useEffect(() => {
		scrollTo(0);
	}, []);

	return (
		/* S : Layout */
		<main ref={refEl} className={`layout ${title}`}>
			<div className='content-layout'>
				<div className='content-padding'>
					<h2 ref={refTitle}>{title}</h2>
					{children}
				</div>
			</div>
			<button ref={refBtnTop} className='btnTop' onClick={() => console.log('1')}>
				{/*  scrollTo(0) */}
				Top
			</button>
		</main>
		/* E : Layout */
	);
}
