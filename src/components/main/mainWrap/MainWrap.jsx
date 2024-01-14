import './MainWrap.scss';
import Info from '../info/Info';
import Pics from '../pics/Pics';
import Btns from '../btns/Btns';
import Banner from '../banner/Banner';
import Visual from '../visual/Visual';

export default function MainWrap() {
	return (
		/* S : MainWrap */
		<div className='MainWrap'>
			<Visual />
			<Info />
			<Banner />
			<Pics />
			<Btns />
		</div>
		/* E : MainWrap */
	);
}
