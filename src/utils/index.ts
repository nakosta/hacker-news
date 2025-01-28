export const errors = {
  getNews: "Ошибка при получении новостей",
  getStory: "Ошибка при получении новости",
  getComments: "Ошибка при получении комментариев",
  selectedCoin: "Выбранная криптовалюта не найдена",
  loadLocalStorage: "Не удалось загрузить portfolio из localStorage:",
  saveLocalStorage: "Не удалось сохранить portfolio в localStorage:",
};

export const getFormatDate = (date: number): string =>
  new Date(date * 1000).toLocaleString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

export const getCountReply = (count: number): string => {
  function getWordForm(count: number, forms: [string, string, string]): string {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod100 >= 11 && mod100 <= 14) {
      return forms[2];
    }
    if (mod10 === 1) {
      return forms[0];
    }
    if (mod10 >= 2 && mod10 <= 4) {
      return forms[1];
    }
    return forms[2];
  }
  const forms: [string, string, string] = ["ответ", "ответа", "ответов"];
  return `${count} ${getWordForm(count, forms)}`;
};

export const parseCommentText = (rawText: string): string => {
  const parser = new DOMParser();
  const decodedHtml =
    parser.parseFromString(rawText, "text/html").documentElement.textContent ||
    "";
  return decodedHtml.trim();
};
