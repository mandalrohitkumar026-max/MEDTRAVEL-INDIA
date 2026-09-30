import { db } from '../data/db.js';

/**
 * Extracts authenticated user from request headers.
 * Accepts:
 *  - X-User-Email
 *  - X-User-Role
 *  - Authorization: Bearer <email_or_token>
 */
export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  const headerEmail = req.headers['x-user-email'];
  const headerRole = req.headers['x-user-role'];

  let email = headerEmail;

  if (!email && authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    if (token.includes('@')) {
      email = token;
    } else {
      // Demo JWT fallback
      const found = db.users.find(u => u.id === token || u.role.toLowerCase() === token.toLowerCase());
      if (found) email = found.email;
    }
  }

  if (email) {
    const user = db.findUserByEmail(email);
    if (user) {
      req.user = user;
    } else if (headerRole) {
      // Auto-provision demo session
      req.user = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        role: headerRole,
        country: 'International'
      };
    }
  }

  // Fallback to default demo patient if no header passed in local dev
  if (!req.user && headerRole) {
    const match = db.users.find(u => u.role === headerRole);
    if (match) req.user = match;
  }

  next();
}

export function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Authentication credentials required to access this resource.'
    });
  }
  next();
}

export function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Authentication required.'
    });
  }
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      error: 'Forbidden: Admin privilege required to perform this action.'
    });
  }
  next();
}

export function requirePatient(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Authentication required.'
    });
  }
  if (req.user.role !== 'PATIENT' && req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      error: 'Forbidden: Patient or Admin access required.'
    });
  }
  next();
}
