function isDateLaterThan(a, b) {
  return a > b;
}

/* from https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date */
function ISODateString(d){  
    function pad(n){return n<10 ? '0'+n : n;}  
    return d.getUTCFullYear()+'-'+ pad(d.getUTCMonth()+1)+'-'+ pad(d.getUTCDate());
}  

$(document).ready(function(){
    var url = 'data/levis2015schedule.json';

    var today = new Date();
    var nextEvent = null;
    var todaysEvent = null;
    
    // Format date as MM/DD/YY
    var curr_date = today.getDate();
    var curr_month = today.getMonth() + 1;
    var curr_year = today.getFullYear();

    // Check for events today
    $.getJSON(url, function(json){
        var nextEventDate;
        
        $.each(json.events,function(i,event){
            nextEventDate = new Date(event.date);
               
            // Uncomment for debugging 
            console.log("Today: " + today + " - Looking at event: " + nextEventDate);

          if (!nextEvent && isDateLaterThan(nextEventDate, today)){
            nextEvent = event;
            return false; // break the loop
          }
          
            if(today.getYear() == nextEventDate.getYear() && today.getMonth() == nextEventDate.getMonth() && today.getDate() == nextEventDate.getDate()) {
              todaysEvent = event;
              return false; // break the loop
            }            
        });
        
        if (todaysEvent) {
            $(".fill-in").text("NO");
            $("#event .summary").text("Event at Levi's today: " + todaysEvent.name);
            $("#event .location").text(todaysEvent.location);
            $("#event .tstart").text(todaysEvent.time);
            
            $("#event abbr").attr('title', ISODateString(nextEventDate));
            $("body").addClass("home");
         //   $("#yesno .homeaway").text(todaysEvent.name + " @ Levi's");

            $("#event").show();
        }
        else {
             $(".fill-in").text("YES");

            // Format next game date as day of the week
              var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
              var nextEventDay = weekday[nextEventDate.getDay()];
              $("#event .tstart").text(nextEvent.time);
              $("body").addClass("away");
         //     $("#yesno .homeaway").text("Next event at Levi's: " + nextEvent.name + " on " + nextEvent.date + " (" + nextEventDay + ")");
              $("#event .summary").text("Next event at Levi's Stadium: " + nextEvent.name + " on " + nextEvent.date + " (" + nextEventDay + ")");
              $("#event .date").text(nextEvent.date);
              $("#event .location").text(nextEvent.location);


          $("#event").show();
        }
    });                
});    

