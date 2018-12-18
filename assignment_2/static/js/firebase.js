var dbRef
var storage
var config = {
    apiKey: "AIzaSyACycsZ3FqsUuRBpygeBXCjWMEamSH7jTY",
    authDomain: "app3-224408.firebaseapp.com",
    databaseURL: "https://app3-224408.firebaseio.com",
    projectId: "app3-224408",
    storageBucket: "app3-224408.appspot.com",
    messagingSenderId: "729755425496"
  }


var isLoggedIn = false;
function initializeControl() {
  // Initialize Firebase
  firebase.initializeApp(config);
  firebase.auth().signInAnonymously().catch(handleLoginError);
  firebase.auth().onAuthStateChanged(handleAuthSuccess);
  drawFace();
  //signinGoogle();
    storage = firebase.storage();

}

function GetData(){
  //firebase.initializeApp(config);
  dbRef = firebase.database().ref('/');
  dbRef.on("value",getDatafromFirebase);


}


function getDatafromFirebase(snapshot){
  var data = snapshot.val()
  var newestData = data['RobotText']
  var messageDiv = document.getElementById("RobotText")
  messageDiv.innerHTML = newestData

}

function detectface(snapshot) {
        if (snapshot.val()['me'] == 'on') {
            var messageDiv = document.getElementById("RobotText");
            messageDiv.innerHTML = 'Shine, nice to come back.';

            d3.selectAll(".eyeballs").attr({fill: "pink", r: 15});

            function change(){
                 d3.selectAll(".eyeballs").attr({fill: "orange", r: 10});
                 messageDiv.innerHTML = snapshot.val()['RobotText'];
            }
            setTimeout(change,2000);
        }
        if (snapshot.val()['label'] ==  ("package detected")||snapshot.val()['label']== ("key detected")) {
            console.log(snapshot.val()['label'])
            var mesDiv = document.getElementById("detectItem");
            mesDiv.innerHTML = snapshot.val()['label'];
            mesDiv.style.display="block";
            var arc = d3.svg.arc()
                    .innerRadius(50)
                    .outerRadius(75)
                    .startAngle(90*Math.PI/180)
                    .endAngle(270*Math.PI/180)

            d3.select("path")
                .attr("d",arc)
                .attr("transform","translate(200,200)")
            function change(){
                    var arc = d3.svg.arc()
                    .innerRadius(50)
                    .outerRadius(75)
                    .startAngle(120*Math.PI/180)
                    .endAngle(240*Math.PI/180)

                    d3.select("path")
                    .attr("d",arc)
                    .attr("transform","translate(200,200)")            }
        setTimeout(change,2000);

        }
        if(snapshot.val()['label'] == "other"){
            var mesDiv = document.getElementById("detectItem");
            mesDiv.innerHTML = snapshot.val()['label'];
            mesDiv.style.display="none"
        }
    }

function moveEyeBall(snapshot){
  //if(camera){
      function map(x,y){
        return {x:1280-x,y:720-y}
      }
      new_data = map(snapshot.val()['x'],snapshot.val()['y'])
      d3.selectAll(".eyeballs").attr({
        cx: function(d){return xscale(new_data['x'],d.x)},
        cy: function(d){return yscale(new_data['y'],d.y)},
      })
    //}
}

function handleLoginError(error) {
  console.log("error code:" + error.code)
  console.log("error.message:" + error.message)
}

function handleAuthSuccess(user) {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    isLoggedIn = true;
    var button = document.getElementById("SendData");
    button.disabled = false;
    console.log("Now logged in as " + uid);
  }
}


function SendData() {
  if (isLoggedIn) {
    var dbRef = firebase.database().ref('/');
    var data = {};
    var textBox = document.getElementById("InputText");
    data["UserText"] = textBox.value;
    console.log(textBox.value)
    dbRef.update(data);
    console.log("Sent data to database: " + data.UserText);
    GetData();
    // drawFace()
  } 
  else 
    console.log("You are not logged in.");
}

