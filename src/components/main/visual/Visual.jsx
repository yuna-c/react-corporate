import { useEffect, useRef, useState } from 'react';
import { useCustomText } from '../../../hooks/useText';
import './Visual.scss';
import { Link } from 'react-router-dom';

export default function Visual() {
	const customText = useCustomText('combined');
	const shortenText = useCustomText('shorten');
	const [Vids, setVids] = useState([]);

	const fetchYoutube = async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const pid = process.env.REACT_APP_YOUTUBE_LIST;

		const num = 14;
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
		/* S : Visual */
		<figure className='Visual'>
			<div className='visualBox'>
				<div className='txt-area'>
					<h2>memoization </h2>
					<h3>We are a digital agency from Lisbon.</h3>
					<p>Elevating brands through creative digital solutions, proudly representing Lisbon's vibrant innovation.</p>
				</div>
			</div>

			<div className='line-holizontal'></div>

			<div className='videoBox'>
				{Vids.message ? (
					<h1>{Vids.message}</h1>
				) : (
					Vids.map((vid, idx) => {
						if (idx >= 6) return null;
						return (
							<article key={vid.id}>
								<div className='pic'>
									<Link to={`/detail/${vid.id}`}>
										<img src={vid.snippet.thumbnails.default.url} alt={vid.snippet.title} />
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
