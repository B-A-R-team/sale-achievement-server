const formatNumber = (n: number) => {
  const str = n.toString();
  return str[1] ? str : '0' + str;
};

/**
 * 格式化日期
 * @param date 日期
 */
export default function formatTime(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join('/');
}
