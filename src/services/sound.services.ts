import { TetrisContext } from "@/state/context";
import { useContext } from "react";

const SOUND_FILE_PATH =
  "https://firebasestorage.googleapis.com/v0/b/tetris-assets.appspot.com/o/tetris-sound.mp3?alt=media&token=05aaed96-2852-485f-81b9-6b5331fb13a7";
let context: AudioContext;
let buffer: AudioBuffer;

export const start = () => {
  playMusic(0, 3.7202, 3.6224);
};

export const clear = () => {
  playMusic(0, 0, 0.7675);
};

export const fall = () => {
  playMusic(0, 1.2558, 0.3546);
};

export const gameOver = () => {
  playMusic(0, 8.1276, 1.1437);
};

export const rotate = () => {
  playMusic(0, 2.2471, 0.0807);
};

export const move = () => {
  playMusic(0, 2.9088, 0.1437);
};

const playMusic = (when: number, offset: number, duration: number) => {
  // const tetrisContext = useContext(TetrisContext);
  // if (!tetrisContext.state.sound) {
  //   return;
  // }
  loadSound().then((source) => {
    if (source) {
      source.start(when, offset, duration);
    }
  });
};

const loadSound = (): Promise<AudioBufferSourceNode> => {
  return new Promise((resolve, reject) => {
    if (context && buffer) {
      resolve(getSource(context, buffer));
      return;
    }
    const newContext = new AudioContext();
    const req = new XMLHttpRequest();
    req.open("GET", SOUND_FILE_PATH, true);
    req.responseType = "arraybuffer";

    req.onload = () => {
      newContext.decodeAudioData(
        req.response,
        (newBuffer) => {
          context = newContext;
          buffer = newBuffer;
          resolve(getSource(context, buffer));
        },
        () => {
          const msg =
            "Sorry dude, cannot play sound. But I hope you still enjoy Tetris!";
          alert(msg);
          reject(msg);
        }
      );
    };
    req.send();
  });
};

const getSource = (
  context: AudioContext,
  buffer: AudioBuffer
): AudioBufferSourceNode => {
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  return source;
};
