import { useQuery } from '@tanstack/react-query';

const path = process.env.PUBLIC_URL;

const fetchMoblie = async () => {
	const response = await fetch(`${path}/DB/mobileMenu.json`);
	const data = await response.json();
	return data.moblie;
};

export const useMobileQuery = () => {
	return useQuery(['fetchMoblie'], fetchMoblie, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		retry: 3
	});
};
