import './Community.scss';
import Layout from '../../common/layout/Layout';
import { useEffect, useRef, useState } from 'react';
import { useCustomText } from '../../../hooks/useText';
import { AnimatePresence, motion } from 'framer-motion';

export default function Community() {
	console.log(document.cookie);
	const path = useRef(process.env.PUBLIC_URL);
	const customText = useCustomText('combined');

	const getLocalData = () => {
		const data = localStorage.getItem('post');
		return JSON.parse(data);
	};

	const [Post, setPost] = useState(getLocalData());
	const [CurNum, setCurNum] = useState(0);
	const [PageNum, setPageNum] = useState(0);

	const refTit = useRef(null);
	const refEmail = useRef(null);
	const refCon = useRef(null);
	const refEditTit = useRef(null);
	const refEditCon = useRef(null);
	const editMode = useRef(false);
	const len = useRef(0);
	const pageNum = useRef(0);
	const perNum = useRef(6);

	const resetPost = () => {
		refTit.current.value = '';
		refEmail.current.value = '';
		refCon.current.value = '';
	};

	const createPost = () => {
		if (!refTit.current.value.trim()) {
			return alert('제목을 입력하세요.');
		}
		if (!refEmail.current.value.trim()) {
			return alert('이메일을 입력하세요.');
		}
		if (!refCon.current.value.trim()) {
			return alert('본문을 입력하세요.');
		}
		if (!refTit.current.value.trim() || !refEmail.current.value.trim() || !refCon.current.value.trim()) {
			resetPost();
		}

		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;
		setPost([
			{
				title: refTit.current.value,
				email: refEmail.current.value,
				content: refCon.current.value,
				date: new Date(korTime)
			},
			...Post
		]);
	};

	const deletePost = delIndex => {
		if (!window.confirm('정말 해당 게시글을 삭제하겠습니까?')) return;

		setPost(Post.filter((_, idx) => delIndex !== idx));
	};

	const updatePost = updateIndex => {
		if (!refEditTit.current.value.trim() || !refEditCon.current.value.trim()) {
			return alert('수정할 글의 제목과 본문을 모두 입력하세요.');
		}

		editMode.current = false;

		setPost(
			Post.map((el, idx) => {
				if (updateIndex === idx) {
					el.title = refEditTit.current.value;
					el.content = refEditCon.current.value;
					el.enableUpdate = false;
				}
				return el;
			})
		);
	};

	const enableUpdate = editIndex => {
		if (editMode.current) return;
		editMode.current = true;

		setPost(
			Post.map((el, idx) => {
				if (editIndex === idx) el.enableUpdate = true;
				return el;
			})
		);
	};

	//출력모드
	const disableUpdate = editIndex => {
		editMode.current = false;

		setPost(
			Post.map((el, idx) => {
				if (editIndex === idx) el.enableUpdate = false;
				return el;
			})
		);
	};

	const handleSizeHeight = () => {
		refCon.current.style.height = 'auto';
		refCon.current.style.height = refCon.current.scrollHeight + 'px';
	};

	useEffect(() => {
		Post.map(el => (el.enableUpdate = false));
		localStorage.setItem('post', JSON.stringify(Post));

		len.current = Post.length;
		pageNum.current = len.current % perNum.current === 0 ? len.current / perNum.current : parseInt(len.current / perNum.current) + 1;
		console.log(pageNum.current);
		setPageNum(pageNum.current);
	}, [Post]);
	// console.log(perNum);

	return (
		<Layout title={'Community'}>
			<section className='visualBox'>
				<div className='txt-area'>
					<h3>Feel free to ask questions</h3>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus dolorum fugit illo, qui nihil quae sed? Quis, beatae quam architecto
						neque adipisci nulla repellat quisquam quae ducimus totam non obcaecati?Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
						dolorum fugit illo, qui nihil quae sed? Quis, beatae quam architecto neque adipisci nulla repellat quisquam quae ducimus totam non
						obcaecati?
					</p>
				</div>

				<div className='img-area'>
					<img src={`${path.current}/img/img2.webp`} alt='img' />
				</div>
			</section>

			<div className='line-holizontal'></div>

			<div className='contentBox'>
				<div className='inputBox'>
					<div className='txt-area'>
						<h4>Please feel free to give your opinion</h4>

						<div className='sns-area'>
							<h5>FIND US ON</h5>
							<ul>
								<li>
									<button
										onClick={() => {
											window.open(`https://twitter.com`);
										}}>
										Tw
									</button>
								</li>
								<li>
									<button
										onClick={() => {
											window.open('https://www.facebook.com/');
										}}>
										In
									</button>
								</li>
								<li>
									<button
										onClick={() => {
											window.open('https://www.instagram.com/');
										}}>
										Fa
									</button>
								</li>
							</ul>
						</div>
					</div>

					<form className='form-area' onSubmit={e => e.preventDefault()}>
						<label>Title</label>
						<input type='text' placeholder='Your Title' name='title' required='required' ref={refTit} />
						<label>Email</label>
						<input type='email' placeholder='Your Email' name='email' required='required' ref={refEmail} />
						<label>Message</label>
						<textarea
							placeholder='Your Message'
							rows={15}
							maxLength={'1500'}
							name='content'
							required='required'
							ref={refCon}
							onChange={handleSizeHeight}></textarea>

						<div className='btn-area'>
							<button className='btn' onClick={resetPost}>
								DELETE
							</button>

							<button className='btn' onClick={createPost}>
								SUBMIT
							</button>
						</div>
					</form>
				</div>

				<div className='line-holizontal'></div>

				<div className='showBox'>
					{Post.map((el, idx) => {
						const date = JSON.stringify(el.date);
						const strDate = customText(date.split('T')[0].slice(1), '.');

						if (idx >= perNum.current * CurNum && idx < perNum.current * (CurNum + 1)) {
							return (
								<article key={el + idx}>
									<AnimatePresence>
										<motion.div
											initial={{
												opacity: 0
											}}
											animate={{
												opacity: 1,
												transition: { duration: 0.8, ease: 'linear' }
											}}
											exit={{
												opacity: 0,
												transition: { delay: 0.2, duration: 0.8 }
											}}>
											{el.enableUpdate ? (
												//수정모드
												<>
													<div className='txt-area'>
														<input type='text' defaultValue={el.title} ref={refEditTit} />
														<strong>{el.email}</strong>
														<textarea
															placeholder='Your Message'
															rows={15}
															onChange={handleSizeHeight}
															defaultValue={el.content}
															ref={refEditCon}></textarea>
														<span>{strDate}</span>
													</div>

													<div className='btn-area'>
														<button className='btn' onClick={() => disableUpdate(idx)}>
															Cancel
														</button>
														<button className='btn' onClick={() => updatePost(idx)}>
															Update
														</button>
													</div>

													<div className='line-holizontal'></div>
												</>
											) : (
												//출력모드
												<>
													<div className='txt-area'>
														<h6>{el.title}</h6>
														<strong>{el.email}</strong>
														<p>{el.content}</p>
														<span>{strDate}</span>
													</div>

													<div className='btn-area'>
														<button className='btn' onClick={() => enableUpdate(idx)}>
															Edit
														</button>
														<button className='btn' onClick={() => deletePost(idx)}>
															Delete
														</button>
													</div>

													<div className='line-holizontal'></div>
												</>
											)}
										</motion.div>
									</AnimatePresence>
								</article>
							);
						} else {
							return null;
						}
					})}
				</div>

				<nav className='paginationBox'>
					{Array(PageNum)
						.fill()
						.map((_, idx) => {
							return (
								<button key={idx} onClick={() => idx !== CurNum && setCurNum(idx)} className={`btn ${idx === CurNum ? 'on' : ''}`}>
									{idx + 1}
								</button>
							);
						})}
				</nav>
			</div>
		</Layout>
	);
}
