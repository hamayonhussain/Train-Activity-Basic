

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

// 2. Button for adding train schedule
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstArrival = $("#time-input").val().trim(); 
  var trainfrequency = $("#frequency-input").val().trim();



  // Creates local "temporary" object for holding train schedule data
  var unionPacific = {
    train: trainName,
    location: destination,
    firstArrival: firstArrival,
    frequency: trainfrequency
  };

  // Uploads train schedule data to the database
  database.ref().push(unionPacific);

  // Logs everything to console
  console.log(unionPacific.trainName);
  console.log(unionPacific.destination);
  console.log(unionPacific.firstArrival);
  console.log(unionPacific.trainfrequency);

  alert("successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train schedule to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().train;
  var destination = childSnapshot.val().location;
  var firstArrival = childSnapshot.val().firstArrival;
  var trainfrequency = childSnapshot.val().frequency;
  var timeArray = firstArrival.split(":")

  //timeArray[0] === ????
  // Pass each index of timeArray to the below methods hours and minutes.
  var trainTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
  var maxMomentTime = moment.max(moment(), trainTime)
  var tMinutesTillTrain;
  var nextArrival

  // union Pacific Railroad Info
  
  console.log('train name:', trainName);
  console.log('destination:', destination);
  console.log('train arrivasl:', firstArrival);
  console.log('train frequency:', trainfrequency);
  console.log('train time:', trainTime);
  console.log('max moment time:', maxMomentTime);

  //Write an if/else block that compares maxMomentTime to trainTime
  //If true, use trainTime Moment object to format the time appopriately, assign to nextArrival
  //Also using trainTime object, use diff method to check between trainTime locale and
  //between moment(), assign to tMinutesTillTrain.

  //also your else statment.
  
  // Train arriving time moment.js. We need to set this to arrival time input
  var arrivingTime = moment.unix(firstArrival).format("MM/DD/YYYY");

  // We need to set this moment.js to next train that is minutes away.
  // var empMonths = moment().add(tMinutesTillTrain, "minutes");
  // console.log(empMonths);



  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(arrivingTime),
    $("<td>").text(trainfrequency),
    $("<td>").text(),
    
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
