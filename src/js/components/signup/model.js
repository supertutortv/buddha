export default model = {
	init: false,
	step: 0,
	update: true,
	loading: true,
	card: false,
	valid: false,
	item: null,
	error: {
		id: '',
		message: ''
	},
	customer: {
		account: {
			email: '',
			firstname: '',
			lastname: '',
			password: ''
		},
		shipping: {
			phone: '',
			name: '',
			address: {}
		},
		options: {},
		token: '',
		nameOnCard: ''
	},
	pricing: {
		total: 0,
		shipping: 0,
		coupon: {
			id: '',
			value: ''
		}
	}
}