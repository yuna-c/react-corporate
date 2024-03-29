import './Footer.scss';
import { useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCookie } from '../../../hooks/useCookie';

export default function Footer() {
	const path = useRef(process.env.PUBLIC_URL);
	const { setCookie, isCookie, viewCookie } = useCookie();

	return (
		/* S : Footer */
		<footer className='footer'>
			<div className='line-holizontal'></div>
			<div className='footer-layout'>
				<div className='footer-area'>
					<div className='logo-area'>
						<h1 className='logo'>
							<Link to='/'>
								<img src={`${path.current}/img/logo.svg`} alt='logo.svg' />
							</Link>
						</h1>

						<p>
							Fylla Digital Agency<br></br> Main Street <br></br>16Lisbon
						</p>

						<div className='gnb-social'>
							<ul>
								<li>
									<button
										onClick={() => {
											window.open(`https://twitter.com`);
										}}>
										Tw
									</button>
								</li>
								<li>
									<button
										onClick={() => {
											window.open('https://www.facebook.com/');
										}}>
										In
									</button>
								</li>
								<li>
									<button
										onClick={() => {
											window.open('https://www.instagram.com/');
										}}>
										Fa
									</button>
								</li>
							</ul>
						</div>
					</div>

					<div className='menu-area'>
						<div className='line-vertical'></div>
						<div className='footer-menu'>
							<h3>Pages</h3>
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

						<div className='footer-menu'>
							<h3>Cms</h3>
							<ul>
								<li>
									<NavLink to='/eeee' activeClassName={'on'}>
										Eeee
									</NavLink>
								</li>
								<li>
									<NavLink to='/mouse' activeClassName={'on'}>
										mouse
									</NavLink>
								</li>
								<li>
									<NavLink to='/BLOG' activeClassName={'on'}>
										BLOG
									</NavLink>
								</li>
								<li>
									<div className='btn-area'>
										<div className='btn-inner'>
											<button className='btn-active btn-inner-text'>MORE TEMPLATES</button>
											<button className='btn-active btn-inner-text-hover'>MORE TEMPLATES</button>
										</div>
									</div>
								</li>
							</ul>
						</div>

						<div className='footer-menu'>
							<h3>Utility Pages</h3>
							<ul>
								<li>
									<NavLink to='/404 ERROR PAGE' activeClassName={'on'}>
										404 ERROR PAGE
									</NavLink>
								</li>
								<li>
									<NavLink to='/STYLEGUIDE' activeClassName={'on'}>
										STYLEGUIDE
									</NavLink>
								</li>
								<li>
									<NavLink to='/Licensing' activeClassName={'on'}>
										Licensing
									</NavLink>
								</li>
								<li>
									<NavLink to='/Changelog' activeClassName={'on'}>
										Changelog
									</NavLink>
								</li>
							</ul>
						</div>
						{/* 
						<div className='footer-menu'>
							<h3>Cms</h3>
							<ul>
								<li>
									<button className='btn' onClick={() => setCookie('today', 'done', 60 * 60)}>
										쿠키생성
									</button>
								</li>
								<li>
									<button className='btn' onClick={() => setCookie('today', 'done', 0)}>
										쿠키삭제
									</button>
								</li>
								<li>
									<button className='btn' onClick={() => console.log(isCookie('today=done'))}>
										쿠키확인
									</button>
								</li>
								<li>
									<button className='btn' onClick={() => viewCookie()}>
										모든 쿠키 보기
									</button>
								</li>
							</ul>
						</div>
						 */}
					</div>
				</div>

				<div className='line-holizontal'></div>

				<div className='footer-util' style={{ background: 'transparents' }}>
					<div>
						<p>
							© Made by
							<Link to='/'>Pawel Gola</Link>
						</p>
						<p>
							- Powered by
							<Link to='/'>WEBFLOW</Link>
						</p>
					</div>
					<div>
						<p>
							<Link to='/'>Privacy</Link>
							<Link to='/'>Imprint</Link>
						</p>
					</div>
				</div>
			</div>
		</footer>
		/* E : Footer */
	);
}
