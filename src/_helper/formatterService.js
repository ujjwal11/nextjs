const formatCurrency = ($$$, locale) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: locale
	}).format($$$/100);
};

const formatCurrencyIcon = (amount) => {
	return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(amount)
};

const formatCurrencyIconUSD = (amount) => {
	return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
};


export const formatterService = {
	formatCurrency,
	formatCurrencyIcon,
	formatCurrencyIconUSD
};