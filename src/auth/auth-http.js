export class AuthConfigConsts {
	DEFAULT_TOKEN_NAME = 'jwt';
	DEFAULT_HEADER_NAME = 'Authorization';
	HEADER_PREFIX_BEARER = 'Bearer ';
}

export function tokenNotExpired(tokenName, jwt) {
	const token = jwt || localStorage.getItem(tokenName)
	return token !== null
}

export function saveToken(tokenName, jwt) {
	localStorage.setItem(tokenName, jwt)
}

export function removeToken(tokenName) {
	localStorage.removeItem(tokenName)
}
