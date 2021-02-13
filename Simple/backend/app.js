const express = require('express')

const app = express();


const PORT = 4000;

app.get("/", (req, res, next) => {
	res.status(200).json({
		message: "Welcome to Micro Services"
	})
})

app.listen(PORT, () => {
	console.log(`App Running on PORT: ${PORT}`)
})