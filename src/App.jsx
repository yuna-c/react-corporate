import { useState } from 'react';
import './globalStyles/Reset.scss';
import './globalStyles/Common.scss';
import './globalStyles/Variables.scss';
import { Route } from 'react-router-dom';
import { useMedia } from './hooks/useMedia';
import Eeee from './components/sub/eeee/Eeee';
import { AnimatePresence } from 'framer-motion';
import Menu from './components/common/menu/Menu';
import Mouse from './components/sub/mouse/Mouse';
import Detail from './components/sub/youtube/Detail';
import { useGlobalData } from './hooks/useGlobalData';
import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import Members from './components/sub/members/Members';
import Contact from './components/sub/contact/Contact';
import Youtube from './components/sub/youtube/Youtube';
import Gallery from './components/sub/gallery/Gallery';
import AboutUs from './components/sub/aboutUs/AboutUs';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CookieModal from './components/common/cookieModal/CookieModal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {
	const { Toggle, Mode } = useGlobalData();
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<div className={`wrap ${Mode === 'light' ? 'light' : 'dark'} ${useMedia()}`}>
				<div className='wrapper'>
					<Header />
					<Route path='/eeee' component={Eeee} />
					<Route path='/mouse' component={Mouse} />
					<Route exact path='/' component={MainWrap} />
					<Route path='/aboutUs' component={AboutUs} />
					<Route path='/gallery' component={Gallery} />
					<Route path='/members' component={Members} />
					<Route path='/contact' component={Contact} />
					<Route path='/youtube' component={Youtube} />
					<Route path='/detail/:id' component={Detail} />
					<Route path='/community' component={Community} />
					<Footer />
					<AnimatePresence>{Toggle && <Menu />}</AnimatePresence>
					<CookieModal wid={300} ht={200}>
						<h1>쿠키팝업</h1>
					</CookieModal>
				</div>
			</div>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
