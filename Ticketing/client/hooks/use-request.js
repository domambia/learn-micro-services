import axios from 'axios'
import { useState } from 'react'

const useRequest = ({ url, method, body, onSuccess }) => {
	// method = POST.
	const [errors, setErrors] = useState(null)
	const [config, setConfig] = useState({
		headers: { 'Content-Type': 'application/json' },
		withCredentials: true
	})

	const doRequest = async () => {
		try {
			setErrors(null)
			const response = await axios[method](url, body
			); //{ withCredentials: true }

			console.log(response.headers)
			if (onSuccess) {
				onSuccess(response.data)
			}
		} catch (err) {
			setErrors(
				<div className="alert alert-danger">
					<h4>Oooops ......</h4>
					<ul className="my-0">
						{err.response.data.errors.map(err => <li key={err.message}>{err.message} </li>)}
					</ul>
				</div>
			)
		}
	}

	return { doRequest, errors }
}

export default useRequest