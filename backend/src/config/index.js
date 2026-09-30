export const config = {
  port: process.env.PORT || 5000,
  corsOrigins: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  environment: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'medtravel-in-super-secret-key-2026',
  allowedDocExtensions: ['.pdf', '.jpg', '.jpeg', '.png', '.dicom', '.dcm'],
  disallowedExtensions: ['.exe', '.bat', '.cmd', '.sh', '.msi', '.vbs', '.scr'],
  maxFileSizeMB: 25,
};
