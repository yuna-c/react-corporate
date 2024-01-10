import { useQuery } from '@tanstack/react-query';

const path = process.env.PUBLIC_URL;

const fetchValue = async () => {
	const response = await fetch(`${path}/DB/value.json`);
	const data = await response.json();
	return data.values;
};

export const useValueQuery = () => {
	return useQuery(['fetchValue'], fetchValue, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		retry: 3
	});
};
