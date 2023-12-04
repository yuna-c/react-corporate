import { useCustomText } from '../../../hooks/useText';
import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Youtube() {
	const customText = useCustomText('combined');
	const shortenText = useCustomText('shorten');
	const path = useRef(process.env.PUBLIC_URL);

	const [Vids, setVids] = useState([]);

	const fetchYoutube = async () => {
		// const api_key = 'AIzaSyBgRldfomRBMNoipsSTKYAmfOarH1iIu8o';
		// const pid = 'PL_gXk6OSOQ5LVWytUDP2MgKhA1-A5h1TJ';
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const pid = process.env.REACT_APP_YOUTUBE_LIST;

		const num = 10;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			setVids(json.items);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		/* S : Youtube */
		<Layout title={'Youtube'}>
			<h3>
				We create your <br></br>brand together.
			</h3>

			<div className='button-area'>
				<button className='btn'>BRANDING</button>
				<button className='btn'>DESIGN</button>
				<button className='btn'>VIDEO</button>
				<button className='btn'>CONTENT</button>
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
					<button className='btn'>GET IN TOUCH</button>
				</div>

				<div className='con-area'>
					<div className='line-vertical'></div>

					<div className='info'>
						<div className='txt'>
							<h5>We inspire people to stand up for what they believe in with amazing video strategies.</h5>
							<p>
								With our exceptional video strategies, we ignite inspiration and empower individuals to champion their beliefs fearlessly. Through visually captivating storytelling and impactful
								messaging, we spark a call to action that resonates deeply. Our expert team blends creativity and strategy to create compelling video content that drives engagement and provokes
								meaningful conversations. Whether it's a thought-provoking documentary, an emotionally charged campaign, or a powerful brand story, we craft narratives that leave a lasting impact.
								Together, let's harness the power of video to inspire, motivate, and mobilize audiences towards positive change and a brighter future.
							</p>
						</div>

						<div className='video-example'>
							<video src={`${path.current}/img/services-video-transcode.mp4`} alt='services-content-transcode' autoPlay muted loop playsinline />
						</div>

						<div className='line-holizontal'></div>

						<div className='video-area'>
							{Vids.map((data) => {
								const [date, time] = data.snippet.publishedAt.split('T');
								return (
									<article key={data.id}>
										<h6>{shortenText(data.snippet.title, 50)}</h6>

										<div className='pic'>
											<Link to={`/detail/${data.id}`}>
												<img src={data.snippet.thumbnails.standard ? data.snippet.thumbnails.standard.url : '/img/member1.jpg'} alt={data.snippet.title} />
											</Link>
										</div>

										<div className='txt'>
											<p>{shortenText(data.snippet.description, 250)}</p>
											<div className='infoBox'>
												<span>{customText(date, '.')}</span>
												<em>{time.split('Z')[0]}</em>
											</div>
										</div>
									</article>
								);
							})}
						</div>
					</div>
				</div>
			</section>

			<div className='line-holizontal'></div>
		</Layout>
		/* //E : Youtube */
	);
}
