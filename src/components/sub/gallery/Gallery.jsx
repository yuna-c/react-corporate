import { useEffect, useRef, useState } from 'react';
import './Gallery.scss';
import Layout from '../../common/layout/Layout';
import { Link } from 'react-router-dom';
// npm i react-masonry-component@6
// https://www.flickr.com/services/api/

export default function Gallery() {
	console.log('gallery');
	// const myID = useRef('199645532@N06');
	const [Pics, setPics] = useState([]);

	const fetchFlickr = async () => {
		console.log('flickr');
		const num = 200;
		const flickr_api = '5882059e4bec92178e2406d805cd3429';
		const method_interest = 'flickr.interestingness.getList';
		const baseURL = 'https://www.flickr.com/services/rest/?method=';
		const resultURL = `${baseURL}${method_interest}&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1`;

		const data = await fetch(resultURL);
		const json = await data.json();
		console.log(json.photos.photo);
		setPics(json.photos.photo);
	};

	useEffect(() => {
		fetchFlickr();
	}, []);

	return (
		/* S : Gallery */
		<Layout title={'Gallery'}>
			<section className='visualBox'>
				<div className='txt-area'>
					<h3>NEW Watching</h3>
					<p>Discover how we reimagined their brand identity, crafting a compelling narrative that authentically connects with their audience and propels their business forward.</p>
				</div>

				<div className='con-area'>
					<div className='line-vertical'></div>
					<div className='info'>
						<ul>
							<li>
								<dl>
									<dt>CLIENT</dt>
									<dd>LOREM IPSUM</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>YEAR</dt>
									<dd>2023</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>SERVICES</dt>
									<dd>GALLERY</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>WEBSITE</dt>
									<dd>
										<Link to='fylla-template.webflow.io'>fylla-template.webflow.io</Link>
									</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>TIMELINE</dt>
									<dd>Lorem, ipsum dolor.</dd>
								</dl>
							</li>
							<li>
								<dl>
									<dt>function</dt>
									<dd>
										search/<br></br> common Gallery/<br></br> user Gallery
									</dd>
								</dl>
							</li>
						</ul>
					</div>
				</div>
			</section>

			<div className='line-holizontal'></div>

			<section className='galleryBox'>
				{Pics.map((pic /*, idx*/) => {
					console.log(pic.server);
					return (
						// URL : https://www.flickr.com/services/api/misc.urls.html
						<article key={pic.id} className='con-area'>
							<div className='picture'>
								<div className='pic'>
									<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`} />
								</div>
								<h4>{pic.title}</h4>
							</div>

							<div className='profile'></div>
						</article>
					);
				})}
			</section>
		</Layout>
		/* // E : Gallery */
	);
}
