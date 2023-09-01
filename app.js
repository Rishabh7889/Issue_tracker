const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Sample data for demonstration purposes
const issues = [
  { id: 1, title: 'Issue 1', description: 'This is the first issue.', status: 'Open' },
  { id: 2, title: 'Issue 2', description: 'This is the second issue.', status: 'Closed' },
];

// Routes
app.get('/', (req, res) => {
  res.render('index', { issues });
});

app.get('/issues/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const issue = issues.find((item) => item.id === id);
  if (issue) {
    res.render('issue', { issue });
  } else {
    res.status(404).send('Issue not found.');
  }
});

// Add more routes for issue creation, update, and deletion
app.post('/issues', (req, res) => {
    const { title, description } = req.body;
    const newIssue = {
      id: issues.length + 1,
      title,
      description,
      status: 'Open',
    };
    issues.push(newIssue);
    res.redirect('/');
  });

  // Route for handling the issue closing action
app.post('/issues/:id/close', (req, res) => {
    const id = parseInt(req.params.id);
    const issue = issues.find((item) => item.id === id);
    if (issue) {
      issue.status = 'Closed';
      res.redirect(`/issues/${id}`);
    } else {
      res.status(404).send('Issue not found.');
    }
});

// Route for handling the issue deletion action
app.post('/issues/:id/delete', (req, res) => {
    const id = parseInt(req.params.id);
    const issueIndex = issues.findIndex((item) => item.id === id);
    if (issueIndex !== -1) {
      issues.splice(issueIndex, 1);
    }
    res.redirect('/');
  });
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
