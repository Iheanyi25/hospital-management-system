export function formatFees({ fees, value, title }) {
	return fees?.length > 0
		? fees.map((fee) => {
				return {
					value: fee[value],
					label: `${fee[title]}`
				};
		  })
		: [];
}
