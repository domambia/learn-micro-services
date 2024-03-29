const express = require('express')

const app = express();


const PORT = 4000;

app.get("/", (req, res, next) => {
	res.status(200).json({
		events: [
			{ title: "welcoming to Kubernates", created_at: "12-01-2021" },
			{ title: "Creating a pod", created_at: "12-01-2021" },
			{ title: "Creating a Deplyment", created_at: "12-01-2021" },
			{ title: "Creating a Serices", created_at: "12-01-2021" },
			{ title: "Using ingress-nginx with kubernetes", created_at: "12-01-2021" },
		]
	})
})

app.listen(PORT, () => {
	console.log("New Version 20")
	console.log(`App Running on PORT: ${PORT}`)
})