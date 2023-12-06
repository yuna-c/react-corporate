import './Header.scss';
import { NavLink, Link } from 'react-router-dom';

export default function Header({ Dark, setDark, Toggle, setToggle }) {
	const urls = [{ TW: ['https://twitter.com'] }, { FA: ['https://www.facebook.com/'] }, { IN: 'https://www.instagram.com/' }];
	return (
		/* S : header */
		<header className='header'>
			<div className='header-layout'>
				<h1 className='logo'>
					<Link to='/'>Logo</Link>
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
								<NavLink to='/contant' activeClassName={'on'}>
									Contant
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
									<button
										onClick={() => {
											window.open(`https://twitter.com`);
										}}
									>
										Tw
									</button>
								</li>
								<li>
									<button
										onClick={() => {
											window.open('https://www.facebook.com/');
										}}
									>
										In
									</button>
								</li>
								<li>
									<button
										onClick={() => {
											window.open('https://www.instagram.com/');
										}}
									>
										Fa
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className='line-holizontal'></div>
		</header>
		/* // E : header */
	);
}
