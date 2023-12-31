import { useState } from 'react';
import { Route } from 'react-router-dom';
import { useMedia } from './hooks/useMedia';
import { AnimatePresence } from 'framer-motion';
import './globalStyles/Reset.scss';
import './globalStyles/Variables.scss';
import './globalStyles/Common.scss';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import Menu from './components/common/menu/Menu';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Members from './components/sub/members/Members';
import Contact from './components/sub/contact/Contact';
import Youtube from './components/sub/youtube/Youtube';
import Detail from './components/sub/youtube/Detail';
import Gallery from './components/sub/gallery/Gallery';
import AboutUs from './components/sub/aboutUs/AboutUs';
import Eeee from './components/sub/eeee/Eeee';

export default function App() {
	const [Dark, setDark] = useState(false);
	const [Toggle, setToggle] = useState(false);

	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<div className='wrapper'>
				<Header Dark={Dark} setDark={setDark} Toggle={Toggle} setToggle={setToggle} />
				<Route exact path='/' component={MainWrap} />
				<Route path='/aboutUs' component={AboutUs} />
				<Route path='/gallery' component={Gallery} />
				<Route path='/community' component={Community} />
				<Route path='/members' component={Members} />
				<Route path='/contact' component={Contact} />
				<Route path='/youtube' component={Youtube} />
				<Route path='/detail/:id' component={Detail} />
				<Route path='/eeee' component={Eeee} />
				<Footer />
				<AnimatePresence>{Toggle && <Menu setToggle={setToggle} Dark={Dark} setDark={setDark} />}</AnimatePresence>
			</div>
		</div>
	);
}
