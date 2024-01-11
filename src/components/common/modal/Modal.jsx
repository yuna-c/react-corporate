import './Modal.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useGlobalData } from '../../../hooks/useGlobalData';

export default function Modal({ children }) {
	const { ModalOpen, setModalOpen } = useGlobalData();

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
