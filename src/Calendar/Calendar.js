import React from 'react';
import './calendar.css'
import moment from 'moment';

export default class Calendar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedMonth: moment(),
			selectedDay: moment().startOf("day"),
			selectedMonthEvents: [],
			showEvents: false

		};

		this.previous = this.previous.bind(this);
		this.next = this.next.bind(this);
		this.addEvent = this.addEvent.bind(this);
		this.showCalendar = this.showCalendar.bind(this);
		this.goToCurrentMonthView = this.goToCurrentMonthView.bind(this);

		this.initialiseEvents();
	}

	previous = () => {
		const currentMonthView = this.getSnapshotBeforeUpdate.selectedMonth;

		this.setState({
			selectedMonth: currentMonthView.subtract(1, 'month')
		});
	}

	next = () => {
		const currentMonthView = this.state.selectedMonth;
		this.setState({
			selectedMonth: currentMonthView.add(1, 'month')
		});
	}

	select = (day) => {
		this.setState({
			selectedMonth: day.date,
			selectedDay: day.date.clone(),
			showEvents: true
		});
	}

	goToCurrentMonthView = () => {
		const currentMonthView = this.state.selectedMonth;
		this.setState({
			selectedMonth: moment()
		});
	}

	showCalendar = () => {
		this.setState({
			selectedMonth: this.state.selectedMonth,
			selectedDay: this.state.selectedDay,
			showEvents: false
		});
	}

	renderMonthLabel = () => {
		const currentMonthView = this.state.selectedMonth;
		return(
			<span className="box month-label">
				{currentMonthView.format("MMMM YYYY")}
			</span>
		);
	}

	renderDayLabel = () => {
		const currentSelectedDay = this.state.selectedDay;
		return(
			<span className="box month-label">
				{currentSelectedDay.format("DD MMMM YYYY")}
			</span>
		);
	}

	renderTodayLabel = () => {
		const currentSelectedDay = this.state.selectedDay;
		return(
			<span className="box todat-label" onClick={this.goToVurrentMonthView}>
				Today
			</span>
		);
	}

	renderWeeks = () => {
		const currentMonthView = this.state.selectedMonth;
		const currentSelectedDay = this.state.selectedDay;
		const monthEvents = this.state.selectedMonthEvents;


		let weeks = [];
		let done = false;
		let previousCurrentNextView = currentMonthView
		.clone()
		.startOf("month")
		.subtract(1, "d")
		.day("Monday");

		let count = 0;
		let monthIndex = previousCurrentNextView.month();

		while (!done) {
			weeks.push(
				<Week
				previousCurrentNextView={previousCurrentNextView.clone()}
				currentMonthView={currentMonthView}
				monthEvents={monthEvents}
				selected={currentSelectedDay}
				select={day => this.select(day)}
				/>
			);
			previousCurrentNextView.add(1, "w");
			done = count++ > 2 && monthIndex !== previousCurrentNextView.month();
			monthIndex = previousCurrentNextView.month();
		}
		return weeks;
	}

	handleAdd = () => {
		const monthEvents = tyhis.state.selectedMonthEvents;
		const currentSelectedDate = this.state.selectedDay;

		let newEvents = [];

		var eventTitle = prompt("Please enter a name for your event: ");

		switch (eventTitle) {
			case "":
				alert("Event name cannot be empty.");
				break;
			case null:
				alert("Changed your mind? You can add one later!");
				break;
			default:
				var newEvent = {
					title: eventTitle,
					date: currentSelectedDay,
					dynamic: true
				};

				newEvents.push(newEvent);
				for (var i = 0; i < newEvents.length; i++) {
					monthEvents.push(newEvents[i]);
				}

				this.setState({
					selectedMonthEvents: monthEvents
				});
				break;
		}
	}
	
}