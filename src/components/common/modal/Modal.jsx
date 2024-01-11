import './Modal.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useGlobalData } from '../../../hooks/useGlobalData';

export default function Modal({ Open, setOpen, children }) {
	const { ModalOpen, setModalOpen } = useGlobalData();

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
				{ModalOpen && (
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
						<span onClick={() => setModalOpen(false)}>close</span>
					</motion.aside>
				)}
			</AnimatePresence>
		</>
		/* E : Modal */
	);
}
