import moment from "moment";

export function timeDiff(date: Date) {
	if (Math.abs(moment(new Date()).diff(date, "minutes")) < 60) {
		return { time: moment().diff(date, "minutes"), type: "phút", abbr: "m" };
	}

	if (Math.abs(moment(new Date()).diff(date, "hours")) < 24) {
		return { time: moment().diff(date, "hours"), type: "tiếng", abbr: "h" };
	}

	if (Math.abs(moment(new Date()).diff(date, "days")) < 60) {
		return { time: moment().diff(date, "days"), type: "ngày", abbr: "d" };
	}

	return { time: moment(new Date()).diff(date, "month"), type: "tháng", abbr: "M" };
}

export function timeDiffString(date: Date) {
	const { time, type } = timeDiff(new Date(date));

	return `${time} ${type} trước`;
}
