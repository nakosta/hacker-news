export const errors = {
  getNews: "Ошибка при получении новостей",
  getStory: "Ошибка при получении новости",
  getComments: "Ошибка при получении комментариев",
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
  const getWordForm = (n: number, forms: [string, string, string]): string => {
    const mod10 = n % 10;
    const mod100 = n % 100;

    if (mod100 >= 11 && mod100 <= 14) {
      return forms[2]; // "ответов"
    }
    if (mod10 === 1) {
      return forms[0]; // "ответ"
    }
    if (mod10 >= 2 && mod10 <= 4) {
      return forms[1]; // "ответа"
    }

    return forms[2]; // "ответов" (все остальные случаи)
  };

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
