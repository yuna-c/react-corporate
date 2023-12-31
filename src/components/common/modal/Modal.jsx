import { useEffect } from 'react';
import './Modal.scss';
import { AnimatePresence, motion } from 'framer-motion';

// 모달 컴포넌트 자체적으로 특정 state값에 따라서 자기 자신의 컨텐츠를 보여줄 지 말지 결정
// 기존이랑 다른점
// : 부모 컴퍼넌트 기준에서 Modal 컴포넌트는 계속 마운트되어 있는 상태이지만 state값에 따라서 Dom 출력 유무만 변경

/* framer : 간단한 모션만 가능ㅎ..
	framer react : https://www.framer.com/motion/
	https://www.npmjs.com/package/framer-motion
	npm i framer-motion@4

	AnimatePresence : 모션을 적용할 컴포넌트의 wrapping 컴포넌트 지정
	- 자식요소의 모션이 끝날 때 까지 언마운트 되는 시점을 holding 처리
	- motion : 모션을 걸고싶은 JSX컴포넌트에 연결해서 inital, animate, exit 라는 속성으로 모션 수치값을 조절 가능

  -inital : 모션이 일어나기 전 상태값
  -animate : 모션이 일어날 때의 상태값
  -exit : 사라질 때의 값
*/

export default function Modal({ Open, setOpen, children }) {
	// useEffect(() => {
	//   // 모달창 생성시 스크롤 기능 제거
	//   document.body.style.overflow = "hidden";
	//   return () => {
	//     // 모달창 제거시 스크롤 기능 생성
	//     document.body.style.overflow = "auto";
	//   };
	// }, []);

	return (
		/* S : Modal */
		<>
			<AnimatePresence>
				{Open && (
					<motion.aside
						className='Modal'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { delay: 0.5 } }}
						transition={{ duration: 1 }}>
						<motion.div
							className='con'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0, transition: { delay: 0 } }}
							transition={{ duration: 0.5, delay: 0.5 }}>
							{children}
						</motion.div>
						<span onClick={() => setOpen(false)}>close</span>
					</motion.aside>
				)}
			</AnimatePresence>
		</>
		/* E : Modal */
	);
}
