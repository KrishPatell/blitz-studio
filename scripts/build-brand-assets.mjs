// Export the approved studio mark for browsers, search results and home screens.
import sharp from 'sharp';
import {mkdir,writeFile} from 'node:fs/promises';
await mkdir('dist/assets/icons',{recursive:true});
await mkdir('dist/assets/social',{recursive:true});
const mark='dist/assets/mark.png';
for(const size of [16,32,48,96,192,512]){
 await sharp(mark).resize(size,size).flatten({background:'#ffffff'}).png().toFile(`dist/assets/icons/icon-${size}.png`);
}
await sharp(mark).resize(180,180).flatten({background:'#ffffff'}).png().toFile('dist/apple-touch-icon.png');
const safeMark=await sharp(mark).resize(384,384).png().toBuffer();
await sharp({create:{width:512,height:512,channels:4,background:'#ffffff'}}).composite([{input:safeMark,left:64,top:64}]).png().toFile('dist/assets/icons/icon-maskable-512.png');
const frames=await Promise.all([16,32,48].map(size=>sharp(mark).resize(size,size).flatten({background:'#ffffff'}).png().toBuffer()));
const header=Buffer.alloc(6+frames.length*16);header.writeUInt16LE(1,2);header.writeUInt16LE(frames.length,4);let offset=header.length;
frames.forEach((data,i)=>{const start=6+i*16;header[start]=[16,32,48][i];header[start+1]=header[start];header.writeUInt16LE(1,start+4);header.writeUInt16LE(32,start+6);header.writeUInt32LE(data.length,start+8);header.writeUInt32LE(offset,start+12);offset+=data.length});
await writeFile('dist/favicon.ico',Buffer.concat([header,...frames]));
console.log('Exported multi-size favicon, Apple touch icon, application icons and maskable icon from the approved mark.');
