import { Jimp } from 'jimp';
async function main() {
  const image = await Jimp.read('assets/images/logo_v2.png');
  // autocrop removes transparent borders
  image.autocrop();
  await image.write('assets/images/logo_v2.png');
  console.log('Cropped!');
}
main();
