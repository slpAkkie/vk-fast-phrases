/** Класс кнопок */
class _Button {
  constructor( buttonSample ) {
    /** Задаем параметры кнопки */
    let { text, id, styleId } = buttonSample;
    this._text = text;
    this._id = id;
    this._styleId = styleId;

    /** Создаем кнопку */
    this.buildButton();

    /** Возвращаем */
  }

  /** Возвращает DOM-элемент кнопки */
  get() {
    return this.button;
  }

  /** Получение необходимых для постройки кнопки элементов */
  getDependepncies() {
    let chatInput = document.querySelector( vkfpSettings.queries.chatInput ),
      chatSend = document.querySelector( vkfpSettings.queries.chatSend );

    /** Если не получается получить какой-либо элемент возвращаем false */
    if ( chatInput === null || chatSend === null ) return { result: false };
    else return { result: true, chatInput, chatSend };
  }

  /** Функция создает кнопку */
  buildButton() {
    /** Создаем обертку кнопки */
    this.button = document.createElement( vkfpSettings.tags.button );
    this.button.id = `VKFP-button${this._id}`;
    this.button.classList.add( vkfpSettings.classes.button );

    /** Создаем поле текста */
    let bText = document.createElement( vkfpSettings.tags.bText );
    bText.classList.add( vkfpSettings.classes.bText );
    bText.innerHTML = this._text;

    /** Создаем кнопку удаления */
    let bDel = document.createElement( vkfpSettings.tags.bDel );
    bDel.classList.add( vkfpSettings.classes.bDel );
    bDel.addEventListener( 'click', this.delete.bind( this ) );


    /** Добавляем текст и кнопку удаления в обертку */
    this.button.append( bText, bDel );

    /** Добавляем событие клик */
    this.button.addEventListener( 'click', this.send.bind( this ) );
  }

  /** Отправка сообщения */
  send( eClick ) {
    /** Если клик был по кнопке удаления - Выходим */
    if ( eClick.toElement.classList.value == vkfpSettings.classes.bDel ) return;

    /** Получаем необхожимые элементы */
    let deps = this.getDependepncies();
    /** Если не получилось получить элементы - Выходим */
    if ( deps.result === false ) return;

    /** Разбираем объект */
    let { chatInput, chatSend } = deps;

    /** Записываем в поле сообщения текст кнопки и нажимаем отправить */
    chatInput.innerHTML += this._text;
    chatSend.click();
  }

  /** Удаление кнопки */
  delete() {
    /** Удаляем кнопку из DOM */
    this.button.remove();
    /** Удаляем ее из конфигурации */
    vkfp.deleteButton( this._id );
    vkfp.updateStorage();
  }

}
