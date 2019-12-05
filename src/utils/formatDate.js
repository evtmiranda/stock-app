export default (date) => {
    date = new Date(date)
    return formatDate(date)
}

function formatDate(date) {
    const dt = convertDateToUTC(date),
        day = dt.getDate().toString(),
        dayFormatted = (day.length === 1) ? '0' + day : day,
        month = (dt.getMonth() + 1).toString(),
        monthFormatted = (month.length === 1) ? '0' + month : month,
        yearFormatted = dt.getFullYear();
    const dtFormatted = dayFormatted.concat("/", monthFormatted, "/", yearFormatted);

    return dtFormatted
}

function convertDateToUTC(date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}