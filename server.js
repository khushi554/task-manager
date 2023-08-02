const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 5000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom route to handle adding new tasks
server.post('/tasks', (req, res) => {
  const task = req.body;
  task.id = Date.now();
  router.db.get('tasks').push(task).write();
  res.status(201).json(task);
});

server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
