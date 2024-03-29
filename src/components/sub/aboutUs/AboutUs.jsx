import './AboutUs.scss';
import { useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import { useCustomText } from '../../../hooks/useText';
import { useValueQuery } from '../../../hooks/useValueQuery';
import { useDepartmentQuery } from '../../../hooks/useDepartmentQuery';

export default function AboutUs() {
	const [On, setOn] = useState(false);
	const path = useRef(process.env.PUBLIC_URL);
	const combinedTitle = useCustomText('combined');

	const { data: ValueData, isSuccess: isValue } = useValueQuery();
	const { data: MemberData, isSuccess: isMember } = useDepartmentQuery();

	return (
		/* S : AboutUs */
		<Layout title={'AboutUs'}>
			<section className='visualBox'>
				<h3>Creative studio that inspires.</h3>

				<div className='img-area'>
					<img src={`${path.current}/img/img1.webp`} alt='img' />
				</div>

				<div className='line-holizontal'></div>
			</section>

			<section className='valueBox'>
				<div className='txt-area'>
					<h2>{combinedTitle('Our Values')}</h2>
					<p>Our vision is to connect with the world trough innovation.</p>

					<div className='btn-area'>
						<div className='btn-inner'>
							<button className='btn-active btn-inner-text'>SEE ALL WORK!</button>
							<button className='btn-active btn-inner-text-hover'>SEE ALL WORK!</button>
						</div>
					</div>

					<button className={`btn ${On ? 'on' : ''}`} onClick={() => setOn(!On)}>
						NoN animation
					</button>
				</div>

				<div className='con-area'>
					<div className='line-vertical'></div>

					{isValue &&
						ValueData.map((value, idx) => {
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
					<h3>{combinedTitle('Our Team')}</h3>

					<p>Meet our talented team of creative minds driving innovation.</p>
				</div>

				<div className='con-area'>
					<div className='line-vertical'></div>

					{isMember &&
						MemberData.map((member, idx) => {
							return (
								<article key={member + idx}>
									<div className='video'>
										<video src={`${path.current}/img/${member.pic}`} alt={member.name} autoPlay muted loop playsInline />
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
					<p>LET'S BRING YOUR BRAND TO THE NEXT LEVEL</p>

					<div className='icon'>
						<img src={`${path.current}/img/icon02.svg`} alt={path.current} />
					</div>
				</div>

				<div className='line-vertical'></div>

				<div className='con-area'>
					<p>Together, let's elevate your brand to new heights by unleashing its full potential and captivating your target audience.</p>

					<div className='btn-area'>
						<div className='btn-inner'>
							<button className='btn-active btn-inner-text'>Our Services</button>
							<button className='btn-active btn-inner-text-hover'>Our Services</button>
						</div>
					</div>
				</div>
			</div>
		</Layout>
		/* E : AboutUs */
	);
}
