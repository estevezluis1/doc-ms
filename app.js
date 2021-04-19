const exec = require('child_process').exec;
const express = require('express');
const path = require('path');
const app = express();

const PORT = 8080;

app.use(express.static(path.join(__dirname, 'static')))

app.get('/search', (req, res) => {
	exec(`recollq -q "${req.query.query}"`, (err, stdout, stderr) => {

		const results = stdout.split('\n');

		for (i = 2; i < results.length - 1; i++) {
			const temp = results[i].split('\t');
			results[i] = { content_type: temp[0], path: temp[1], filename: temp[2], size: temp[3] };
		}

		const response = {
			total: results[1].split(' ')[0],
			results: results.slice(2, results.length -1)
		};

		return res.json(response);
	});
});

app.listen(PORT, (err) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log(`listening on PORT ${PORT}`);
});
