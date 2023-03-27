import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ parent, params }) => {
	const { session, supabase } = await parent();
	if (!session) {
		throw redirect(303, '/admin');
	}
	console.log('hello');
	const { data: requests } = await supabase
		.from('requests')
		.select(
			`created_at, objects (name), activities (label), description, firstName, phone, email, organization, read, services`
		)
		.eq('request_id', params.slug);

	return {
		requests
	};
};
