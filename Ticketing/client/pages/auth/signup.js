import { useState } from 'react'
import Router from 'next/router'
import useRequest from './../../hooks/use-request'

const signup = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const { doRequest, errors } = useRequest({
		url: "/api/users/signup",
		method: "post",
		body: {
			email, password
		},
		onSuccess: () => Router.push("/")
	})

	const onSubmit = async (e) => {
		e.preventDefault();
		doRequest()
	}
	return (
		<div className="d-flex justify-content-center">
			<form onSubmit={onSubmit} className="col-6">
				<h1>  Sign Up</h1>
				<div className="form-group">
					<label htmlFor="email">Email Address</label>
					<input
						value={email}
						onChange={e => setEmail(e.target.value)}
						className="form-control" />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						value={password}
						onChange={e => setPassword(e.target.value)}
						type="password"
						className="form-control" />

				</div>
				{errors}
				<button className="btn btn-primary">Sign Up</button>
			</form>
		</div>
	)
}

export default signup
