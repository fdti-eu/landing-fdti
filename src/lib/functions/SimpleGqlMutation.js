export default async function SimpleGqlMutation(table_op, operation_name, objects, query_root) {
	console.log('executing ' + operation_name);

	let query2 = {
		query: 'mutation ' + operation_name + ' { ' + table_op + '(objects: ' + objects + ') { affected_rows }}',
		variables: null,
		operationName: operation_name
	};

	console.log(query2);

	let resultat = await fetch(query_root, {
		headers: {
			accept: '*/*',
			'accept-language': 'en-US,en;q=0.9,fr;q=0.8',
			'content-type': 'application/json',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'cors',
			'sec-fetch-site': 'same-origin'
		},
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: JSON.stringify(query2),
		method: 'POST',
		mode: 'cors',
		credentials: 'include'
	});

	let resultat_2 = await resultat.json();

	return resultat_2;
}
