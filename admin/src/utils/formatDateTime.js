

export const formatDatetime = (isoDate) => {
  const dateObject = new Date(isoDate);

  const day = String(dateObject.getDate()).padStart(2, "0");
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = dateObject.getFullYear();

  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const seconds = String(dateObject.getSeconds()).padStart(2, "0");

  // Định dạng thành dd/mm/yyyy hh:mm:ss
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

