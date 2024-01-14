import './Info.scss';
import { Link } from 'react-router-dom/';
import postData from './dummyPosts.json';
import { useEffect, useState } from 'react';
import { useCustomText } from '../../../hooks/useText';

export default function Info() {
	const changeText = useCustomText('combined');

	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return postData.dummyPosts;
	};

	const [Post] = useState(getLocalData());

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Post));
	}, [Post]);

	return (
		<section className='Info myScroll'>
			<div className='showBox'>
				<div className='line-holizontal'></div>
				{Post.map((el, idx) => {
					const date = JSON.stringify(el.date);
					const strDate = changeText(date.split('T')[0].slice(1), '.');

					if (idx >= 4) return null;
					return (
						<article key={el + idx}>
							<div className='txt-area'>
								<h2>
									<Link to='/community/'>{el.title}</Link>
								</h2>
								<strong>{el.email}</strong>
								<p>{el.content}</p>
								<span>{strDate}</span>
							</div>
							<div className='line-holizontal'></div>
						</article>
					);
				})}
			</div>
		</section>
	);
}
