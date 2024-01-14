import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useSplitText } from '../../../hooks/useText';
import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import './Visual.scss';
import 'swiper/css';
// npm i swiper@8
// swiper 8 docs
// https://v8.swiperjs.com/get-started

export default function Visual({ title }) {
	const num = useRef(8);
	const swipeRef = useRef(null);
	const [PrevIndex, setPrevIndex] = useState(0);
	const [Index, setIndex] = useState(0);
	const [NextIndex, setNextIndex] = useState(0);
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
		spaceBetween: 50,
		centeredSlides: true,
		loopedSlides: num.current,
		autoplay: { delay: 2000, disableOnInteraction: false },
		breakpoints: { 1000: { slidesPerView: 2 }, 1400: { slidesPerView: 3 } },
		onSwiper: swiper => (swipeRef.current = swiper),
		onSlideChange: swiper => {
			setIndex(swiper.realIndex);
			swiper.realIndex === 0 ? setPrevIndex(num.current - 1) : setPrevIndex(swiper.realIndex - 1);
			swiper.realIndex === num.current - 1 ? setNextIndex(0) : setNextIndex(swiper.realIndex + 1);
		}
	});

	const trimTitle = title => {
		let resultTit = '';
		if (title.includes('(')) resultTit = title.split('(')[0];
		else if (title.includes('[')) resultTit = title.split('[')[0];
		else resultTit = title;
		return resultTit;
	};

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

				{/* <div className='video-area'>
					<video src={`${path.current}/img/services-video-visual.mp4`} alt='services-content-transcode' autoPlay muted loop playsInline />
				</div> */}
			</div>

			<div className='line-holizontal'></div>

			<div className='swiperBox'>
				<div className='txtBox'>
					<ul>
						{isSuccess &&
							Vids.map((el, idx) => {
								if (idx >= num.current) return null;

								return (
									<li key={el.id} className={idx === Index ? 'on' : ''}>
										<h3>{trimTitle(el.snippet.title)}</h3>

										<Link to={`/detail/${el.id}`}>View Detail</Link>
									</li>
								);
							})}
					</ul>
				</div>

				<Swiper {...swiperOpt.current}>
					{isSuccess &&
						Vids.map((el, idx) => {
							if (idx >= num.current) return null;
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

				<nav className='preview'>
					{isSuccess && (
						<>
							<p className='prevBox' onClick={() => swipeRef.current.slidePrev(400)}>
								<img src={Vids[PrevIndex].snippet.thumbnails.default.url} alt={Vids[PrevIndex].snippet.title} />
							</p>
							<p className='nextBox' onClick={() => swipeRef.current.slideNext(400)}>
								<img src={Vids[NextIndex].snippet.thumbnails.default.url} alt={Vids[NextIndex].snippet.title} />
							</p>
						</>
					)}
				</nav>

				<ul className='pagination'>
					{Array(num.current)
						.fill()
						.map((_, idx) => {
							return <li key={idx} className={idx === Index ? 'on' : ''} onClick={() => swipeRef.current.slideToLoop(idx, 400)}></li>;
						})}
				</ul>

				<div className='barFrame'>
					<p className='bar' style={{ width: (100 / num.current) * (Index + 1) + '%' }}></p>
				</div>

				<div className='counter'>
					<strong>0{Index + 1}</strong>/<span>0{num.current}</span>
				</div>
			</div>

			<div className='line-holizontal'></div>

			<div className='videoBox'>
				{isSuccess && Vids.message ? (
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
				)}
			</div>
		</figure>
		/* E : Visual */
	);
}
