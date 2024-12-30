const path = require('path');

module.exports = {
	root: true,
	extends: ['plugin:@wordpress/eslint-plugin/recommended'],
	settings: {
		'import/resolver': {
			webpack: {
				config: {
					resolve: {
						alias: {
							'@styles': path.resolve(__dirname, 'src/styles'),
							'@components': path.resolve(
								__dirname,
								'src/components'
							),
							'@hooks': path.resolve(__dirname, 'src/hooks'),
							'@config': path.resolve(__dirname, 'src/config'),
						},
					},
				},
			},
		},
	},
};
