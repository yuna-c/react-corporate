import './Contact_.scss';
import emailjs from '@emailjs/browser';
import Layout from '../../common/layout/Layout';
import useScript from '../../../hooks/useScript';
import { useThrottle } from '../../../hooks/useThrottle';
import { useEffect, useRef, useState, useCallback } from 'react';

export default function Contact_() {
	const Script = useScript(`//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.REACT_APP_KAKAO_API}`, 'kakao');

	//states
	const [kakao, setKakao] = useState(null);
	const [Info, setInfo] = useState([]);
	const [Index, setIndex] = useState(0);
	const [Traffic, setTraffic] = useState(false);
	const [View, setView] = useState(false);

	//refs
	const form = useRef();
	const mapFrame = useRef(null);
	const viewFrame = useRef(null);
	const map = useRef(null);
	const marker = useRef(null);

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

		emailjs.sendForm('service_ag7z96s', 'template_oh9ajns', form.current, '23g8RepczesqKPoIX').then(
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

	//get fetch data func
	const getData = async kakao => {
		setKakao(kakao);
		const data = await fetch(process.env.PUBLIC_URL + '/DB/mapInfo.json');
		const json = await data.json();

		setInfo(
			json.mapInfo.map(el => ({
				title: el.title,
				latlng: new kakao.maps.LatLng(...el.latlng),
				imgSrc: `${process.env.PUBLIC_URL}/img/${el.imgSrc}`,
				imgSize: new kakao.maps.Size(...el.imgSize),
				imgPos: { offset: new kakao.maps.Point(...el.imgPos) }
			}))
		);
	};

	// get roadview func
	const roadview = useCallback(() => {
		new kakao.maps.RoadviewClient().getNearestPanoId(Info[Index].latlng, 50, panoId => {
			new kakao.maps.Roadview(viewFrame.current).setPanoId(panoId, Info[Index].latlng);
		});
	}, [Index, Info, kakao]);

	// init map pos func
	const setCenter = () => {
		// console.log('setCenter');
		map.current.setCenter(Info[Index].latlng);
	};

	// throttling setCenter
	const throttledSetCenter = useThrottle(setCenter);

	//create mapInstance func
	const createMap = useCallback(() => {
		//set ref, map, marker
		map.current = new kakao.maps.Map(mapFrame.current, { center: Info[Index].latlng });
		marker.current = new kakao.maps.Marker({
			position: Info[Index].latlng,
			image: new kakao.maps.MarkerImage(Info[Index].imgSrc, Info[Index].imgSize, Info[Index].imgPos)
		});
		marker.current.setMap(map.current);

		//add controller
		map.current.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
		map.current.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
		map.current.setZoomable(false);
	}, [Index, Info, kakao]);

	//init CDN
	useEffect(() => Script && Script.kakao.maps.load(() => getData(Script.kakao)), [Script]);

	//init render with fetched data
	useEffect(() => Info[Index] && createMap(), [Info, Index, createMap]);

	useEffect(() => {
		//window event added
		window.addEventListener('resize', throttledSetCenter);
		return () => window.removeEventListener('resize', throttledSetCenter);
	}, [throttledSetCenter, Index]);

	//re-render with Index
	useEffect(() => {
		if (!Info[Index]) return;
		mapFrame.current.innerHTML = '';
		viewFrame.current.innerHTML = '';
		createMap();
		setTraffic(false);
		setView(false);
	}, [Index, createMap, Info]);

	//re-render with Traffic
	useEffect(() => {
		Traffic ? map.current?.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC) : map.current?.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic, kakao]);

	//roadview execution with toggle event
	useEffect(() => {
		View && viewFrame.current.children.length === 0 && roadview();
	}, [View, roadview]);

	return (
		<Layout title={'Contact'}>
			<div id='mailSection'>
				<form ref={form} onSubmit={sendEmail}>
					<label>Name</label>
					<input type='text' name='user_name' />
					<label>Email</label>
					<input type='email' name='user_email' />
					<label>Message</label>
					<textarea name='message' />
					<input type='submit' value='Send' />
				</form>
			</div>

			<div id='mapSection'>
				<div className='controlBox'>
					<nav className='branch'>
						{Info.map((el, idx) =>
							//prettier-ignore
							<button key={idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>{el.title}</button>
						)}
					</nav>

					<nav className='info'>
						<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic OFF' : 'Traffic ON'}</button>
						<button onClick={() => setView(!View)}>{View ? 'map' : 'road view'}</button>
						<button onClick={setCenter}>위치 초기화</button>
					</nav>
				</div>

				<section className='tab'>
					<article className={`mapBox ${View ? '' : 'on'}`} ref={mapFrame}></article>
					<article className={`viewBox ${View ? 'on' : ''}`} ref={viewFrame}></article>
				</section>
			</div>
		</Layout>
	);
}
