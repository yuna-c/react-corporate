import { useState } from 'react';

export default function Eeee() {
	const colors = ['orange', 'hotpink', 'aqua', 'green'];

	const [On, setOn] = useState(false);

	let data = [1, 2, 3, 4, 5];
	let [btnActive, setBtnActive] = useState('');

	const toggleActive = (e) => {
		setBtnActive((prev) => {
			return e.target.value;
		});
	};

	return (
		<div className='ex'>
			<div>
				<h1>Color Chart</h1>

				<ul>
					{colors.map((color, idx) => {
						//return문에서 map을통해 반복적으로 생성되는 가상돔요소에는 무조건 고유의 key값 줘야됨
						//react로 하여금 여러개의 반복요소중에서 수정해야되야 요소를 효율적으로 비교탐색하기 위함
						//간편하게는 반복되는 순서값을 집어넣을수도 있긴하나 권장하진않으므로
						//DB의 각 데이터에 내장되어 있는 Object_id를 활용하거나 실제 데이터와 순번을 결합해서 고유문자값 생성
						return (
							<li key={color + idx} style={{ color: color }}>
								{color}
							</li>
						);
					})}
				</ul>
			</div>

			<div>
				<button className={`btn ${On ? 'on' : ''}`} onClick={() => setOn(!On)}>
					{/* ${On && 'on'} */}
					한개만 액티브 돼
				</button>
			</div>

			<div>
				{data.map((item, idx) => {
					return (
						<>
							<button key={item + idx} value={idx} className={`btn ${idx == btnActive ? 'on' : ''}`} onClick={toggleActive}>
								{/* 'btn' + (idx == btnActive ? ' on' : '') */}
								{item}
							</button>
						</>
					);
				})}
			</div>
		</div>
	);
}
