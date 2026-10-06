"""Optional media regeneration: requires ffmpeg with libx264 on PATH."""
from pathlib import Path
import subprocess
root=Path(__file__).resolve().parents[1]/'dist/assets'
for original in (root/'reference').glob('service-*.webm'):
 subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(original),'-vf',"scale='min(1280,iw)':-2",'-c:v','libx264','-preset','medium','-crf','23','-pix_fmt','yuv420p','-an','-movflags','+faststart',str(original.with_suffix('.mp4'))],check=True)
subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(root/'blitz-reel.mp4'),'-vf','scale=720:-2:out_range=tv','-c:v','libx264','-preset','medium','-crf','24','-color_range','tv','-pix_fmt','yuv420p','-an','-movflags','+faststart',str(root/'blitz-reel-mobile.mp4')],check=True)
