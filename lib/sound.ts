"use client";

/**
 * Synthesized WebAudio. Everything is gentle and opt-in — gated by the menubar
 * sound toggle (off by default). The AudioContext is created lazily on the first
 * user gesture (the toggle), so it never trips autoplay policy.
 */
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noiseBuffer: AudioBuffer | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function out(): AudioNode {
  return master ?? ctx!.destination;
}

function noise(c: AudioContext): AudioBuffer {
  if (noiseBuffer) return noiseBuffer;
  const len = c.sampleRate * 2;
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    last = (last + 0.02 * w) / 1.02; // brown-ish noise
    d[i] = last * 3.2;
  }
  noiseBuffer = buf;
  return buf;
}

function blip(freq: number, dur: number, gain: number, type: OscillatorType = "sine") {
  const c = audio();
  if (!c) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  o.connect(g);
  g.connect(out());
  const t = c.currentTime;
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.start(t);
  o.stop(t + dur);
}

/* ---------------------------------------------------------------- UI blips --- */

export type UISound = "open" | "close" | "focus" | "on";

export function uiSound(kind: UISound) {
  switch (kind) {
    case "open":
      blip(523.25, 0.1, 0.05);
      break;
    case "close":
      blip(311.13, 0.09, 0.04);
      break;
    case "focus":
      blip(440, 0.04, 0.025);
      break;
    case "on":
      blip(440, 0.07, 0.04);
      window.setTimeout(() => blip(659.25, 0.09, 0.04), 70);
      break;
  }
}

/* ------------------------------------------------------------ intro sounds --- */

export type IntroSound = "woosh" | "ding" | "splash";

export function introSound(kind: IntroSound) {
  const c = audio();
  if (!c) return;
  const t = c.currentTime;

  if (kind === "woosh") {
    const src = c.createBufferSource();
    src.buffer = noise(c);
    src.loop = true;
    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 0.8;
    const g = c.createGain();
    src.connect(bp);
    bp.connect(g);
    g.connect(out());
    bp.frequency.setValueAtTime(280, t);
    bp.frequency.exponentialRampToValueAtTime(1500, t + 0.55);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.06, t + 0.14);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
    src.start(t);
    src.stop(t + 0.66);
  }

  if (kind === "ding") {
    ([
      [1, 0.05],
      [2.01, 0.028],
      [3.01, 0.016],
    ] as const).forEach(([mult, gain]) => {
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = "sine";
      o.frequency.value = 880 * mult;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(gain, t + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
      o.connect(g);
      g.connect(out());
      o.start(t);
      o.stop(t + 0.95);
    });
  }

  if (kind === "splash") {
    const src = c.createBufferSource();
    src.buffer = noise(c);
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    const g = c.createGain();
    src.connect(lp);
    lp.connect(g);
    g.connect(out());
    lp.frequency.setValueAtTime(2600, t);
    lp.frequency.exponentialRampToValueAtTime(480, t + 0.3);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.11, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.36);
    src.start(t);
    src.stop(t + 0.42);
    // a soft "plip" tone settling
    const o = c.createOscillator();
    const og = c.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(900, t);
    o.frequency.exponentialRampToValueAtTime(400, t + 0.13);
    og.gain.setValueAtTime(0.05, t);
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
    o.connect(og);
    og.connect(out());
    o.start(t);
    o.stop(t + 0.22);
  }
}

/* --------------------------------------------------- playable instrument --- */

/**
 * A warm marimba/kalimba-ish pluck for the floating instruments. Pleasant and
 * short; partials + a lowpass keep it soft. Caller gates on the sound toggle.
 */
export function playNote(freq: number) {
  const c = audio();
  if (!c) return;
  const t = c.currentTime;

  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 2900;
  const g = c.createGain();
  lp.connect(g);
  g.connect(out());

  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.17, t + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);

  ([
    [1, "triangle", 1],
    [2, "sine", 0.4],
    [3, "sine", 0.12],
  ] as const).forEach(([mult, type, amp]) => {
    const o = c.createOscillator();
    o.type = type;
    o.frequency.value = freq * mult;
    const og = c.createGain();
    og.gain.value = amp;
    o.connect(og);
    og.connect(lp);
    o.start(t);
    o.stop(t + 0.95);
  });
}
