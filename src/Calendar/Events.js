import React from 'react'



export default class Events extends React.Component {
	render() {
		const currentMonthView = this.props.selectedMonth;
    const currentSelectedDay = this.props.selectedDay;
    const monthEvents = this.props.selectedMonthEvents;
    const removeEvent = this.props.removeEvent;

		const monthEventsRendered = monthEvents.map((event, i) => {
      return (
        <div
          key={event.title}
          className="event-container"
          onClick={() => removeEvent(i)}
        >
					
					<div className="event-time event-attribute">
              {event.date.format("HH:mm")}
            </div>


					<div className="event-title event-attribute">{event.title}</div>
				</div>
			);
		});

		const dayEventsRendered = [];

		for (var i = 0; i < monthEventsRendered.length; i++) {
      if (monthEvents[i].date.isSame(currentSelectedDay, "day")) {
        dayEventsRendered.push(monthEventsRendered[i]);
      }
    }

		return (
			<div className="day-events">
				{dayEventsRendered}
			</div>
		);
	}
}