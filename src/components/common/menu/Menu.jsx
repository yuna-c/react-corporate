import './Menu.scss';
import { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import Mobile from '../mobile/Mobile';
// npm i framer-motion@4

export default function Menu({ setToggle, Dark, setDark }) {
	const closeMenu = useCallback(
		e => {
			e.preventDefault();
			window.innerWidth >= 1200 && setToggle(false);
		},
		[setToggle]
	);

	const disable = useCallback(() => {
		const disable = document.getElementsByClassName('wrapper');
		disable && setToggle(false);
	}, [setToggle]);

	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		window.addEventListener('click', disable);

		return () => {
			window.removeEventListener('resize', closeMenu);
			window.removeEventListener('click', disable);
		};
	}, [closeMenu, disable]);

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
					<Mobile />

					<div className='util-layout'>
						<div className='gnb-util'>
							<div className={`thema ${Dark && 'dark'}`} onClick={() => setDark(!Dark)}>
								<div className='ball'>
									<span>ball</span>
								</div>
							</div>
						</div>

						<div className='gnb-social'>
							<ul>
								<li>
									<a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
										Tw
									</a>
								</li>
								<li>
									<a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'>
										In
									</a>
								</li>
								<li>
									<a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>
										Fa
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</motion.aside>
		</>
		/* E : Menu */
	);
}
