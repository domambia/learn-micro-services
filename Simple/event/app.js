const express = require('express')

const app = express();


const PORT = 4001;

app.get("/", (req, res, next) => {
	res.status(200).json({
		posts: [
			{ title: "welcome to Kubernates", created_at: "12-01-2021" },
			{ title: "Creating a pod", created_at: "12-01-2021" },
			{ title: "Creating a Deplyment", created_at: "12-01-2021" },
			{ title: "Creating a Serices", created_at: "12-01-2021" },
			{ title: "Using ingress-nginx with kubernetes", created_at: "12-01-2021" },
		]
	})

	//send an event to event /


})


app.listen(PORT, () => {
	console.log(`App Running on PORT: ${PORT}`)
})