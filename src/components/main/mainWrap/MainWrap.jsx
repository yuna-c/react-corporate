import Info from '../info/Info';
import Visual from '../visual/Visual';
import './MainWrap.scss';

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
