export function formatUserSearch({ users, value, identification, fullName }) {
	return users?.length > 0
		? users.map((user) => {
				return {
					value: user[value],
					label: `${user[identification]} - ${user[fullName]}`.toUpperCase()
				};
		  })
		: [];
}
