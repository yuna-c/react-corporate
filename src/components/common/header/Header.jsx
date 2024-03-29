import './Header.scss';
import { useRef } from 'react';
import DarkMode from '../darkMode/DarkMode';
import { NavLink, Link } from 'react-router-dom';
import ThemeControl from '../themeControl/ThemeControl';
import { useGlobalData } from '../../../hooks/useGlobalData';
import { useScroll } from '../../../hooks/useScroll';

export default function Header({ children }) {
	const path = useRef(process.env.PUBLIC_URL);
	const { Toggle, setToggle } = useGlobalData();
	const lineEl = useRef(null);

	const handleCustomScroll = scroll => {
		console.log(scroll);
		if (scroll >= 0) {
			lineEl.current.style.transform = ` translateX(${0}px)`;
			lineEl.current.style.width = `100%`;
			lineEl.current.style.opacity = 1;
		}
		if (scroll <= 400) {
			lineEl.current.style.transform = `translateX(0px)`;
			lineEl.current.style.width = `0`;
			lineEl.current.style.opacity = 1 - scroll / 800;
		}
	};

	const { refEl } = useScroll(handleCustomScroll);

	return (
		/* S : Header */
		<header className='header myScroll' ref={refEl}>
			<div className='header-layout'>
				<h1 className='logo'>
					<Link to='/'>
						<img src={`${path.current}/img/logo.svg`} alt='logo.svg' />
						<span>React-Query</span>
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
						</ul>
					</div>

					<div className='side-layout'>
						<div className='gnb-color'>
							<ThemeControl />
						</div>

						<div className='gnb-util'>
							<DarkMode />
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

			{/* <div className='line-holizontal'></div> */}
			<div className='line-holizontal' style={{ width: '0', borderColor: 'red', transition: '2s' }} ref={lineEl}></div>
		</header>
		/* E : Header */
	);
}
