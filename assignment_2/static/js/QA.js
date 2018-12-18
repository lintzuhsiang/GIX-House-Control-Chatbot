var counter = 10,timer = setInterval(function(){
  $("#timer").html(--counter)
  if(counter<1){
    clearInterval(timer)
    $("#speech").html("Fail")
    var button = $('<button>',{
      text:'Click to restart the QA',
      click:function(){
        console.log('restarted')
        counter=10
        $("#speech").html("")
      }
    })
  var parent = $('#container')
  parent.children('div').append(button).end();
  }
},1000)

var questions=[
  'Are there 44 students in GIX cohort two?',
  'Are you come from Taiwan?',
    'Do you study in University of Washington?',
    "Do you like Asian style food?",
  'Do you like Codepen?',
    'You finish the QA test'
]
var num = 0;
function startQA(){
  // var child = document.getElementById('button')
  // child.parentNode.removeChild(child)
    if(num==0) {
        var q_text = document.getElementById("RobotText")
        q_text.innerHTML = questions[num]
    }
    else{$("#QA").val("send answer.").on('click',updateQA)}
    num = num+1;
}
function updateQA(){
  var q_text = document.getElementById("RobotText")
    console.log(questions[num])
  q_text.innerHTML = questions[num]
    if(num==questions.length){
         q_text.innerHTML="You finish the first simple QA test."
    }
}
function createbutton(button_yes,button_no){
  var button_yes_cont = document.createTextNode("Yes")
  button_yes.appendChild(button_yes_cont)
  var button_no_cont = document.createTextNode("No")
  button_no.appendChild(button_no_cont)

  return button_yes,button_no
}
