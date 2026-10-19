import json, sys
from faster_whisper import WhisperModel
m = WhisperModel("large-v3", device="cpu", compute_type="int8")
import librosa
audio, _ = librosa.load(sys.argv[1], sr=16000, mono=True)
segs, info = m.transcribe(audio, language="hr", vad_filter=True, word_timestamps=True,
    condition_on_previous_text=False, beam_size=5,
    initial_prompt="Kralj Tomislav, Thompson. Hrvatska pjesma o prvom hrvatskom kralju.")
out = []
for s in segs:
    out.append({"start": s.start, "end": s.end, "text": s.text.strip(),
                "words": [{"start": w.start, "end": w.end, "text": w.word.strip()} for w in s.words]})
    print(f"{s.start:6.1f}-{s.end:6.1f}  {s.text.strip()}", flush=True)
json.dump(out, open(sys.argv[2], "w"), ensure_ascii=False, indent=1)
print("GOTOVO")
