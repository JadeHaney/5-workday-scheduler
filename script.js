// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function() {
  // Function to generate time blocks
  function generateTimeBlocks() {
    // Clear existing time blocks
    $("#timeBlocks").empty();

    // Current hour
    var currentHour = moment().hour();

    // Loop through standard business hours (9am to 5pm)
    for (var hour = 9; hour <= 17; hour++) {
      var timeBlock = $("<div>").addClass("row time-block").attr("data-hour", hour);
      var hourDiv = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(moment({ hour: hour }).format("hA"));
      var textArea = $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", 3).val(localStorage.getItem("timeBlock-" + hour));
      var saveBtn = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save");
      var saveIcon = $("<i>").addClass("fas fa-save").attr("aria-hidden", "true");

      // Add past, present, or future class based on current hour
      if (hour < currentHour) {
        timeBlock.addClass("past");
      } else if (hour === currentHour) {
        timeBlock.addClass("present");
      } else {
        timeBlock.addClass("future");
      }

      // Append elements to time block
      saveBtn.append(saveIcon);
      timeBlock.append(hourDiv, textArea, saveBtn);
      $("#timeBlocks").append(timeBlock);
    }
  }

  // Function to update current day
  function updateCurrentDay() {
    var today = moment().format("dddd, MMMM Do YYYY");
    $("#currentDay").text(today);
  }

  // Call functions to generate time blocks and update current day
  generateTimeBlocks();
  updateCurrentDay();

  // Update time blocks and current day every minute
  setInterval(function() {
    generateTimeBlocks();
    updateCurrentDay();
  }, 60000);

  // Save text area content to local storage when save button is clicked
  $(document).on("click", ".saveBtn", function() {
    var hour = $(this).parent().data("hour");
    var textAreaContent = $(this).siblings(".description").val();
    localStorage.setItem("timeBlock-" + hour, textAreaContent);
  });
});