import 'swiper/css';
import './Visual.scss';
import { Autoplay } from 'swiper';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef, useState } from 'react';
import { useSplitText } from '../../../hooks/useText';
import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
// npm i swiper@8
// swiper 8 docs
// https://v8.swiperjs.com/get-started

export default function Visual({ title }) {
	// const customText = useCustomText('combined');
	// const shortenText = useCustomText('shorten');

	const path = useRef(process.env.PUBLIC_URL);
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const splitText = useSplitText();
	const { isSuccess, data: Vids } = useYoutubeQuery();

	const swiperOpt = useRef({
		modules: [Autoplay],
		loop: true,
		slidesPerView: 1,
		spaceBetween: 0,
		centeredSlides: true,
		autoplay: {
			delay: 1000,
			disableOnInteraction: true
		},
		breakpoints: {
			1000: {
				sliderPerView: 2,
				spaceBetween: 50
			},
			1400: {
				sliderPerView: 3,
				spaceBetween: 50
			}
		}
	});

	useEffect(() => {
		splitText(refTitle.current, title, 0.7, 0.15);
		setTimeout(() => {
			refFrame.current.classList.add('on');
		}, 300);
	}, [splitText, title]);

	return (
		/* S : Visual */

		<figure className='Visual'>
			<div className='visualBox'>
				<div ref={refFrame} className='txt-area'>
					<h2 ref={refTitle} className={` ${(title = 'React-Query')}`}>
						{title}
					</h2>

					<h3>We are a digital agency from Lisbon.</h3>
					<p>Elevating brands through creative digital solutions, proudly representing Lisbon's vibrant innovation.</p>
				</div>

				<div className='video-area'>
					<video src={`${path.current}/img/services-video-visual.mp4`} alt='services-content-transcode' autoPlay muted loop playsInline />
				</div>
			</div>

			<div className='line-holizontal'></div>

			<div className='videoBox'>
				{/* {isSuccess && Vids.message ? (
					<h1>{Vids.message}</h1>
				) : (
					isSuccess &&
					Vids.map((vid, idx) => {
						if (idx >= 6) return null;
						return (
							<article key={vid.id}>
								<div className='pic'>
									<Link to={`/detail/${vid.id}`}>
										<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
									</Link>
								</div>
							</article>
						);
					})
				)} */}

				<Swiper {...swiperOpt.current}>
					{isSuccess &&
						Vids.map((el, idx) => {
							if (idx >= 5) return null;
							return (
								<SwiperSlide key={el.id}>
									<div className='pic'>
										<p>
											<img src={el.snippet.thumbnails.standard.url} alt={el.snippet.title} />
										</p>
										<p>
											<img src={el.snippet.thumbnails.standard.url} alt={el.snippet.title} />
										</p>
									</div>
								</SwiperSlide>
							);
						})}
				</Swiper>
			</div>
		</figure>
		/* E : Visual */
	);
}
