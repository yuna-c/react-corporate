import './MainWrap.scss';
import Info from '../info/Info';
import Visual from '../visual/Visual';

export default function MainWrap() {
	return (
		/* S : MainWrap */
		<div className='MainWrap'>
			<Visual />
			<Info />
		</div>
		/* E : MainWrap */
	);
}
