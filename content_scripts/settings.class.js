/** Класс настроек приложения */
class _vkfpSettings {
  isExist = false;    // Были кнопки уже созданы или нет
  updateTime = 10;    // Скорость с которой запускается функция проверки url

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
  /** ID интервала, для его остановки при необходимости */
  pageListener;

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

  styles = `
    ${this.queries.container} {
      width: 100%;
      margin: 10px 0;
    }
    ${this.queries.container} * {
      transition-property: opacity;
      transition-duration: .25s;
      transition-timing-function: ease;
    }
    ${this.queries.hidden} {
      visibility: hidden;
    }
    ${this.queries.button} {
      display: block;
      width: 100%;
      background: white;
      color: black;
      box-shadow: 0 0 15px -5px rgba(0, 0, 0, .25);
      font-size: 13px;
      font-weight: 600;
      text-align: center;
      border-radius: 20px;
      padding: 8px 0;
      margin: 8px 0;
      cursor: pointer;
      position: relative;
    }
    ${this.queries.button}:not(${this.queries.bNew}):hover {
      color: #4157f5;
    }
    ${this.queries.bDel} {
      opacity: 0;
      display: inline-block;
      font-size: 16px;
      width: 12px;
      height: 12px;
      background: url(/images/icons/im_actions.png) -4px -81px;
      position: absolute;
      top: calc(50% - 6px);
      right: 10px;
    }
    ${this.queries.button}:hover ${this.queries.bDel} {
      opacity: 1;
    }
    ${this.queries.bDel}:hover {
      background: url(/images/icons/im_actions.png) -4px -67px;
    }
    ${this.queries.bNew} {
      color: transparent;
      font-weight: 100;
      background: url(data:image/svg+xml;charset=utf-8,%3Csvg%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20width%3D%2214%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22m8%206v-6h-2v6h-6v2h6v6h2v-6h6v-2z%22%20fill%3D%22%2391a8c4%22%2F%3E%3C%2Fsvg%3E) rgba(50, 50, 78, 0.75) 50% 50% no-repeat;
      opacity: .75;
    }
    ${this.queries.bNew}:hover {
      opacity: 1;
    }
  `;


}
