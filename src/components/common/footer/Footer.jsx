import './Footer.scss';
import { NavLink, Link } from 'react-router-dom';

export default function Footer() {
	return (
		/* S : footer */
		<footer className='footer'>
			<div className='line-holizontal'></div>
			<div className='footer-layout'>
				<div className='footer-area'>
					<div className='logo-area'>
						<h1 className='logo'>
							<Link to='/'>Logo</Link>
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

					<div className='line-vertical'></div>

					<div className='menu-area'>
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
									<NavLink to='/contant' activeClassName={'on'}>
										Contant
									</NavLink>
								</li>
							</ul>
						</div>

						<div className='footer-menu'>
							<h3>Cms</h3>
							<ul>
								<li>
									<NavLink to='/contant' activeClassName={'on'}>
										WORK
									</NavLink>
								</li>
								<li>
									<NavLink to='/youtube' activeClassName={'on'}>
										WORK SINGLE
									</NavLink>
								</li>
								<li>
									<NavLink to='/gallery' activeClassName={'on'}>
										BLOG
									</NavLink>
								</li>
								<li>
									<NavLink to='/gallery' activeClassName={'on'}>
										Shopping
									</NavLink>
								</li>
								<li>
									<div className='btn-area'>
										<div className='btn-inner'>
											<button className='btn-active btn-inner-text'>MORE TEMPLATES</button>
											<button className='btn-active btn-inner-text-hover'>MORE TEMPLATES</button>
										</div>
									</div>
									{/* <button className='btn'>MORE TEMPLATES</button> */}
								</li>
							</ul>
						</div>

						<div className='footer-menu'>
							<h3>Utility Pages</h3>
							<ul>
								<li>
									<NavLink to='/contant' activeClassName={'on'}>
										404 ERROR PAGE
									</NavLink>
								</li>
								<li>
									<NavLink to='/youtube' activeClassName={'on'}>
										Password Protected
									</NavLink>
								</li>
								<li>
									<NavLink to='/gallery' activeClassName={'on'}>
										STYLEGUIDE
									</NavLink>
								</li>
								<li>
									<NavLink to='/community' activeClassName={'on'}>
										Licensing
									</NavLink>
								</li>
								<li>
									<NavLink to='/members' activeClassName={'on'}>
										Members
									</NavLink>
								</li>
								<li>
									<NavLink to='/contant' activeClassName={'on'}>
										Changelog
									</NavLink>
								</li>
								<li>
									<NavLink to='/eeee' activeClassName={'on'}>
										Eeee
									</NavLink>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className='line-holizontal'></div>

				<div className='footer-util'>
					{/* style={{ border: '1px solid red' }} */}
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
		/*// E : footer */
	);
}
