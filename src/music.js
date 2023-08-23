const { BASE_URL } = import.meta.env;

const forLessVolume = 0.9;

export const audioClick = new Audio(BASE_URL + "/mouse-click.mp3");
audioClick.volume -= forLessVolume;

export const audioSurprise = new Audio(BASE_URL + "/sound-effect-thriller.mp3");
audioSurprise.volume -= forLessVolume;

export const audioNewGame = new Audio(BASE_URL + "/interface-124464.mp3");
audioNewGame.volume -= forLessVolume;

export const audioWinner = new Audio(BASE_URL + "/guitar-riff-159089.mp3");
audioWinner.currentTime = 1;
audioWinner.volume -= forLessVolume;
