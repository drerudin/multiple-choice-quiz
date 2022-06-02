//previous score List 
var previousScoreSubmissions = JSON.parse(window.localStorage.getItem("scoreSubmissions"));
console.log(previousScoreSubmissions);
if (previousScoreSubmissions === null) {

    previousScoreSubmissions = [];

}

for(i = 0 ; i < previousScoreSubmissions.length; i++){
    var player = previousScoreSubmissions[i]; 
    console.log(player);
    //create an LI TAG 
var liElement = document.createElement("li"); 
liElement.textContent = player.name + " , Score: "+ player.score; 

console.log(liElement);
//append it to ol tag
document.getElementById("list").append(liElement); 
}