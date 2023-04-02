//Перевод времени из UNIX в человеческое
export function unixToHumanTime(unixTime) {
    const date = new Date(unixTime * 1000);
    const humanTime = date.toLocaleString();
    return humanTime;
}