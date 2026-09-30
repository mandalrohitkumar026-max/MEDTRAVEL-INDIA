import { db } from '../data/db.js';

export function login(req, res) {
  const { email, role } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required' });
  }

  let user = db.findUserByEmail(email);

  if (!user) {
    // If not found, provision for test/demo ease
    user = db.createUser({
      name: email.split('@')[0],
      email: email,
      role: role || 'PATIENT',
      country: 'International'
    });
  }

  // If specific role requested for demo switching
  if (role && user.role !== role) {
    user.role = role;
  }

  return res.json({
    success: true,
    data: {
      user,
      token: user.email // Lightweight token for demo architecture
    }
  });
}

export function register(req, res) {
  const { name, email, country, phone, treatment } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Name and email are required' });
  }

  const existing = db.findUserByEmail(email);
  if (existing) {
    return res.status(409).json({ success: false, error: 'An account with this email already exists' });
  }

  const newUser = db.createUser({
    name,
    email,
    country: country || 'International',
    phone: phone || '',
    role: 'PATIENT'
  });

  return res.status(201).json({
    success: true,
    data: {
      user: newUser,
      token: newUser.email
    }
  });
}

export function getCurrentUser(req, res) {
  if (!req.user) {
    return res.status(401).json({ success: false, error: 'Not authenticated' });
  }
  return res.json({
    success: true,
    data: req.user
  });
}

export function logout(req, res) {
  return res.json({
    success: true,
    message: 'Logged out successfully'
  });
}
