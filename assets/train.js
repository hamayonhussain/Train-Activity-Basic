

var config = {
    apiKey: "AIzaSyDKq_ui0v8ZPjwEP8os6f6F9PpwxYmG2Ww",
    authDomain: "first-project-49d01.firebaseapp.com",
    databaseURL: "https://first-project-49d01.firebaseio.com",
    projectId: "first-project-49d01",
    storageBucket: "first-project-49d01.appspot.com",
    messagingSenderId: "1010245533740"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainArrival = moment($("#time-input").val().trim(), "MM/DD/YYYY").format("X");
  var trainfrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var unionPacific = {
    train: trainName,
    location: destination,
    arrival: trainArrival,
    frequency: trainfrequency
  };

  // Uploads employee data to the database
  database.ref().push(unionPacific);

  // Logs everything to console
  console.log(unionPacific.trainName);
  console.log(unionPacific.destination);
  console.log(unionPacific.trainArrival);
  console.log(unionPacificn.trainfrequency);

  alert("successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().train;
  var destination = childSnapshot.val().location;
  var trainArrival = childSnapshot.val().arrival;
  var trainfrequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(destination);
  console.log(trainArrival);
  console.log(trainfrequency);

  // Prettify the employee start
  var arrivingTime = moment.unix(trainArrival).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var empMonths = moment().diff(moment(trainArrival, "X"), "months");
  console.log(empMonths);



  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(arrivingTime),
    $("<td>").text(empMonths),
    $("<td>").text(),
    
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case