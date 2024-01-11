import './Mobile.scss';
import { NavLink } from 'react-router-dom';
import { useMobileQuery } from '../../../hooks/useMobileQuery';

export default function Mobile() {
	const { isSuccess, data: MoblieMenu } = useMobileQuery();

	return (
		/* S : Mobile */
		<div className='Mobile'>
			<div className='gnb-layout'>
				<ul>
					{isSuccess &&
						MoblieMenu.map((data, idx) => {
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
