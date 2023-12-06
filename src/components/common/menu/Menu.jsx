import { useEffect } from 'react';
import './Menu.scss';
import Mobile from '../layout/Mobile';

export default function Menu({ setToggle, name }) {
	const closeMenu = () => {
		window.innerWidth >= 1200 && setToggle(false);
	};

	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => window.removeEventListener('resize', closeMenu);
	}, []);

	return (
		<aside className='Menu'>
			<div className='content-padding'>
				<h1>{name}</h1>
				<Mobile />
			</div>
		</aside>
	);
}
