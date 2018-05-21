requirejs.config({
	baseUrl: './js',
	paths: {
		'jquery': '../tools/jquery-3.3.1.min'
	}
})

requirejs(['index']);