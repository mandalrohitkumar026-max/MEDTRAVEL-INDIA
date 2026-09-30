import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import { authenticate } from './middleware/auth.middleware.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

// Route imports
import authRoutes from './routes/auth.routes.js';
import hospitalRoutes from './routes/hospitals.routes.js';
import treatmentRoutes from './routes/treatments.routes.js';
import doctorRoutes from './routes/doctors.routes.js';
import quotationRoutes from './routes/quotations.routes.js';
import documentRoutes from './routes/documents.routes.js';
import hotelRoutes from './routes/hotels.routes.js';
import transportRoutes from './routes/transports.routes.js';
import aiRoutes from './routes/ai.routes.js';

const app = express();

// Global Middlewares
app.use(cors({
  origin: '*', // Allow local frontend during development
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-User-Email', 'X-User-Role']
}));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (process.env.NODE_ENV !== 'test') {
      console.log(`[HTTP] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    }
  });
  next();
});

// Authentication context middleware
app.use(authenticate);

// API Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'MEDTRAVEL INDIA API Server',
    version: '1.0.0',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// Mount Resource Routes
app.use('/api/auth', authRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/treatments', treatmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/quotations', quotationRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/transports', transportRoutes);
app.use('/api/ai', aiRoutes);

// Error Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server if directly invoked
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`=======================================================`);
    console.log(`  MEDTRAVEL INDIA - REST Backend Server Active`);
    console.log(`  Port:      http://localhost:${config.port}`);
    console.log(`  Health:    http://localhost:${config.port}/api/health`);
    console.log(`  API Base:  http://localhost:${config.port}/api`);
    console.log(`=======================================================`);
  });
}

export default app;
