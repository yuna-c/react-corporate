import './Gallery.scss';
import { Link } from 'react-router-dom';
import { LuSearch } from 'react-icons/lu';
import Modal from '../../common/modal/Modal';
import Masonry from 'react-masonry-component';
import Layout from '../../common/layout/Layout';
import { useEffect, useRef, useState } from 'react';
import { useCustomText } from '../../../hooks/useText';
import { useGlobalData } from '../../../hooks/useGlobalData';
import { useFlickrQuery } from '../../../hooks/useFlickrQuery';

// npm i react-masonry-component@6
// https://www.flickr.com/services/api/

export default function Gallery() {
	const myID = useRef('199645532@N06');
	const path = useRef(process.env.PUBLIC_URL);
	const shortenText = useCustomText('shorten');
	const refFrameWrap = useRef(null);
	const searched = useRef(false);
	const gap = useRef(30);

	const isUser = useRef(myID.current);
	const refNav = useRef(null);
	const [Opt, setOpt] = useState({ type: 'user', id: myID.current });
	const [Open, setOpen] = useState(false);
	const [Index, setIndex] = useState(0);

	const { isSuccess, data: Pics } = useFlickrQuery(Opt);
	// const { setModalOpen } = useGlobalData();

	const activateBtn = e => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach(btn => btn.classList.remove('on'));
		e && e.target.classList.add('on');
	};

	const handleInterest = e => {
		if (e.target.classList.contains('on')) return;
		isUser.current = '';
		activateBtn(e);
		setOpt({ type: 'interest' });
		console.log('hot');
	};

	const handleMine = e => {
		if (e.target.classList.contains('on') || isUser.current === myID.current) return;
		isUser.current = myID.current;
		activateBtn(e);
		setOpt({ type: 'user', id: myID.current });
		console.log('mine');
	};

	const handleUser = e => {
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn();
		setOpt({ type: 'user', id: e.target.innerText });
	};

	const handleSearch = e => {
		e.preventDefault();
		isUser.current = '';
		activateBtn();
		const keyword = e.target.children[0].value;
		if (!keyword.trim()) return;
		e.target.children[0].value = '';
		setOpt({ type: 'search', keyword: keyword });
		searched.current = true;
	};

	useEffect(() => {
		refFrameWrap.current.style.setProperty('--gap', gap.current + 'px');
	}, []);

	return (
		/* S : Gallery */
		<>
			<Layout title={'Gallery'}>
				<section className='visualBox'>
					<div className='txt-area'>
						<h3>New watch gallery</h3>
						<p>
							Discover how we reimagined their brand identity, crafting a compelling narrative that authentically connects with their audience and
							propels their business forward.
						</p>
					</div>

					<div className='con-area'>
						<div className='line-vertical'></div>

						<div className='info'>
							<ul>
								<li>
									<dl>
										<dt>Client</dt>
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
											<Link to='/'>fylla-template.webflow.io</Link>
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
					<div className='txt-area'>
						<div className='icon'>
							<img src={`${path.current}/img/icon05.svg`} alt='icon05.svg' />
						</div>
						<h4>Gallery</h4>

						<article className='controls'>
							<nav className='btnSet' ref={refNav}>
								<button onClick={handleInterest}>Interest Gallery</button>
								<button onClick={handleMine} className='on'>
									My Gallery
								</button>
							</nav>

							<form onSubmit={handleSearch}>
								<input type='text' placeholder='Search' />
								<button className='btnSearch'>
									<LuSearch />
								</button>
							</form>
						</article>
					</div>

					<div className='con-area' ref={refFrameWrap}>
						<div className='line-vertical'></div>

						<Masonry className={'frame'} options={{ transitionDuration: '0.5s', gutter: gap.current }}>
							{isSuccess && searched.current && Pics.length === 0 ? (
								<h2>해당 키워드에 대한 검색결과가 없습니다.</h2>
							) : (
								isSuccess &&
								Pics.map((pic, idx) => {
									// URL : https://www.flickr.com/services/api/misc.urls.html
									return (
										<article
											key={pic.id}
											onClick={() => {
												setOpen(true);
												setIndex(idx);
											}}>
											<div className='picture'>
												<div className='pic'>
													<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />
												</div>
											</div>

											<div className='profile'>
												<h4>&lt;{pic.title}&gt;</h4>

												{pic.description ? <p className='desc'>{shortenText(pic.description._content, 150)}</p> : ''}

												<div className='user'>
													<img
														src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
														alt='사용자 프로필 이미지'
														onError={e => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
													/>
													<span onClick={handleUser}>{pic.owner}</span>
												</div>
											</div>
										</article>
									);
								})
							)}
						</Masonry>
					</div>
				</section>
			</Layout>

			<Modal Open={Open} setOpen={setOpen}>
				{isSuccess && Pics.length !== 0 && (
					<img src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`} alt={Pics[Index].title} />
				)}
			</Modal>
		</>
		/* E : Gallery */
	);
}
