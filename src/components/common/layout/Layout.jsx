import './Layout.scss';
import { useScroll } from '../../../hooks/useScroll';
import { useSplitText } from '../../../hooks/useText';
import { useEffect, useRef } from 'react';

export default function Layout({ children, title }) {
	const refTitle = useRef(null);
	const refBtnTop = useRef(null);
	const splitText = useSplitText();

	const handleCustomScroll = scroll => {
		scroll >= 100 ? refBtnTop.current?.classList.add('on') : refBtnTop.current?.classList.remove('on');
	};

	const { scrollTo, refEl } = useScroll(handleCustomScroll, 0);

	useEffect(() => {
		splitText(refTitle.current, title, 0.7, 0.1);
		setTimeout(() => {
			refEl.current?.classList.add('on');
		}, 300);
		scrollTo(0);
	}, [splitText, title, refEl, scrollTo]);

	useEffect(() => {
		scrollTo(0);
	}, [scrollTo]);

	console.log(refEl, refBtnTop);
	return (
		/* S : Layout */
		<main ref={refEl} className={`Layout ${title}`}>
			<div className='content-layout'>
				<div className='content-padding'>
					<h2 ref={refTitle}>{title}</h2>
					{children}
				</div>
			</div>

			<button
				ref={refBtnTop}
				className='btnTop'
				onClick={() => {
					scrollTo(0);
					// console.log(1);
				}}>
				Top
			</button>
		</main>
		/* E : Layout */
	);
}
