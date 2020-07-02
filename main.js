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
const body = document.querySelector('body');
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
};

get_voices();
if (synth.onvoiceschanged !== undefined) {
 synth.onvoiceschanged = get_voices;
}

//speak
const speak = () => {
 //runs as soon as 'language / voice' is selected or 'speak it' is clicked
 //check if already speaking
 if (synth.speaking) {
  console.error('already speaking...');
  return;
 }
 if (text_input.value !== '') {
  //add background animation
  body.style.background = '#000 url(wave.gif)';
  body.style.backgroundRepeat = 'repeat-x';
  body.style.backgroundSize = '100% 100%';
  //get speak text
  const speak_text = new SpeechSynthesisUtterance(text_input.value);
  //speak end
  speak_text.onend = e => {
   console.log('done speaking...');
   body.style.background = '#000';
  }
  //speak error
  speak_text.onerror = e => {
   console.error('something went wrong :(');
  }
  //specify voice to use
  const selected_voice = voice_select.selectedOptions[0].getAttribute('data-name');
  //loop through voices
  voices.forEach(voice => {
   if (voice.name === selected_voice) {
    speak_text.voice = voice;
   }
  });
  //set rate and pitch
  speak_text.rate = rate.value;
  speak_text.pitch = pitch.value;
  //speak
  synth.speak(speak_text);
 }
};

//event listeners
//1. form submission
text_form.addEventListener('submit', e => {
 e.preventDefault();
 speak();
 text_input.blur();
});
//2. rate value change
rate.addEventListener('change', e => rate_val.textContent = rate.value);
//3. pitch value change
pitch.addEventListener('change', e => pitch_val.textContent = pitch.value);
//4. voice select change
voice_select.addEventListener('change', e => speak());
