import './Menu.scss';
import { useEffect } from 'react';
import Mobile from '../layout/Mobile';
import { AnimatePresence, motion } from 'framer-motion';

export default function Menu({ setToggle, name }) {
	const closeMenu = () => {
		window.innerWidth >= 1200 && setToggle(false);
	};

	const disabled = () => {
		const disable = document.getElementsByClassName('wrapper');
		disable && setToggle(false);
	};

	console.log(disabled);
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
