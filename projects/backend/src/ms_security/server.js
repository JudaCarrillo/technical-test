import Hapi from '@hapi/hapi';
import { createTokenRoutes } from './routes/token.route.js';
import { TokenModel } from './models/mysql/token.model.js';

const init = async () => {
	const hapi = Hapi;
	const server = hapi.Server({
		port: process.env.PORT ?? 3000,
		host: 'localhost'
	});

	server.route(createTokenRoutes({ tokenModel: TokenModel }))

	await server.start();
	console.log('Server running on:  %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

init();