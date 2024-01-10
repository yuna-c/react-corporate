import './Youtube.scss';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import Layout from '../../common/layout/Layout';
import { useCustomText } from '../../../hooks/useText';
import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';

export default function Youtube() {
	const customText = useCustomText('combined');
	const shortenText = useCustomText('shorten');
	const path = useRef(process.env.PUBLIC_URL);
	const [Index, setIndex] = useState(0);
	const btnArr = useRef(['VIDEO', 'BRANDING', 'DESIGN', 'CONTENT']);

	const { data: Vids, isSuccess, isError, error, isLoading } = useYoutubeQuery();
	console.log(isError, error);

	return (
		/* S : Youtube */
		<Layout title={'Youtube'}>
			<div className='visualBox'>
				<h3>We create your brand together.</h3>

				<div className='sort-area'>
					{btnArr.current.map((el, idx) => (
						<button
							key={idx}
							onClick={() => {
								setIndex(idx);
								idx !== Index && setIndex(idx);
							}}
							className={`btn ${idx === Index ? 'on' : ''} `}>
							{el}
						</button>
					))}
				</div>
			</div>

			<div className='line-holizontal'></div>

			<section className='videoBox'>
				<div className='txt-area'>
					<div className='icon'>
						<img src={`${path.current}/img/icon03.svg`} alt='icon03.svg' />
					</div>
					<h4>VIDEO</h4>
					<p>
						VIDEOS ADS <br></br>SOCIAL MEDIA SHORTS <br></br>MOVIE TRAILERS
					</p>

					<div className='btn-area'>
						<div className='btn-inner'>
							<button className='btn-active btn-inner-text'>GET IN TOUCH</button>
							<button className='btn-active btn-inner-text-hover'>GET IN TOUCH</button>
						</div>
					</div>
				</div>

				<div className='con-area'>
					<div className='line-vertical'></div>

					<div className='info'>
						<div className='txt'>
							<h5>We inspire people to stand up for what they believe in with amazing video strategies.</h5>
							<p>
								With our exceptional video strategies, we ignite inspiration and empower individuals to champion their beliefs fearlessly. Through
								visually captivating storytelling and impactful messaging, we spark a call to action that resonates deeply. Our expert team blends
								creativity and strategy to create compelling video content that drives engagement and provokes meaningful conversations. Whether it's
								a thought-provoking documentary, an emotionally charged campaign, or a powerful brand story, we craft narratives that leave a lasting
								impact. Together, let's harness the power of video to inspire, motivate, and mobilize audiences towards positive change and a brighter
								future.
							</p>
						</div>

						<div className='video-example'>
							<video src={`${path.current}/img/services-video-transcode.mp4`} alt='services-content-transcode' autoPlay muted loop playsInline />
						</div>

						<div className='line-holizontal'></div>

						<div className='video-area'>
							{isLoading && <p>Loading...</p>}
							{isSuccess &&
								Vids.map(data => {
									const [date, time] = data.snippet.publishedAt.split('T');
									return (
										<article key={data.id}>
											<h6>{shortenText(data.snippet.title, 40)}</h6>

											<div className='pic'>
												<Link to={`/detail/${data.id}`}>
													<img
														src={data.snippet.thumbnails.standard ? data.snippet.thumbnails.standard.url : '/img/member1.jpg'}
														alt={data.snippet.title}
													/>
												</Link>
											</div>

											<div className='txt'>
												<p>{shortenText(data.snippet.description, 180)}</p>
												<div className='infoBox'>
													<span>{customText(date, '.')}</span>
													<em>{time.split('Z')[0]}</em>
												</div>
											</div>
										</article>
									);
								})}
							{isError && <p>데이터 반환에 실패했습니다.</p>}
						</div>
					</div>
				</div>
			</section>

			<div className='line-holizontal'></div>

			<section className='brandingBox'>
				<div className='txt-area'>
					<div className='icon'>
						<img src={`${path.current}/img/icon01.svg`} alt='icon01.svg' />
					</div>

					<h4>branding</h4>
					<p>
						LOGO<br></br>CORPORATE IDENTITY<br></br>BRAND GUIDE
					</p>

					<div className='btn-area'>
						<div className='btn-inner'>
							<button className='btn-active btn-inner-text'>GET IN TOUCH</button>
							<button className='btn-active btn-inner-text-hover'>GET IN TOUCH</button>
						</div>
					</div>
				</div>

				<div className='con-area'>
					<div className='line-vertical'></div>

					<div className='info'>
						<div className='txt'>
							<h5>A strong brand is a tool to connect people with your brand all around the world.</h5>
							<p>
								A strong brand serves as a powerful conduit, transcending borders and bringing people from all corners of the globe together. It acts
								as a universal language, fostering connections, and forging lasting relationships. By crafting a compelling brand identity, we equip
								you with the tools to resonate with diverse audiences, irrespective of geographical boundaries. Our strategic approach ensures that
								your brand story is authentically communicated, captivating hearts and minds across cultures. Let us guide you in harnessing the true
								potential of your brand, bridging gaps, and leaving an indelible mark on a global scale. Together, we can connect the world to your
								brand's unique essence.
							</p>
						</div>

						<div className='video-example'>
							<video src={`${path.current}/img/services-branding-transcode.mp4`} alt='services-content-transcode' autoPlay muted loop playsInline />
						</div>
					</div>
				</div>
			</section>
		</Layout>
		/* E : Youtube */
	);
}
