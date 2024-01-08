import './Menu.scss';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Mobile from '../mobile/Mobile';
// npm i framer-motion@4

export default function Menu({ setToggle, name }) {
	const closeMenu = e => {
		e.preventDefault();
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
		/* S : Menu */
		<>
			<motion.aside
				className='Menu'
				initial={{
					opacity: 0,
					y: '100px'
					// transition: { delay: 0.5, duration: 1 },
				}}
				animate={{
					opacity: 1,
					y: '0',
					transition: { duration: 0.4, ease: 'linear' }
				}}
				exit={{
					opacity: 0,
					y: '100px',
					transition: { delay: 0.2, duration: 0.4 }
				}}>
				<div className='content-padding'>
					<h1>{name}</h1>
					<Mobile />
				</div>
			</motion.aside>
		</>
		/* E : Menu */
	);
}
