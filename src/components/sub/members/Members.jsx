import './Members.scss';
import { useHistory } from 'react-router-dom';
import Layout from '../../common/layout/Layout';
import { useRef, useState, useEffect } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';

export default function Members() {
	const history = useHistory();
	const initVal = useRef({ userid: '', pwd1: '', pwd2: '', email: '', comments: '', edu: '', gender: '', interest: [] });
	const [Val, setVal] = useState(initVal.current);

	const DebouncedVal = useDebounce(Val);
	const [Errs, setErrs] = useState({});

	const handleReset = () => {
		setVal(initVal.current);
	};

	const handleChange = e => {
		// console.log('name', e.target.name);
		// console.log('value', e.target.value);
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleCheck = e => {
		const { name } = e.target;
		const inputs = e.target.parentElement.querySelectorAll('input');
		const checkArr = [];
		inputs.forEach(input => input.checked && checkArr.push(input.value));
		setVal({ ...Val, [name]: checkArr });
	};

	const check = value => {
		// console.log('check');
		const errs = {};
		const num = /[0-9]/; //정규 표현식 (조건안의 내용이 true여야 반환)
		const txt = /[a-zA-Z]/;
		const spc = /[!@#$%^&*()[\]_.+]/;
		const [m1, m2] = value.email.split('@'); //예약어
		const m3 = m2 && m2.split('.'); // m2스플릿을 통해 값이 없으면 입력이 안되게 처리

		if (value.userid.length < 5) errs.userid = '* 아이디는 최소 5글자 이상 입력하세요';
		if (value.comments.length < 10) errs.comments = '* 남기는 말은 최소 10글자 이상 입력하세요';
		if (!value.gender) errs.gender = '* 성별을 선택하세요';
		if (value.interest.length === 0) errs.interest = '* 관심사를 하나이상 선택하세요.';
		if (!value.edu) errs.edu = '* 최종학력을 선택하세요.';
		if (value.pwd1 !== value.pwd2 || !value.pwd2) errs.pwd2 = '* 두개의 비밀번호를 같게 입력하세요.';
		if (!m1 || !m2 || !m3[0] || !m3[1]) errs.email = '* 올바른 이메일 형식으로 입력하세요';
		if (!num.test(value.pwd1) || !txt.test(value.pwd1) || !spc.test(value.pwd1) || value.pwd1.length < 5)
			errs.pwd1 = '* 비밀번호는 특수문자, 문자, 숫자를 모두포함해서 5글자 이상 입력하세요.';

		return errs;
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (Object.keys(check(Val)).length === 0) {
			alert('회원가입을 축하합니다.');
			history.push('/welcome/3');
		}
	};

	useEffect(() => {
		setErrs(check(DebouncedVal));
	}, [DebouncedVal]);

	return (
		/* S : Members */
		<Layout title={'Members'}>
			<section className='visualBox'>
				<div className='txt-area'>
					<h3>Enjoy various services after signing up</h3>
					<p>
						Creating true brands together. Get in touch with us!
						<br />
						Complete the form below to discuss your project. We can't wait to collaborate and bring your vision to life. The duration of the branding
						process varies depending on the complexity of the project. On average, it can take anywhere from several weeks to a few months.
					</p>
				</div>
			</section>

			<div className='line-holizontal'></div>

			<section className='memberBox'>
				<div className='txt-area'>
					<h3>JOIN US</h3>

					<p>Meet our talented team of creative minds driving innovation.</p>
				</div>

				<div className='con-area'>
					<div className='line-vertical'></div>

					<article className='formBox'>
						<form onSubmit={handleSubmit}>
							<fieldset>
								<legend className='h'>회원가입 폼</legend>
								<table>
									<tbody>
										{/* userid, email */}
										<tr>
											<td>
												<input type='text' name='userid' placeholder='User ID' value={Val.userid} onChange={handleChange} />
												{Errs.userid && <p>{Errs.userid}</p>}
											</td>
											<td>
												<input type='text' name='email' placeholder='User@Email.bla' value={Val.email} onChange={handleChange} />
												{Errs.email && <p>{Errs.email}</p>}
											</td>
										</tr>

										{/* pwd1, pwd2 */}
										<tr>
											<td>
												<input type='password' name='pwd1' placeholder='Password' value={Val.pwd1} onChange={handleChange} />
												{Errs.pwd1 && <p>{Errs.pwd1}</p>}
											</td>
											<td>
												<input type='password' name='pwd2' placeholder='Re-Password' value={Val.pwd2} onChange={handleChange} />
												{Errs.pwd2 && <p>{Errs.pwd2}</p>}
											</td>
										</tr>

										{/* edu */}
										<tr>
											<td colSpan='2'>
												<select name='edu' onChange={handleChange}>
													<option value=''>Education</option>
													<option value='elementary-school'>초등학교 졸업</option>
													<option value='middle-school'>중학교 졸업</option>
													<option value='high-school'>고등학교 졸업</option>
													<option value='college'>대학교 졸업</option>
												</select>
												{Errs.edu && <p>{Errs.edu}</p>}
											</td>
										</tr>

										{/* gender */}
										<tr>
											<td colSpan='2'>
												<div className='line'>
													<input type='radio' defaultValue='female' id='female' name='gender' onChange={handleChange} />
													<label htmlFor='female'>Female</label>

													<input type='radio' defaultValue='male' id='male' name='gender' onChange={handleChange} />
													<label htmlFor='male'>Male</label>
												</div>
												{Errs.gender && <p>{Errs.gender}</p>}
											</td>
										</tr>

										{/* interests */}
										<tr>
											<td colSpan='2'>
												<div className='line'>
													<input type='checkbox' name='interest' id='sports' defaultValue='sports' onChange={handleCheck} />
													<label htmlFor='sports'>Sports</label>

													<input type='checkbox' name='interest' id='reading' defaultValue='reading' onChange={handleCheck} />
													<label htmlFor='reading'>Reading</label>

													<input type='checkbox' name='interest' id='music' defaultValue='music' onChange={handleCheck} />
													<label htmlFor='music'>Music</label>

													<input type='checkbox' name='interest' id='game' defaultValue='game' onChange={handleCheck} />
													<label htmlFor='game'>Game</label>
												</div>
												{Errs.interest && <p>{Errs.interest}</p>}
											</td>
										</tr>

										{/* comments */}
										<tr>
											<td colSpan='2'>
												<textarea
													name='comments'
													cols='30'
													rows='10'
													placeholder='Leave a comment'
													value={Val.comments}
													onChange={handleChange}></textarea>
												{Errs.comments && <p>{Errs.comments}</p>}
											</td>
										</tr>

										{/* button set */}
										<tr>
											<td colSpan='2'>
												<div className='btn-area'>
													<input type='reset' value='Cancel' className='btn' onClick={handleReset} />
													<input type='submit' value='Submit' className='btn' />
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</fieldset>
						</form>
					</article>
				</div>
			</section>
		</Layout>
		/* E : Members */
	);
}
