export default function handler(req, res) {
  const phones = [
    {
      id: 1,
      name: 'iPhone 14 Pro',
      price: 999,
      image: 'https://images.unsplash.com/photo-1663499482523-1c0c16742f85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTR8ZW58MHx8MHx8fDA%3D',
      description: 'Jaunākais Apple flagmanis ar Dynamic Island.'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S23',
      price: 850,
      image: 'https://images.unsplash.com/photo-1675789332517-5c0c16742f85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FsYXh5JTIwczIzfGVufDB8fDB8fHww',
      description: 'Jaudīgs Android telefons ar lielisku kameru.'
    },
    {
      id: 3,
      name: 'Google Pixel 7',
      price: 650,
      image: 'https://images.unsplash.com/photo-1665911934967-3c0c16742f85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl4ZWwlMjA3fGVufDB8fDB8fHww',
      description: 'Tīrs Android un mākslīgā intelekta iespējas.'
    }
  ];

  res.status(200).json(phones);
}
