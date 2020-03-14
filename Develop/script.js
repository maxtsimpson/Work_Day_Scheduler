let timeBlocks = $(".time-block");
let hours = $(".hour");
let timeRows = $("#timesheet div");
let textAreas = $(".textarea");

//function to return a clone of the moment object
//the moment object is mutable so i don't want to accidentally alter it and break other functions
// this way every time i get it i get a unique instance of it
let getCurrentTime = function () {
    return moment().clone();
}

let postDisplayDate = function () {  
    var dateString = getCurrentTime().format('dddd, MMMM Do');
    $("#currentDay").text(dateString);
}

let renderTimeBlocks = function () {
    
    // get the current hour as an int. this could be a problem if the for loop takes to long. but should be ok
    var currentHour = parseInt(getCurrentTime().format('H'));
    var dayPlannerObject = getDayPlannerObject();

    //trying to use arrow functions here.
    //only supported by modern browsers (not IE) but want to try them
    hours.each((index, hour) => {

        //hours start at 9 and end at 5pm. using 24hr that would be 9 to 17
        //get the hour content and remove AM or PM. that should just give us a number to work with
        hour = hours[index];
        
        let timeInt;
        if (hour.textContent.includes("PM")) {
            timeInt = parseInt(hour.textContent.replace("PM",""))
            if(timeInt !== 12){
                //12 is a special case, because it is set as PM but is already 24hr standard
                timeInt += 12;
            }
        } else {
            timeInt = parseInt(hour.textContent.replace("AM",""));
        }
        timeblock = timeBlocks[index];
        if(currentHour > timeInt){
            //hour is in the past. apply the past style
            $(timeblock).removeClass("past present future").addClass("past");
        } else if(currentHour === timeInt){
            //hour is the current hour. apply the present style
            $(timeblock).removeClass("past present future").addClass("present");
        } else {
            //hour is in the future. apply the future style
            $(timeblock).removeClass("past present future").addClass("future");
        }

        //set the text inside the textarea of the timeblock based on whats in the dayPlannerObject
        $(timeblock).children("textarea").val(dayPlannerObject[hour.textContent])
        
    });
}

let getDayPlannerObject = function () {
    //get the dayPlannerObject from local storage. if there isnt one then create a blank object
    var dayPlannerObject = JSON.parse(localStorage.getItem("dayPlannerObject"));
    if (dayPlannerObject === null) {
        dayPlannerObject = {};
    }
    return dayPlannerObject;
}

let storeDayPlannerObject = function (dayPlannerObject){
    localStorage.setItem("dayPlannerObject",JSON.stringify(dayPlannerObject));
}

let saveTimeBlockText = function() {
    
    //this listener will be added to a save button so expect this to be the saveBtn
    var row = $(this).parent(".row");
    //get the dayplanner object
    dayPlannerObject = getDayPlannerObject();
    //get the hour text to use as a prop name / key    
    var hour = row.children(".hour").text();
    //store the textarea text from that timeblock using the hour text / prop name. this works as long as two timeblocks dont have the same name
    dayPlannerObject[hour] = row.children(".time-block").children("textarea").val();
    //store the dayPlannerObject in local storage    
    storeDayPlannerObject(dayPlannerObject);

}

$(".saveBtn").on("click",saveTimeBlockText);

let OnInit = function () {
    postDisplayDate();
    renderTimeBlocks();
};

OnInit();