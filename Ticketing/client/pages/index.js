import axios from 'axios'

const LandingPage = ({ currentUser }) => {
	console.log("I am in the component", currentUser)
	return (
		<div>
			<h3> Home Page</h3>
		</div>
	)
}

LandingPage.getInitialProps = (req) => {
	console.log(req.headers)
	if (typeof window === undefined) {
		const { data } = axios.get("http://ingress-nginx.ingress-nginx.svc.cluster.local/api/users/currentuser", {
			headers: {
				...req.headers,
				'Content-Type': 'application/json',
			},
			withCredentials: true
		})
		return {
			...data
		}
	} else {
		const { data } = axios.get("/api/users/currentuser")
		return {
			...data
		}
	}

	// return { currentUser }

}

export default LandingPage
