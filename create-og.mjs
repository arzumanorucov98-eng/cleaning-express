import { Jimp } from 'jimp';

// Paylaşım (WhatsApp/Facebook) üçün 1200x630 ön baxış şəkli yaradır
const img = await Jimp.read('./assets/images/og-source.png');
img.cover({ w: 1200, h: 630 });
await img.write('./assets/images/og-banner.jpg', { quality: 90 });
console.log('og-banner.jpg created!', img.bitmap.width, img.bitmap.height);
