import { useRef } from 'react';
import './Header.scss';
import { NavLink, Link } from 'react-router-dom';

export default function Header({ Dark, setDark, Toggle, setToggle }) {
	const path = useRef(process.env.PUBLIC_URL);

	return (
		/* S : Header */
		<header className='header'>
			<div className='header-layout'>
				<h1 className='logo'>
					<Link to='/'>
						<img src={`${path.current}/img/logo.svg`} alt='logo.svg' />
						<span>React</span>
					</Link>
				</h1>

				<div className='gnb-menu'>
					<div className='gnb-layout'>
						<ul>
							<li>
								<NavLink to='/aboutUs' activeClassName={'on'}>
									AboutUs
								</NavLink>
							</li>
							<li>
								<NavLink to='/youtube' activeClassName={'on'}>
									Youtube
								</NavLink>
							</li>
							<li>
								<NavLink to='/gallery' activeClassName={'on'}>
									Gallery
								</NavLink>
							</li>
							<li>
								<NavLink to='/community' activeClassName={'on'}>
									Community
								</NavLink>
							</li>
							<li>
								<NavLink to='/members' activeClassName={'on'}>
									Members
								</NavLink>
							</li>
							<li>
								<NavLink to='/contact' activeClassName={'on'}>
									Contact
								</NavLink>
							</li>
							<li>
								<NavLink to='/eeee' activeClassName={'on'}>
									Eeee
								</NavLink>
							</li>
						</ul>
					</div>

					<div className='side-layout'>
						<div className='gnb-util'>
							<div className={`thema ${Dark && 'dark'}`} onClick={() => setDark(!Dark)}>
								<div className='ball'>
									<span>ball</span>
								</div>
							</div>
						</div>

						<div className='line-vertical'></div>

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

						<div className='gnb-toggle'>
							<button onClick={() => setToggle(!Toggle)}>
								menu
								<span></span>
								<span></span>
								<span></span>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className='line-holizontal'></div>
		</header>
		/* E : Header */
	);
}
