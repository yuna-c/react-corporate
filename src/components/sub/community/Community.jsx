import './Community.scss';
import Layout from '../../common/layout/Layout';
import { useEffect, useRef, useState } from 'react';
import { useCustomText } from '../../../hooks/useText';
import { AnimatePresence, motion } from 'framer-motion';

export default function Community() {
	const path = useRef(process.env.PUBLIC_URL);
	const customText = useCustomText('combined');
	// console.log(customText);

	const getLocalData = () => {
		const data = localStorage.getItem('post');
		// JSON.parse 문자열의 구문을 분석, Js 값이나 객체를 생성
		// if (data) JSON.parse(data);
		return JSON.parse(data);
		//return postData.dummyPosts; info []빈배열에 json 파일 넣기
	};
	// console.log(getLocalData());

	const [Post, setPost] = useState(getLocalData()); //핸들링 위한 state
	const [CurNum, setCurNum] = useState(0); //페이징 버튼 클릭시 현재 보일 페이지 번호가 담길 state
	const [PageNum, setPageNum] = useState(0); //전체 PageNum이 담길 state

	const refTit = useRef(null);
	const refEmail = useRef(null);
	const refCon = useRef(null);
	const refEditTit = useRef(null);
	const refEditCon = useRef(null);
	const editMode = useRef(false);
	const len = useRef(0); //전체 Post갯수를 담을 참조 객체
	const pageNum = useRef(0); //전체 페이지 갯수를 추후에 연산해서 담을 참조객체
	const perNum = useRef(6); //한 페이지당 보일 포스트 갯수

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
		// resetPost();
	};

	const deletePost = delIndex => {
		if (!window.confirm('정말 해당 게시글을 삭제하겠습니까?')) return;

		setPost(Post.filter((_, idx) => delIndex !== idx));
		// filter(callbackFn, thisArg) : 메서드는 주어진 배열의 일부에 대한 얕은 복사본을 생성, 주어진 배열에서 제공된 함수에 의해 구현된 테스트를 통과한 요소로만 필터링
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
		// console.log("update");
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
		//Post데이터가 변경되면 수정모드를 강제로 false처리하면서 로컬저장소에 저장하고 컴포넌트 재실행
		Post.map(el => (el.enableUpdate = false));
		localStorage.setItem('post', JSON.stringify(Post));

		//전체 Post갯수 구함
		len.current = Post.length;

		//전체 페이지버튼 갯수 구하는 공식
		//전체 데이터갯수 / 한 페이지당 보일 포스트 갯수 (딱 나눠떨어지면 나눈 몫을 바로 담음)
		//전체 데이터갯수 / 한 페이지당 보일 포스트 갯수 (만약 나머지가 1,2개 남으면 나눈 몫의 1을 더한값)

		pageNum.current = len.current % perNum.current === 0 ? len.current / perNum.current : parseInt(len.current / perNum.current) + 1;
		// console.log(pageNum.current);

		//새로고침했을때 페이징 버튼이 안뜨는 문제
		//원인 : 현재 로직이 Post값자체게 변경되면 pageNum.current값이 변경되게 하고 있는데..
		//pageNum.current가 변경되고 state가 아니기 때문에 화면을 자동 재랜더링하지 않는 문제 발생
		//해결방법 : 만들어진 참조객체값을 state PageNum에 옮겨담음
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
						{/* form tag 있으면 전송되면서 새로고침 됨 */}
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
						const strDate2 = customText(date.split('Z')[0].slice(12), ':');
						const time = Math.floor(strDate2);

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
