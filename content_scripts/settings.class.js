/** Класс настроек приложения */
class _vkfpSettings {
  isExist = false;    // Были кнопки уже созданы или нет
  updateTime = 10;    // Скорость с которой запускается функция проверки url
  pageListener;       //ID интервала, для его остановки при необходимости

  /** Список html-тэгов используемых расширением для создания элементов */
  tags = {
    container: 'div',
    button: 'div',
    bText: 'span',
    bDel: 'span',
    bWrapper: 'div'
  }
  /** Список html-идентификаторов используемых расширением для создания элементов */
  IDs = {
    container: 'VKFP-container',
    bNew: 'VKFP-new',
    bWrapper: 'VKFP-bwrapper'
  }
  /** Список html-классов используемых расширением для создания элементов */
  classes = {
    pageHistory: 'im-page_history-show',
    landlord: 'im-right-menu',
    secondaryLandlord: 'side_bar_inner',
    chatInput: 'im-chat-input--text',
    chatSend: 'im-chat-input--send',
    button: 'VKFP-button',
    bText: 'VKFP-text',
    bDel: 'VKFP-delete',
    hidden: 'VKFP-hidden'
  }
  /** CSS селекторы для выборки элементов */
  queries = {
    pageHistory: `.${this.classes.pageHistory}`,
    landlord: `.${this.classes.landlord}`,
    secondaryLandlord: `.${this.classes.secondaryLandlord}`,
    container: `#${this.IDs.container}`,
    chatInput: `.${this.classes.chatInput}`,
    chatSend: `.${this.classes.chatSend}`,
    button: `.${this.classes.button}`,
    bText: `.${this.classes.bText}`,
    bDel: `.${this.classes.bDel}`,
    hidden: `.${this.classes.hidden}`,
    bNew: `#${this.IDs.bNew}`,
    bWrapper: `#${this.IDs.bWrapper}`
  };

  // Конфигурация по умолчанию
  buttonSamples = [
    { text: 'Пошел нахуй!🖕🏻', id: 0, styleId: 0 },
    { text: 'Ясно', id: 1, styleId: 0 },
    { text: 'Понятно', id: 2, styleId: 0 },
    { text: 'Ага, ага', id: 3, styleId: 0 },
    { text: 'Ммм...', id: 4, styleId: 0 },
    { text: 'Понимаю', id: 5, styleId: 0 },
    { text: 'Осуждаю', id: 6, styleId: 0 },
    { text: 'Ахапхахпхах', id: 7, styleId: 0 },
    { text: 'Получается так', id: 8, styleId: 0 }
  ];
}
