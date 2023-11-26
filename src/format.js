export const formatTransaction = (transaction) => {
  let formatted = [];

  for (let [key, value] of Object.entries(transaction)) {
    switch (key) {
      case "입금":
      case "출금":
      case "송금":
        formatted.push(`${key}: ${value.toLocaleString()}원`);
        break;
      case "잔고":
        formatted.push(`${key}: ${value.toLocaleString()}원`);
        break;
      case "계좌":
        formatted.push(`${key}: ${value}`);
        break;
      default:
        formatted.push(`${key}: ${value}`);
    }
  }

  return formatted.join("\n");
};
