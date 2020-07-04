/** Класс кнопок */
class _Button {
  constructor( buttonSample ) {
    /** Задаем параметры кнопки */
    let { text, id, styleId } = buttonSample;
    this._text = text;
    this._id = id;
    this._styleId = styleId;

    /** Создаем ее */
    this.createButton();

    /** Возвращаем */
  }

  /** возвращает объект элемента кнопки */
  get() {
    return this.button;
  }

  /** Функция возвращает необходимые элементы страницы для добавления кнопок */
  getDependepncies() {
    let chatInput = document.querySelector( vkfpSettings.queries.chatInput ),
      chatSend = document.querySelector( vkfpSettings.queries.chatSend );

    if ( chatInput === null || chatSend === null ) return { result: false };
    else return { result: true, chatInput, chatSend };
  }

  /** Функция создает кнопку */
  createButton() {
    /** Обертка кнопки */
    this.button = document.createElement( vkfpSettings.tags.button );
    this.button.id = `VKFP-button${this._id}`;
    this.button.classList.add( vkfpSettings.classes.button );


    let bText = document.createElement( vkfpSettings.tags.bText );
    bText.classList.add( vkfpSettings.classes.bText );
    bText.innerHTML = this._text;


    let bDel = document.createElement( vkfpSettings.tags.bDel );
    bDel.classList.add( vkfpSettings.classes.bDel );
    bDel.addEventListener( 'click', this.delete.bind( this ) );


    this.button.append( bText, bDel );

    this.button.addEventListener( 'click', this.send.bind( this ) );
  }

  /** Функция отправки сообщения соответствующего кнопке */
  send( eClick ) {
    let deps = this.getDependepncies();
    if ( deps.result === false ) return;

    let { chatInput, chatSend } = deps;

    if ( eClick.toElement.classList.value == vkfpSettings.classes.bDel ) return;

    chatInput.innerHTML = this._text;
    chatSend.click();
  }

  delete() {
    this.button.remove();
    vkfp.deleteButton( this._id );
    vkfp.updateStorage();
  }

}
