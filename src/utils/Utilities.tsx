import moment from "moment";

const getDateTime = (date: Date): string => {
  var checkedDate = moment(date, "YYYY/MM/DD");
  var month = checkedDate.format("MMMM");
  var day = checkedDate.format("D");
  var year = checkedDate.format("YYYY");
  return day + " " + month + ", " + year;
};

const generateId = (): number => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var h = new Date().getHours();
  var i = new Date().getMinutes();
  var s = new Date().getSeconds();
  var noteId = date + "" + "" + month + "" + year + "" + h + "" + i + "" + s;
  return parseInt(noteId);
};
export { getDateTime, generateId };
