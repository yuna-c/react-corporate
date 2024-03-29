import './Layout.scss';
import { useScroll } from '../../../hooks/useScroll';
import { useSplitText } from '../../../hooks/useText';
import { useEffect, useRef } from 'react';

export default function Layout({ children, title }) {
	const refTitle = useRef(null);
	const refBtnTop = useRef(null);
	const splitText = useSplitText();
	//순서1 - 레이아웃에서 공통적으로 적용될 스크롤이 100을 넘어가면 btnTop보이는 함수 정의
	const handleCustomScroll = scroll => {
		scroll > 100 ? refBtnTop.current?.classList.add('on') : refBtnTop.current?.classList.remove('on');
	};
	const { scrollTo, refEl } = useScroll(handleCustomScroll, 0);

	useEffect(() => {
		scrollTo(0);
		splitText(refTitle.current, title, 0.7, 0.1);
		setTimeout(() => {
			refEl.current?.classList.add('on');
		}, 300);
	}, [splitText, title, scrollTo, refEl]);

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

			<button ref={refBtnTop} className='btnTop' onClick={() => scrollTo(0)}>
				Top
			</button>
		</main>
		/* E : Layout */
	);
}
