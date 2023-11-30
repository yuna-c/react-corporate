import './Header.scss';
import { NavLink, Link } from 'react-router-dom';

export default function Header() {
	return (
		/* S : header */
		<header className='header'>
			<div className='content-layout'>
				<h1 className='logo'>
					<Link to='/'>Logo</Link>
				</h1>

				<div className='gnb-menu'>
					<div className='gnb-layout'>
						<ul>
							<li>
								<NavLink to='/department' activeClassName={'on'}>
									Department
								</NavLink>
							</li>
							<li>
								<NavLink to='/youtube' activeClassName={'on'}>
									Youtube
								</NavLink>
							</li>
							<li>
								<NavLink to='/gallery' activeClassName={'on'}>
									Gallay
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

					<div className='gnb-util'>
						<div className='thema'>
							<div className='ball'>
								<span>ball</span>
							</div>
						</div>
					</div>

					<div className='line-verticle'></div>

					<div className='gnb-social'>
						<ul>
							<li className='cycle'>
								<Link to='/'>Tw</Link>
							</li>
							<li>
								<Link to='/'>In</Link>
							</li>
							<li>
								<Link to='/'>Fa</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className='line'></div>
		</header>
		/* // E : header */
	);
}
