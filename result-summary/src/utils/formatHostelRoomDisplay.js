export function formatHostelRoomDisplay({ rooms, value, name }) {
	return rooms?.length > 0
		? rooms.map((room) => {
				return {
					value: room[value],
					label: room[name]
				};
		  })
		: [];
}
