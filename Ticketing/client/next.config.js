module.exports = {
	webpackDevMiddleware: config => {
		config.watchOptions.poll = 300; // after 300 milliseconds
		return config;
	}
}