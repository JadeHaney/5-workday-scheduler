// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    // updates time on the webpage
    function updateTime() {
      let today = moment();
      $("#currentDay").text(today.format("dddd, MMMM Do YYYY, h:mm.ss"));
  
      // For coloring the past, present, and future time blocks
      let now = moment().format("kk");
      for (let i = 0; i < scheduleElArray.length; i++) {
        scheduleElArray[i].removeClass("future past present");
  
        if (now > scheduleElArray[i].data("hour")) {
          scheduleElArray[i].addClass("past");
        } else if (now === scheduleElArray[i].attr("data-hour")) {
          scheduleElArray[i].addClass("present");
        } else {
          scheduleElArray[i].addClass("future");
        }
      }
    }
  
    // textarea elements
    let saveBttn = $(".saveBtn");
    let containerEl = $(".container");
    let scheduleElArray = $(".time-block");
  
    renderLastRegistered();
    updateTime();
    setInterval(updateTime, 1000);
  
    // render schedule saved in local storage
    function renderLastRegistered() {
      for (let el of scheduleElArray) {
        el.val(localStorage.getItem("time block " + $(el).data("hour")));
      }
    }
  
    // function for handling clicks
    function handleFormSubmit(event) {
      event.preventDefault();
      let btnClicked = $(event.currentTarget);
      let targetText = btnClicked.siblings("textarea");
      let targetTimeBlock = targetText.data("hour");
      localStorage.setItem("time block " + targetTimeBlock, targetText.val());
    }
  
    saveBttn.on("click", handleFormSubmit);
  });
  