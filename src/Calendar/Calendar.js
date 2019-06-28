import React from 'react';
import './calendar.css'
import moment from 'moment';
import Events from './Events'
import DayNames from './DayNames'
import Week from './Week'
import ReactDOM from 'react-dom';



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
		const currentMonthView = this.state.selectedMonth;

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
			<span className="box todat-label" onClick={this.goToCurrentMonthView}>
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
		const monthEvents = this.state.selectedMonthEvents;
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
          date: currentSelectedDate,
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

	addEvent = () => {
		const currentSelectedDate = this.state.selectedDay;
    let isAfterDay = moment().startOf("day").subtract(1, "d");

		if (currentSelectedDate.isAfter(isAfterDay)) {
      this.handleAdd();
    } else {
      if (window.confirm("Are you sure you want to add an event in the past?")) {
        this.handleAdd();
      } else {
      } // end confirm past
    } //end is in the past
  }
	

	removeEvent = (i) => {
		const monthEvents = this.state.selectedMonthEvents.slice();
    const currentSelectedDate = this.state.selectedDay;

    if (window.confirm("Are you sure you want to remove this event?")) {
      let index = i;

      if (index != -1) {
        monthEvents.splice(index, 1);
      } else {
        alert("No events to remove on this day!");
      }

      this.setState({
        selectedMonthEvents: monthEvents
      });
    }
  }

	initialiseEvents = () => {
		const monthEvents = this.state.selectedMonthEvents;

    let allEvents = [];



		for (var i = 0; i < allEvents.length; i++) {
      monthEvents.push(allEvents[i]);
    }

		this.setState({
      selectedMonthEvents: monthEvents
    });
  }

	render() {
		const currentMonthView = this.state.selectedMonth;
    const currentSelectedDay = this.state.selectedDay;
    const showEvents = this.state.showEvents;

		if (showEvents) {
			return (
				<section className="main-calendar">
          <header className="calendar-header">
            <div className="row title-header">
              {this.renderDayLabel()}
            </div>
            <div className="row button-container">
              <i
                className="box arrow fa fa-angle-left"
                onClick={this.showCalendar}
              >-</i>
              <i
                className="box event-button fa fa-plus-square"
                onClick={this.addEvent}
              >+</i>
            </div>
          </header>
          <Events
            selectedMonth={this.state.selectedMonth}
            selectedDay={this.state.selectedDay}
            selectedMonthEvents={this.state.selectedMonthEvents}
            removeEvent={i => this.removeEvent(i)}
          />
        </section>
      );
		} else {
      return (
        <section className="main-calendar">
          <header className="calendar-header">
            <div className="row title-header">
              <i className="box arrow fa fa-angle-left" onClick={this.previous}></i>
              <div className="box header-text">
              {this.renderTodayLabel()}
              {this.renderMonthLabel()}
              </div>
              <i className="box arrow fa fa-angle-right" onClick={this.next}>></i>
            </div>
            <DayNames />
          </header>
          <div className="days-container">
            {this.renderWeeks()}
          </div>
        </section>
			);
		}
	}
}
ReactDOM.render(<Calendar />, document.getElementById("root"));