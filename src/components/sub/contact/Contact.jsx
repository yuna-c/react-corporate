import './Contact.scss';
import emailjs from '@emailjs/browser';
import Layout from '../../common/layout/Layout';
import { useThrottle } from '../../../hooks/useThrottle';
import { useEffect, useRef, useState, useCallback } from 'react';
// npm install @emailjs/browser --save

export default function Contact() {
	const form = useRef();

	const resetForm = () => {
		const elArr = form.current.children;

		Array.from(elArr).forEach(el => {
			console.log(el);
			if (el.name === 'user_name' || el.name === 'user_email' || el.name === 'message') el.value = '';
		});
	};

	const sendEmail = e => {
		e.preventDefault();

		const [user, email] = form.current.querySelectorAll('input');
		const txtArea = form.current.querySelector('textarea');

		if (!user.value || !email.value || !txtArea.value) return alert('이름, 답장받을 이메일주소 문의내용을 모두 입력하세요.');

		emailjs.sendForm('service_nytqr3g', 'template_50r2xta', form.current, 'EkR0AJGqHyR3vJV0U').then(
			result => {
				alert('문의 내용이 성공적으로 전송되었습니다.');
				resetForm();
			},
			error => {
				alert('일시적인 장애로 문의 전송에 실패했습니다. 다음의 메일주소로 보내주세요.');
				resetForm();
			}
		);
	};

	const kakao = useRef(window.kakao);
	console.log(kakao);

	const [Index, setIndex] = useState(0);
	const [Traffic, setTraffic] = useState(false);
	const [View, setView] = useState(false);

	const mapFrame = useRef(null);
	const viewFrame = useRef(null);
	const marker = useRef(null);
	const mapInstance = useRef(null);

	//지점마다 출력할 정보를 개별적인 객체로 묶어서 배열로 그룹화
	const mapInfo = useRef([
		{
			title: 'HAMBURG',
			latlng: new kakao.current.maps.LatLng(37.51100661425726, 127.06162026853143),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		},
		{
			title: 'LISBON',
			latlng: new kakao.current.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		},
		{
			title: 'BUDAPEST',
			latlng: new kakao.current.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		}
	]);

	//마커 인스턴스 생성
	marker.current = new kakao.current.maps.Marker({
		position: mapInfo.current[Index].latlng,
		image: new kakao.current.maps.MarkerImage(mapInfo.current[Index].imgSrc, mapInfo.current[Index].imgSize, mapInfo.current[Index].imgOpt)
	});

	const roadview = useCallback(() => {
		console.log('roadview');
		new kakao.current.maps.RoadviewClient().getNearestPanoId(mapInfo.current[Index].latlng, 50, panoId => {
			new kakao.current.maps.Roadview(viewFrame.current).setPanoId(panoId, mapInfo.current[Index].latlng);
		});
	}, [Index]);

	const setCenter = useCallback(() => {
		console.log('setCenter');
		mapInstance.current.setCenter(mapInfo.current[Index].latlng);
	}, [Index]);

	const throttledSetCenter = useThrottle(setCenter);

	//컴포넌트 마운트시 참조객체에 담아놓은 돔 프레임에 지도 인스턴스 출력 및 마커 세팅
	useEffect(() => {
		mapFrame.current.innerHTML = '';
		viewFrame.current.innerHTML = '';
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 3
		});
		marker.current.setMap(mapInstance.current);
		setTraffic(false);
		setView(false);

		mapInstance.current.addControl(new kakao.current.maps.MapTypeControl(), kakao.current.maps.ControlPosition.TOPRIGHT);
		mapInstance.current.addControl(new kakao.current.maps.ZoomControl(), kakao.current.maps.ControlPosition.RIGHT);
		mapInstance.current.setZoomable(false);
	}, [Index]);

	useEffect(() => {
		window.addEventListener('resize', throttledSetCenter);
		return () => window.removeEventListener('resize', throttledSetCenter);
	}, [throttledSetCenter]);

	useEffect(() => {
		View && viewFrame.current.children.length === 0 && roadview();
	}, [View, roadview]);

	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		/* S : Contact */
		<Layout title={'Contact'}>
			<section className='visualBox'>
				<div className='txt-area'>
					<h3>Creating true brands together.</h3>
					<p>
						Creating true brands together. Get in touch with us!
						<br />
						Complete the form below to discuss your project. We can't wait to collaborate and bring your vision to life. The duration of the branding
						process varies depending on the complexity of the project. On average, it can take anywhere from several weeks to a few months.
					</p>
				</div>
			</section>

			<div className='line-holizontal'></div>

			<section id='mapSection' className='contentBox'>
				<nav className='btn-area'>
					{mapInfo.current.map((el, idx) => (
						<button
							key={idx}
							onClick={() => {
								setIndex(idx);
								idx !== Index && setIndex(idx);
							}}
							className={`btn ${idx === Index ? 'on' : ''} `}>
							{el.title}
						</button>
					))}

					<button
						onClick={() => {
							setTraffic(!Traffic);
						}}
						className={`btn`}>
						{Traffic ? 'Traffic OFF' : 'Traffic ON'}
					</button>

					<button onClick={() => setView(!View)} className={`btn`}>
						{View ? 'map view' : 'road view'}
					</button>

					<button onClick={setCenter} className={`btn`}>
						RESET
					</button>
				</nav>

				<div className='tab-area'>
					<article className={`mapBox ${View ? '' : 'on'}`} ref={mapFrame}></article>
					<article className={`viewBox ${View ? 'on' : ''}`} ref={viewFrame}></article>
				</div>
			</section>

			<section id='mailSection' className='inputBox'>
				<form ref={form} onSubmit={sendEmail}>
					<label>Name</label>
					{/* from_name :템플릿에서 전송하는 사람이름 변수명 */}
					<input type='text' name='user_name' placeholder='Your Title' />
					<label>Email</label>
					{/* reply_to :템플릿에서 답장할 메일주소 변수명 */}
					<input type='email' name='user_email' placeholder='Your Email' />
					<label>Message</label>
					{/* message :템플릿에서 문의메세지 변수명 */}
					<textarea name='message' placeholder='Your Message' rows={15} />
					<div className='btn-area'>
						<input type='submit' value='Send' className='btn' />
					</div>
				</form>
			</section>
		</Layout>
		/* E : Contact */
	);
}
