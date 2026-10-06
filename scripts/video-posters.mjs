import {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';
const require=createRequire(import.meta.url);
const sharp=require(process.env.BLITZ_SHARP_PACKAGE||'sharp');
const frame=execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-ss','2','-i','dist/assets/blitz-reel.mp4','-frames:v','1','-f','image2pipe','-c:v','png','-'],{maxBuffer:16*1024*1024});
await sharp(frame).resize({width:960}).webp({quality:75}).toFile('dist/assets/blitz-reel-poster.webp');
await sharp('dist/assets/reference/service-marketing-materials-poster.png').resize({width:640}).webp({quality:75}).toFile('dist/assets/reference/service-marketing-materials-poster-640.webp');
