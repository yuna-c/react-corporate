import './AboutUs.scss';
import Layout from '../../common/layout/Layout';
import { useCustomText } from '../../../hooks/useText';
import { useEffect, useRef, useState } from 'react';

export default function AboutUs() {
	const [memberTit, setmemberTit] = useState('');
	const [memberData, setmemberData] = useState([]);
	const [ValueTit, setValueTit] = useState('');
	const [ValueData, setValueData] = useState([]);

	const path = useRef(process.env.PUBLIC_URL);

	const shortenText = useCustomText('shorten');
	const combinedTitle = useCustomText('combined');

	const fetchAboutUs = () => {
		fetch(`${path.current}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				setmemberTit(Object.keys(json)[0]);
				setmemberData(Object.values(json)[0]);
			});
	};

	const fetchValue = () => {
		fetch(`${path.current}/DB/value.json`)
			.then((data) => data.json())
			.then((json) => {
				setValueTit(Object.keys(json)[0]);
				setValueData(Object.values(json)[0]);
			});
	};

	useEffect(() => {
		fetchAboutUs();
		fetchValue();
	}, []);

	return (
		/* S : AboutUs */
		<Layout title={'AboutUs'}>
			<h3>
				Creative studio <br></br>that inspires.
			</h3>

			<div className='img-area'>
				<img src={`${path.current}/img/img1.webp`} alt={path.current} />
			</div>

			<div className='line-holizontal'></div>

			<section className='valueBox'>
				<div className='txt-area'>
					<h2>{combinedTitle(ValueTit)}</h2>
					<p>
						Our vision is to <br></br> connect with the <br></br>world trough<br></br> innovation.
					</p>
					<button className='btn'>SEE ALL WORK </button>
				</div>

				<div className='con-area'>
					<div className='line-vertical'></div>
					{ValueData.map((value, idx) => {
						return (
							<article key={value + idx}>
								<div className='info'>
									<div className='icon'>
										<img src={`${path.current}/img/${value.icon}`} alt={value.name} />
									</div>
									<div className='txt'>
										<h4>{value.name}</h4>
										<p>{value.detail}</p>
									</div>
								</div>

								<div className='line-holizontal'></div>
							</article>
						);
					})}
				</div>
			</section>

			<div className='line-holizontal'></div>

			<section className='memberBox'>
				<div className='txt-area'>
					<h3>{combinedTitle(memberTit)}</h3>

					<p>
						Meet our talented team<br></br> of creative minds driving <br></br>innovation.
					</p>
				</div>

				<div className='con-area'>
					<div className='line-vertical'></div>
					{memberData.map((member, idx) => {
						return (
							<article key={member + idx}>
								<div className='video'>
									<video src={`${path.current}/img/${member.pic}`} alt={member.name} autoPlay muted loop />
								</div>

								<h4>{member.name}</h4>
								<p>{member.position}</p>
							</article>
						);
					})}
				</div>
			</section>

			<div className='line-holizontal'></div>

			<div className='contantBox'>
				<div className='txt-area'>
					<h2>CONTACT</h2>
					<p>
						LET'S BRING<br></br> YOUR BRAND TO<br></br> THE NEXT LEVEL
					</p>
					<div className='icon'>
						<img src={`${path.current}/img/icon02.svg`} alt={path.current} />
					</div>
				</div>
				<div className='line-vertical'></div>
				<div className='con-area'>
					<p>Together, let's elevate your brand to new heights by unleashing its full potential and captivating your target audience.</p>
					<button className='btn'>Our Services</button>
				</div>
			</div>
		</Layout>
		/* // E : AboutUs */
	);
}
