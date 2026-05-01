const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const sequelize = require('./models/index');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');
const { ActivityLog } = require('./models/Extras');
const User = require('./models/User');
const { auth } = require('./middleware/auth');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});
app.set('io', io);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

app.use(cors());
app.use(express.json());

// Serve static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Activity Logs endpoint
app.get('/api/activities', auth, async (req, res) => {
  try {
    const activities = await ActivityLog.findAll({
      include: [{ model: User, as: 'user', attributes: ['name'] }],
      order: [['createdAt', 'DESC']],
      limit: 50
    });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log('Database synced');
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});
