//init SpeechSynth API
const synth = window.speechSynthesis;
//DOM elements
const text_form = document.querySelector('form');
const text_input = document.querySelector('#text-input');
const voice_select = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rate_val = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitch_val = document.querySelector('#pitch-value');
//init voices array
let voices = [];

const get_voices = () => {
 voices = synth.getVoices();
 //loop through voices and create an option for each one
 voices.forEach(voice => {
  //create an option element
  const option = document.createElement('option');
  //fill option with a voice and language
  option.textContent = voice.name + '(' + voice.lang + ')';
  //set needed option attributes
  option.setAttribute('data-lang', voice.lang);
  option.setAttribute('data-name', voice.name);
  voice_select.appendChild(option); 
 });
}

get_voices();
if (synth.onvoiceschanged !== undefined) {
 synth.onvoiceschanged = get_voices;
}