var config = {
    apiKey: "AIzaSyCxA8nYgK3m1YGicfLnYlUv7i0LjJc7K4g",
    authDomain: "train-schedule-d4618.firebaseapp.com",
    databaseURL: "https://train-schedule-d4618.firebaseio.com",
    projectId: "train-schedule-d4618",
    storageBucket: "train-schedule-d4618.appspot.com",
    messagingSenderId: "865647463180"
    
};
firebase.initializeApp(config);
  
var database = firebase.database();

$("#addtrain").on("click", function(event) {
    event.preventDefault();


    var destination = $("#input2").val().trim();
    var frequency = $("#input4").val().trim();
    var firsttrainTime = moment($("#input3").val().trim(), "00:00").format("X");
    var minAway = moment().add(frequency, "minutes");
    

    $("#destination").text(destination);
    $("#frequency").text(frequency);
    $("#nextarrival").text();
    $("#minaway").text(minAway);

    var newTrain = {
        name: destination,
        start: firsttrainTime,
        rate: frequency
    };
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.start);
    console.log(newTrain.rate);

    $("#input2").val("");
    $("#input4").val("");
    $("#input3").val("");
});
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    var destination = childSnapshot.val().name;
    var firsttrainTime = childSnapshot.val().start;
    var frequency = childSnapshot.val().rate;
    

    console.log(destination);
    console.log(firsttrainTime);
    console.log(frequency);
});
var tFrequency = 25;
var bFrequency = 45;
var cFrequency = 15;
var dFrequency = 60;
var eFrequency = 55;

var firstTime = "08:00";

var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

var tRemainder = diffTime % tFrequency;
var bRemainder = diffTime % bFrequency;
var cRemainder = diffTime % cFrequency;
var dRemainder = diffTime % dFrequency;
var eRemainder = diffTime % eFrequency;
console.log(tRemainder);

var tMinutesTillTrain = tFrequency - tRemainder;
var bMinutesTillTrain = bFrequency - bRemainder;
var cMinutesTillTrain = cFrequency - cRemainder;
var dMinutesTillTrain = dFrequency - dRemainder;
var eMinutesTillTrain = eFrequency - eRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

var nextTrain = moment().add(tMinutesTillTrain, "minutes");
var nextTraintwo = moment().add(bMinutesTillTrain, "minutes");
var nextTrainthree = moment().add(cMinutesTillTrain, "minutes");
var nextTrainfour = moment().add(dMinutesTillTrain, "minutes");
var nextTrainfive = moment().add(eMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

$( document ).ready(function() {
    $("#burnleyarrive").text(nextTrain);
    $("#burnleywait").text(tMinutesTillTrain);
    $("#brightonarrive").text(nextTraintwo);
    $("#brightonwait").text(bMinutesTillTrain);
    $("#favorshamarrive").text(nextTrainthree);
    $("#favorshamwait").text(cMinutesTillTrain);
    $("#landonarrive").text(nextTrainfour);
    $("#landonwait").text(dMinutesTillTrain);
    $("#suttonarrive").text(nextTrainfive);
    $("#suttonwait").text(eMinutesTillTrain);
});


