import { useCallback, useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Detail.scss';
import { useParams } from 'react-router-dom';

export default function Detail() {
	// const data = useParams();
	// console.log(data);

	// 1. 유튭 페이지에서 썸네일 선택했을 때 버튼처리
	// 2. state로 객체 함수 만들기 effect로 한번만 받기
	console.log('re-render');
	console.log('--------------------------------');

	const { id } = useParams();
	// console.log(id);
	const [youtubeData, setYoutubeData] = useState(null);
	console.log(youtubeData);

	// 중요한 데이터 : useCallback : 화면에 출력할 것을 뿌리는
	const fetchSingleData = useCallback(async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		// const api_key = 'AIzaSyBgRldfomRBMNoipsSTKYAmfOarH1iIu8o';
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${id}`;
		const data = await fetch(baseURL);
		const json = await data.json();
		setYoutubeData(json.items[0].snippet);
	}, [id]); // id 값 들어올때만 메모이제이션 풀기

	useEffect(() => {
		fetchSingleData();
		console.log(useEffect);
		//useEffect가 언제 실행되는지
	}, [fetchSingleData]);

	return (
		/* S : Detail */
		<Layout title={'Detail'}>
			{youtubeData && (
				<article>
					<h3>{youtubeData.title}</h3>

					<div className='videoBox'>
						<iframe src={`https://www.youtube.com/embed/${youtubeData?.resourceId.videoId}`} title={youtubeData?.title}></iframe>
					</div>

					<p>{youtubeData.description}</p>
				</article>
			)}
		</Layout>
		/* E : Detail */
	);
}
