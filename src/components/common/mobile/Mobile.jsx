import { useEffect, useRef, useState } from 'react';
import './Mobile.scss';
import { NavLink } from 'react-router-dom';

export default function Mobile() {
	const path = useRef(process.env.PUBLIC_URL);
	const [MoblieMenu, setMoblieMenu] = useState([]);

	const fetchMobile = async () => {
		try {
			const data = await fetch(`${path.current}/DB/mobileMenu.json`);
			const json = await data.json();
			// console.log(path);
			setMoblieMenu(json.moblieArr);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchMobile();
	}, []);

	return (
		/* S : Mobile */
		<div className='Mobile'>
			<div className='gnb-layout'>
				<ul>
					{MoblieMenu.map((data, idx) => {
						return (
							<li key={idx}>
								<NavLink to={data.link} activeClassName={'on'}>
									<span className='h'>{data.num}</span>
									<span>{data.menu}</span>
									<span className='h'>{data.description}</span>
								</NavLink>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
		/* E : Mobile */
	);
}

