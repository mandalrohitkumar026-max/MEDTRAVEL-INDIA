import { db } from '../data/db.js';

export function getAllHotels(req, res) {
  const { city, hospitalId, wheelchairOnly } = req.query;
  const hotels = db.findHotels({ city, hospitalId, wheelchairOnly });
  return res.json({
    success: true,
    count: hotels.length,
    data: hotels
  });
}

export function getHotelById(req, res) {
  const { id } = req.params;
  const hotel = db.hotels.find(h => h.id === id);

  if (!hotel) {
    return res.status(404).json({ success: false, error: 'Hotel partner not found' });
  }

  return res.json({
    success: true,
    data: hotel
  });
}
