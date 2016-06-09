
;appCRM.controller('calendarController', function($scope, Calendar) {
    
        var tooltipX = $(".calendar-popup").offset().left;
        var tooltipY = $(".calendar-popup").offset().top;
        var startCalendar;
        var endCalendar;
        var backup_event;

        $scope.method  = "";
        $scope.renk    = "";
        $scope.rgb     = "";
         
        $(".kutular li").click(function(){

            $scope.renk = $(this).data("renk");
            $scope.rgb  = $(this).data("rgb");

        });

        $("#notCalendar").on('keypress', function(e) {
            if(e.keyCode==13){
                $("#calendarSave").click();
            }
        });

        $(".iptal, .btnKapat").click(function(){
            $(".calendar-popup").fadeOut();
            $(".fc-event").removeClass("active");
        });

        $(".sil").click(function(){
            $('#calendar').fullCalendar('removeEvents',backup_event._id);
            $(".iptal").click();
            Calendar
                .delete( backup_event._id );

        });
       
        $("#calendarSave").click( $.throttle(3000, function(){
            if ( $scope.method == "POST" ){
                Calendar
                  .save({
                        title: $('#notCalendar').val(),
                        desc: $('#acCalendar').val(),
                        start: +new Date(startCalendar._d)/1000,
                        end: +new Date(endCalendar._d)/1000,
                        color: $scope.rgb
                  }).then(function (data) {
                        var eventData;
                        if ($("#notCalendar").val()) {
                            eventData = {
                                id:     data.id,
                                _id:    data.id,
                                title:  $("#notCalendar").val(),
                                desc:  $("#acCalendar").val(),
                                start:  startCalendar,
                                end:    endCalendar,
                                color:  $scope.rgb
                            };
                            $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
                        }
                        $('#calendar').fullCalendar('unselect');
                        $(".iptal").click();
                  });
            }else{
               Calendar
                  .update({ 
                        id:     backup_event._id,
                        title:  $('#notCalendar').val(),
                        desc:   $('#acCalendar').val(),
                        start:  +new Date(startCalendar._d)/1000,
                        end:    +new Date(endCalendar._d)/1000,
                        color:  $scope.rgb
                  });
                  var eventData;
                        if ($("#notCalendar").val()) {
                            backup_event.title = $('#notCalendar').val();
                            backup_event.desc = $('#acCalendar').val();
                            backup_event.start = startCalendar;
                            backup_event.end = endCalendar;
                            backup_event.allDay = true;
                            backup_event.color = $scope.rgb;

                            $('#calendar').fullCalendar('updateEvent', backup_event); // stick? = true
                        }

                        $('#calendar').fullCalendar('unselect');
                        $(".iptal").click();
            }  
        }));

    $scope.events;
    $scope.dateFormatter = function(date){
        return +new Date(date);
    }
    $scope.greaterThan = function(prop){
        var sayac=0;
        return function(item){
            if ((moment(item.start).format("YYYY MM DD")  >= moment().format("YYYY MM DD"))&&sayac<2){
                sayac++;
                return true;
            }
        }
      }
       $scope.filterFunction = function(dataItem) {
            return function(dataItem2) {
                return dataItem2.start+"" == dataItem+"";
            }
        };
            $('#calendar').fullCalendar({
                header: {
                    right: 'prev,next, month,agendaWeek,agendaDay'
                },
                defaultDate: moment().format("YYYY-MM-DD"),
                selectable: true,
                selectHelper: true,
                select: function(start, end, jsEvent, view ) {
                    $('#calendar').fullCalendar('unselect');
                    $(".fc-event").removeClass("active");
                    
                    $scope.method = "POST";

                    startCalendar = start;
                    endCalendar = end;
                    $("#acCalendar").val("");
                    $("#notCalendar").val("");
                    $(".sil").hide();
                    $scope.rgb = "#69a4e0";
                   var mousex = jsEvent.pageX;
                   var mousey = jsEvent.pageY;
                   var durum = 0;
                   $('#calendar td').each(function(index) {
                    var offset = $(this).offset();
                    if (durum<2&&((offset.left + $(this).outerWidth()) > mousex && offset.left < mousex && (offset.top + $(this).outerHeight()) > mousey && offset.top < mousey)) {
                        durum++;
                           if (durum!=1)
                               $(".calendar-popup").animate({
                                left: offset.left-90,
                                top: offset.top-170
                               },function(){
                                $("#notCalendar").focus();
                               }).fadeIn(function(){
                                $("#notCalendar").focus();
                               });
                    }
                  });

                   $("#popup-time").text(moment(start).format("DD MMMM YYYY"));
                   // var title = prompt('Event Title:');
                  $("#notCalendar").focus();
                    
                },

                eventClick: function(event, allDay, jsEvent, view) {
                    $scope.method = "PUT";

                    $(".fc-event").removeClass("active");
                    $(allDay.currentTarget).addClass("active");
                    backup_event = event;
                    startCalendar = event.start;
                    endCalendar = event.end ? event.end : event.start;
                    $("#acCalendar").val(event.desc);
                    $("#notCalendar").val(event.title);

                    $scope.rgb = event.color;
                    $(".sil").show();
                   var mousex = allDay.pageX;
                   var mousey = allDay.pageY;
                   var durum = 0;
                   $('#calendar .fc-event-container').each(function(index) {
                    var offset = $(this).offset();
                    if (durum<2&&((offset.left + $(this).outerWidth()) > mousex && offset.left < mousex && (offset.top + $(this).outerHeight()) > mousey && offset.top < mousey)) {
                        durum++;
                               $(".calendar-popup").animate({
                                left: offset.left-90,
                                top: offset.top-173
                               }).fadeIn();
                    }
                  });

                   $("#popup-time").text(moment(event.start).format("DD MMMM YYYY"));
                   // var title = prompt('Event Title:');
                    $("#notCalendar").focus();

                },

                editable: true,
                eventLimit: true,
                eventLimitText: "tane daha var",
                height: 520,
                eventDrop: function (event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
                        
                        $('#calendar').fullCalendar('updateEvent', event);
                        setTimeout(function () {
                            $scope.$apply(function () {
                                $scope.events = $('#calendar').fullCalendar('clientEvents');
                            });
                        }, 0);

                        Calendar
                            .update({ 
                                id:     event._id,
                                title:  event.title,
                                desc:   event.desc,
                                start:  +new Date(event.start)/1000,
                                end:    +new Date(event.end)/1000,
                                color:  event.color
                            });
                },

                eventResize: function (event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
                  
                    $('#calendar').fullCalendar('updateEvent', event);
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $scope.events = $('#calendar').fullCalendar('clientEvents');
                        });
                    }, 0);
                    Calendar
                        .update({ 
                            id:     event._id,
                            title:  event.title,
                            desc:   event.desc,
                            start:  +new Date(event.start)/1000,
                            end:    +new Date(event.end)/1000,
                            color:  event.color
                        });
                        
                },

                events: function(start, end, timezone, callback) {
                    $.ajax({
                        url: '/api/calendar',
                        dataType: 'json',
                        data: {
                            start: start.unix(),
                            end: end.unix()
                        },
                        success: function(doc) {
                            var events = [];
                            $(doc).each(function() {
                                events.push({
                                    id:$(this).attr('id'),
                                    title: $(this).attr('title'),
                                    desc: $(this).attr('desc'),
                                    start: new Date($(this).attr('start')*1000), // will be parsed
                                    end: new Date($(this).attr('end')*1000), // will be parsed
                                    color: $(this).attr('color'), // will be parsed
                                    allDay: true,
                                });
                            });
                            setTimeout(function () {
                                $scope.$apply(function () {
                                    $scope.events = events;
                                });
                            }, 0);
                            callback(events);
                        }
                    });
                },

            });		
    	

	});