import { Jimp } from 'jimp';

async function main() {
  const image = await Jimp.read('C:/Users/Arzuman/.gemini/antigravity-ide/brain/bc4ddd45-13e4-4972-bf5b-ceb16c91ad2e/.user_uploaded/media_1791127288498.png');
  const color = image.getPixelColor(0, 0);
  const br = (color >> 24) & 255;
  const bg = (color >> 16) & 255;
  const bb = (color >> 8) & 255;
  
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    // Use an aggressive chroma key for blue colors
    // We want to make any blue-ish pixel transparent.
    // The logo is white/silver, which has R, G, B roughly equal.
    // Blue background has high B and low R/G.
    // Let's remove anything where B is dominant over R by at least 20
    if (b > r + 20 && b > g + 5) {
      this.bitmap.data[idx + 3] = 0; // completely transparent
    }
  });

  image.write('assets/logo_transparent.png');
  console.log("Done");
}
main();
