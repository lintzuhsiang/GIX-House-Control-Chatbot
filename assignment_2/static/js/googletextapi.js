
var targetLang = 'zh-TW';

function translateAndSpeak() {
var baseUrl = "https://translation.googleapis.com/language/translate/v2"
  var APIKey = "AIzaSyBttL3_rUfMaP8vZQazT8bCd5XhHkmR4lA"
  var text = document.getElementById("RobotText")
  var textInput = text.textContent
 ajaxRequest('GET',baseUrl+"?key="+APIKey+"&q="+textInput+"&target="+targetLang,handleTranslationResponse,textInput)
  var obj = {
    q:textInput,
    target:targetLang
  }
  // ajaxRequest('POST',baseUrl+"?key="+APIKey,handleTranslationResponse,JSON.stringify(obj))
}

function SentimentAndSpeak() {
  // var baseUrl = "https://language.googleapis.com/v1/documents:analyzeSentiment"
  // var APIKey = "AIzaSyBttL3_rUfMaP8vZQazT8bCd5XhHkmR4lA"
  var baseUrl = "https://language.googleapis.com/v1/documents:analyzeSentiment"
   //var APIKey = "AIzaSyDU3R1fPohNMwgESboOmR5lJ3vp7S4Unn4";
  var APIKey = "AIzaSyBttL3_rUfMaP8vZQazT8bCd5XhHkmR4lA"
    var text = document.getElementById("RobotText")
    console.log(text.textContent)
  var textInput = text.textContent
 var Document = {
    "type":"PLAIN_TEXT",
   "language":"en",
   "content":textInput,
  }
 var obj = {
  "document": Document,
  "encodingType": "UTF8",
 };
  ajaxRequest('POST',baseUrl+"?key="+APIKey,handleSentimentResponse,JSON.stringify(obj))  
 }


/*Function that handles click on the first button*/
function speakOriginal() {
  var textInput = document.getElementById("RobotText");
  var text = textInput.value;
  speak(text, 'en-US');
}

/*Function that makes the browser speak a text in a given language*/
function speak(text, lang) {
  /*Check that your browser supports test to speech*/
  if ('speechSynthesis' in window) {
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      //console.log("Your browser supports " + voices.length + " voices");
      msg.voice = voices.filter(function(voice) { return voice.lang == lang; })[1];
      console.log(msg)
    }
    msg.voiceURI = 'native';
    msg.volume = 0.8; // 0 to 1
    msg.rate = 0.6; // 0.1 to 10
    msg.pitch = 1; //0 to 2
    msg.text = text;
    msg.lang = lang;
    msg.onend = function(e) {
      console.log('Finished in ' + e.elapsedTime + ' milliseconds.');
    };
    speechSynthesis.speak(msg);
  }
}

/*Helper function: sends an XMLHTTP request*/
function ajaxRequest(method, url, handlerFunction, content) {
  var xhttp = new XMLHttpRequest();
  xhttp.open(method, url);
  //xhttp.setRequestHeader( 'Access-Control-Allow- Origin', '*' );
  xhttp.onreadystatechange = handlerFunction;
  if (method == "POST") {
    console.log("content",content)
    xhttp.send(content);
  }
  else {
    xhttp.send();
  }
}

/*Helper function: checks if the response to the request is ready to process*/
function successfulRequest(request) {
  return request.readyState === 4 && request.status == 200;
}

function handleSentimentResponse() {
  if (successfulRequest(this)) {
    var response=JSON.parse(this.responseText);
    var text = document.getElementById("RobotText") 
    var get_analysis = document.getElementById("analysis")
    var res = response['documentSentiment']

    //var analysis = document.createTextNode("your sentence magnitude: "+res['magnitude']+"score: "+res['score'] )
    get_analysis.innerHTML= "your sentence magnitude: "+res['magnitude']+"score: "+res['score']
    //speak(text.value,targetLang)

//     if(res['score']<0.5){
//      var arc = d3.svg.arc()
// .innerRadius(50)
// .outerRadius(75)
// .startAngle(90*Math.PI/180)
// .endAngle(-90*Math.PI/180)
//
//   d3.select("path")
//   .attr("d",arc)
//   .attr("transform","translate(200,250)")
//     }
    if(res['score']>0.6){happy()}
  }
  else {
    // console.log("Ready state: " + this.readyState);
    // console.log("Status: " + this.status);
    // console.log("Status text: " + this.statusText);
  }
}

function handleTranslationResponse() {
  if (successfulRequest(this)) {
   var response_text = this.responseText
   var response = JSON.parse(response_text)
   var text = document.getElementById("RobotText")
   text.textContent = response['data']["translations"][0]['translatedText']
   speak(text.textContent,targetLang)
  
  }
  else {
    // console.log("Ready state: " + this.readyState);
    // console.log("Status: " + this.status);
    // console.log("Status text: " + this.statusText);
  }
}


function SpeechInit(){
var grammar =
  "#JSGF V1.0; grammar emar; public <greeting> = hello | hi; <person> = maya | alisa;";
var recognition = new window.webkitSpeechRecognition();
var speechRecognitionList = new window.webkitSpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;
}


// function SpeechToText(){
// // SpeechInit();
// var grammar =
//   "#JSGF V1.0; grammar emar; public <greeting> = hello | hi; <person> = maya | alisa;";
// var recognition = new window.webkitSpeechRecognition();
// var speechRecognitionList = new window.webkitSpeechGrammarList();
// speechRecognitionList.addFromString(grammar, 1);
// recognition.grammars = speechRecognitionList;
// recognition.continuous = true;
// recognition.lang = "en-US";
// recognition.interimResults = false;
// recognition.maxAlternatives = 1;
// recognition.start();
// console.log("inputSpeech0")
// recognition.onresult = processSpeech;
// recognition.onend = recognition.stop();//Ended;
// };

// function processSpeech(event) {
// console.log(event)
//   var inputSpeech = event.results[0][0].transcript;
//   var textDiv = document.getElementById("InputText");
//   textDiv.innerHTML = "you said: " + inputSpeech +"<br>"
  
//   console.log(inputSpeech)
// }


// function recognitionEnded() {
//   console.log("onend happened");
//   recognition.stop();
// }
function SpeechToText(){
var grammar =
  "#JSGF V1.0; grammar emar; public <greeting> = hello | hi; <person> = maya | alisa;";
var recognition = new window.webkitSpeechRecognition();
var speechRecognitionList = new window.webkitSpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

//document.body.onclick = startRecognition;
  
recognition.start();

recognition.onresult = processSpeech;
  
function processSpeech(event) {
  var inputSpeech = event.results[0][0].transcript;
  console.log(inputSpeech)
  var textDiv = document.getElementById("InputText");
  textDiv.value = inputSpeech
  recognition.stop();
}

recognition.onend = recognitionEnded;

function recognitionEnded() {
  console.log("onend happened");
  recognition.stop();
}
}


function createbutton(button_yes,button_no){
  var button_yes_cont = document.createTextNode("Yes")
  button_yes.appendChild(button_yes_cont)
  var button_no_cont = document.createTextNode("No")
  button_no.appendChild(button_no_cont)
  return button_yes,button_no
}

