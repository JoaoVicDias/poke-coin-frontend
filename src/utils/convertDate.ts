export const convertDate = (date: string) => {
  const formatdate = new Date(date),
  
    day = formatdate.getDate().toString(),
    formattedDay = day.length === 1 ? "0" + day : day,
    month = (formatdate.getMonth() + 1).toString(),
    formattedmonth = month.length === 1 ? "0" + month : month,
    year = formatdate.getFullYear();

  return formattedDay + "/" + formattedmonth + "/" + year;
};
