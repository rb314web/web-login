import { rest } from 'msw';
import { users } from './fixtures';

export const handlers = [
	rest.get('/users', (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(users));
	}),

	rest.post('/add', (req, res, ctx) => {
		users.push(JSON.parse(req.body));
		console.log(users);
		return res(ctx.status(200));
	}),
	rest.post('/checkEmail', (req, res, ctx) => {
		const findEmail = users.find((i) => (i.email === req.body));
		return res(ctx.status(200), ctx.json(findEmail ? true : false));
	}),
	rest.post('/checkLogin', (req, res, ctx) => {
		let checkPassword
		const findUser = users.findIndex((element) => element.email === JSON.parse(req.body).inputEmail)


		if (findUser >= 0){
			checkPassword = users[findUser].password === JSON.parse(req.body).inputPassword
		}




		return res(ctx.status(200), ctx.json(checkPassword  ? users[findUser].userinfo : false));
	}),
];
