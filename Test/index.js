let persian_calender = new IRPersianCalendar();

persian_calender.init().then(() =>
{
	updateToday();
});

function updateToday()
{
	let today = persian_calender.getSelectedDay();

	document.getElementById("day_info").innerHTML =
		persian_calender.getTodayPersianInfo() + "<br/>" +
		persian_calender.getTodayHijriInfo() + "<br/>" +
		persian_calender.getTodayGregorianInfo();

	let events = persian_calender.getTodayEvents();

	let events_str = "";

	if(events.persian_events.length > 0)
	{
		events_str += events.persian_events.join(" - ");
		events_str += "<br/>"
	}

	if(events.hijri_events.length > 0)
	{
		events_str += events.hijri_events.join(" - ");
		events_str += "<br/>"
	}

	if(events.official_world_events.length > 0)
	{
		events_str += events.official_world_events.join(" - ");
		events_str += "<br/>"
	}

	if(events.unofficial_world_events.length > 0)
	{
		events_str += events.unofficial_world_events.join(" - ");
		events_str += "<br/>"
	}

	document.getElementById("day_event").innerHTML = events_str;

	document.getElementById("year_display").innerText = today[0];
	document.getElementById("month_display").innerText = persian_calender.persianMonthName(today[1]);
}

function updateSelectedDay(selected_day)
{
	document.getElementById("day_info").innerHTML =
		persian_calender.getSelectedDayPersianInfo() + "<br/>" +
		persian_calender.getSelectedDayHijriInfo() + "<br/>" +
		persian_calender.getSelectedDayGregorianInfo();

	let events = "";

	if(selected_day.persian_events.length > 0)
	{
		events += selected_day.persian_events.join(" - ");
		events += "<br/>"
	}

	if(selected_day.hijri_events.length > 0)
	{
		events += selected_day.hijri_events.join(" - ");
		events += "<br/>"
	}

	if(selected_day.official_world_events.length > 0)
	{
		events += selected_day.official_world_events.join(" - ");
		events += "<br/>"
	}

	if(selected_day.unofficial_world_events.length > 0)
	{
		events += selected_day.unofficial_world_events.join(" - ");
		events += "<br/>"
	}

	document.getElementById("day_event").innerHTML = events;
}

function nextMonth()
{
	let date = persian_calender.nextMonth();

	document.getElementById("year_display").innerText = date[0];
	document.getElementById("month_display").innerText = persian_calender.persianMonthName(date[1]);
}

function prevMonth()
{
	let date = persian_calender.prevMonth();

	document.getElementById("year_display").innerText = date[0];
	document.getElementById("month_display").innerText = persian_calender.persianMonthName(date[1]);
}

function nextYear()
{
	document.getElementById("year_display").innerText = persian_calender.nextYear()[0];
}

function prevYear()
{
	document.getElementById("year_display").innerText = persian_calender.prevYear()[0];
}

persian_calender.addEventListener("selectDay", function(selected_day)
{
	updateSelectedDay(selected_day);
});

persian_calender.addEventListener("updateToday", function ()
{
	updateToday();
});

persian_calender.addEventListener("updateDate", function (selected_day)
{
	updateSelectedDay(selected_day);
});