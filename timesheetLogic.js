/* global firebase moment */

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBjVYbFc2mmjra0m1odfFLhUYwx_ZSUgRI",
    authDomain: "train-project-8a018.firebaseapp.com",
    databaseURL: "https://train-project-8a018.firebaseio.com",
    storageBucket: "train-project-8a018.appspot.com",
    messagingSenderId: "278016862240"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStartingTime = $("#starting-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStartingTime,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Alert
  alert("Train added!");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#starting-input").val("");
  $("#frequency-input").val("");

  // Prevents moving to new page
  return false;
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStartingTime = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStartingTime);
  console.log(trainFrequency);

    var firstTimeConverted = moment(trainStartingTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var trainWait = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + trainWait);

    // Next Train
    var trainArrival = moment().add(trainWait, "minutes");
    console.log("ARRIVAL TIME: " + moment(trainArrival).format("hh:mm"));

    var trainShow = moment(trainArrival).format("HH:mm");

  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + trainShow + "</td><td>" + trainWait + "</td></tr>");
});
