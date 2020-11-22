const socket = io();

// Speech to Text
class speechRecognitionApi {
  constructor(options) {
    var speechToText;
    speechToText = window.speechRecognition || window.webkitSpeechRecognition;
    this.speechApi = new speechToText();
    this.output = options.output
      ? options.output
      : document.createElement("div");
    this.speechApi.continuous = true;
    this.speechApi.interimResult = false;
    this.speechApi.onresult = (event) => {
      var resultIndex = event.resultIndex;
      var transcript = event.results[resultIndex][0].transcript;
      socket.emit("message", transcript);
      this.output.textContent = transcript;
    };
  }
  init() {
    this.speechApi.start();
  }
  stop() {
    this.speechApi.stop();
  }
}
window.onload = function () {
  var speech = new speechRecognitionApi({
    output: document.querySelector(".output"),
  });

  document.querySelector(".btn-start").addEventListener("click", () => {
    speech.init();
  });
  document.querySelector(".btn-end").addEventListener("click", () => {
    speech.stop();
    location.reload();
  });
};

// Geo Location
document.querySelector(".btn-start").addEventListener("click", () => {
  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const KEY = "66c533fbe4de42e29938e70c91b8fb39";
      const LAT = position.coords.latitude;
      const LNG = position.coords.longitude;
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${LAT}+${LNG}&key=${KEY}`;
      console.log(url);
      fetch(url)
        .then((result) => result.json())
        .then((data) => {
          console.log(data);
          socket.emit("geo_data", data);
        });
      return false;
    });
});
