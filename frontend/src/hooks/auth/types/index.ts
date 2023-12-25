export interface ISignIn {
	readonly email: string;
	readonly password: string;
}

export interface ISignOut {
	readonly sesionId: string;
}
