module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.query;

  if (!text) {
    return res.status(400).json({ error: "Teks wajib diisi" });
  }

  try {
    const imageUrl = `https://api.sxtream.xyz/maker/iqc?text=${encodeURIComponent(text)}`;
    
    // Redirect langsung ke gambar
    return res.redirect(302, imageUrl);
  } catch (error) {
    console.error('Error generating image:', error);
    return res.status(500).json({ error: "Gagal generate gambar" });
  }
};
