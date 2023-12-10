import './Menu.scss';
import { useEffect } from 'react';
import Mobile from '../layout/Mobile';
import { AnimatePresence, motion } from 'framer-motion';
// npm i framer-motion@4
// 메뉴 닫을때 한번에 빡 닫히는거 수정 요망

export default function Menu({ setToggle, name }) {
	const closeMenu = () => {
		window.innerWidth >= 1200 && setToggle(false);
	};

	const disabled = () => {
		const disable = document.getElementsByClassName('wrapper');
		disable && setToggle(false);
	};

	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		window.addEventListener('click', disabled);
		return () => {
			window.removeEventListener('resize', closeMenu);
			window.removeEventListener('click', disabled);
		};
	}, []);

	return (
		<>
			<AnimatePresence>
				<motion.aside
					className='Menu'
					initial={{ opacity: 0, transition: { delay: 0.1 } }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, transition: { delay: 0 } }}
					transition={{ duration: 0.1, delay: 0.3 }}
				>
					<div className='content-padding'>
						<h1>{name}</h1>
						<Mobile />
					</div>
				</motion.aside>
			</AnimatePresence>
		</>
	);
}
