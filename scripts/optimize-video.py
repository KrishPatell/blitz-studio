"""Optional media regeneration: requires ffmpeg with libx264 on PATH."""
from pathlib import Path
import subprocess, json, sys
root=Path(__file__).resolve().parents[1]
assets=root/'dist/assets'
def encode(original, output, width, crf, fps=None):
 filters=f"scale='min({width},iw)':-2:out_range=tv"
 if fps: filters+=f',fps={fps}'
 subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(original),'-vf',filters,'-c:v','libx264','-preset','medium','-crf',str(crf),'-color_range','tv','-pix_fmt','yuv420p','-an','-movflags','+faststart',str(output)],check=True)
if '--posters-only' not in sys.argv:
 for original in (assets/'reference').glob('service-*.webm'):
  encode(original,original.with_suffix('.mp4'),1280,23)
  encode(original,original.with_name(original.stem+'-mobile.mp4'),640,27,24)
 encode(assets/'blitz-reel.mp4',assets/'blitz-reel-mobile.mp4',640,27,24)
 encode(assets/'blitz-reel.mp4',assets/'blitz-reel-desktop.mp4',960,25,24)
# A real portfolio frame is visible immediately while the decorative video loads.
subprocess.run(['node',str(root/'scripts/video-posters.mjs')],cwd=root,check=True)
results=[]
for output in sorted(assets.rglob('*.mp4')):
 if 'service-' not in output.name and 'blitz-reel' not in output.name:continue
 meta=json.loads(subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0','-show_entries','stream=codec_name,pix_fmt,width,height:format=duration','-of','json',str(output)]));v=meta['streams'][0];data=output.read_bytes()
 results.append({'file':str(output.relative_to(root)),'bytes':len(data),'codec':v['codec_name'],'pixel_format':v['pix_fmt'],'width':v['width'],'height':v['height'],'duration':meta['format']['duration'],'faststart':data.find(b'moov')<data.find(b'mdat')})
(root/'docs/uat/video-validation.json').write_text(json.dumps(results,indent=2)+'\n')
print(json.dumps(results,indent=2))
