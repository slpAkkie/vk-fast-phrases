/** Класс кнопок */
class Button {
  constructor( text, pos = 0, styleId = 0 ) {
    /** Задаем параметры кнопки */
    this._text = text;
    this._pos = pos;
    this._styleId = styleId;

    /** Создаем ее */
    this.createButton();

    /** Возвращаем */
  }

  /** возвращает объект элемента кнопки */
  get() {
    return this.button;
  }

  set text( value ) {
    this._text = value;
    this.updateButton();
  }

  updateButton() {
    this.button.innerText = this._;
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
    this.button = document.createElement( 'div' );
    this.button.classList.add( vkfpSettings.classes.button );


    let bText = document.createElement( 'span' );
    bText.classList.add( vkfpSettings.classes.bText );
    bText.textContent = this._text;


    let bDel = document.createElement( 'span' );
    bDel.classList.add( vkfpSettings.classes.bDel );


    this.button.append( bText, bDel );

    this.button.addEventListener( 'click', this.send.bind( this ) );
  }

  /** Функция отправки сообщения соответствующего кнопке */
  send( e ) {
    let deps = this.getDependepncies();
    if ( deps.result === false ) return;

    let { chatInput, chatSend } = deps;

    if ( e.toElement.classList.value == vkfpSettings.classes.bDel ) return;

    chatInput.innerHTML = this._text;
    chatSend.click();
  }

  delete() {

  }

}
