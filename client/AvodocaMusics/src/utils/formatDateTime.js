
export const formatDatetime = (isoDate) => {
  const dateObject = new Date(isoDate);

  const day = String(dateObject.getDate()).padStart(2, "0");
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = dateObject.getFullYear();

  // Định dạng thành dd/mm/yyyy hh:mm:ss
  return `${day}/${month}/${year}`;
}

