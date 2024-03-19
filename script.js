$(document).ready(function() {
  // Function to generate time blocks
  function generateTimeBlocks() {
    // Clear existing time blocks
    $("#timeBlocks").empty();

    // Loop through standard business hours (9am to 5pm)
    for (var hour = 9; hour <= 17; hour++) {
      var timeBlock = $("<div>").addClass("row time-block").attr("data-hour", hour);
      var hourDiv = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(dayjs().hour(hour).format("hA")); // Display specific times using Day.js
      var textArea = $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", 3).val(localStorage.getItem("timeBlock-" + hour));
      var saveBtn = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save");
      var saveIcon = $("<i>").addClass("fas fa-save").attr("aria-hidden", "true");

      // Add past, present, or future class based on current hour
      var currentHour = dayjs().hour();
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
    var today = dayjs().format("dddd, MMMM D, YYYY");
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
