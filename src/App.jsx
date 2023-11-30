import { Route } from 'react-router-dom';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import Menu from './components/common/menu/Menu';
import MainWrap from './components/main/mainWrap/MainWrap';
import Department from './components/sub/department/Department';
import Gallary from './components/sub/gallary/Gallary';
import Community from './components/sub/community/Community';
import Members from './components/sub/members/Members';
import Contant from './components/sub/contant/Contant';
import Youtube from './components/sub/youtube/Youtube';
import Detail from './components/sub/youtube/Detail';

import './globalStyles/Reset.scss';
import './globalStyles/Variables.scss';

export default function App() {
	return (
		<div className='wrap'>
			<Header />
			<Route exapt path='/' component={MainWrap} />
			<Route path='/department' component={Department} />
			<Route path='/gallary' component={Gallary} />
			<Route path='/community' component={Community} />
			<Route path='/members' component={Members} />
			<Route path='/contant' component={Contant} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/detail/:id' component={Detail} />
			<Footer />
			<Menu />
		</div>
	);
}
