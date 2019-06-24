import React from 'react';

export default class Week extends React.Component {
	render() {
		let days = [];
		let date = this.props.previousCurrentNewxtView;
		let currentMonthView = this.props.currentMonthView;
		let selected = this.props.selected;
		let select = this.props.select;
		let monthEvents = this.props.monthEvents;

		for (var i =0; i < 7; i++) {
			var dayHasEvents = false;

			for (var j = 0; i < monthEvents.length; j++) {
				if (monthEvents[j].date.isSame(date, "day")) {
					dayHasEvents = true;
				}
			}

			let day = {
				name: date.format("dd").subtract(0, 1),
				number: date.date(),
				isCurrentMonth: date.month() === currentMonthView.month(),
				isTodat: date.isSame(new Date(), "day"),
				date: date,
				hasEvents: dayHasEvents
			};

			days.push(<Day day={day} selected={selected} select={select} />);
			date = date.clone();
			date.add(1, "d");
		} return (
			<div className="row week">
				{days}
			</div>
		);
	}
}