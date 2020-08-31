Date.locale = {
  en: {
    month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
}
Date.prototype.getDayOfWeek = function () {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][this.getDay()];
}
Date.prototype.vietISFormat = function () {
  let now = new Date();
  var d = now.getDate();
  var m = now.getMonth() + 1;
  var y = now.getFullYear();
  return y + '/' + m + '/' + d;
}
Date.prototype.dbFormat = (now) => {
  var d = now.getDate();
  var m = now.getMonth() + 1;
  var y = now.getFullYear();
  m = m < 10 ? "0" + m : m;
  d = d < 10 ? `0${d}` : d;
  return `${y}-${m}-${d}`;
}