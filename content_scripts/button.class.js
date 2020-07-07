/**
 * Класс описывающий кнопку
 */
class _Button {

  constructor( sample ) {

    let { pos, style, alias, message, attaches } = sample;
    this._pos = pos;
    this._style = style;
    this._alias = alias;
    this._message = message;
    this._attaches = attaches;

    this.create();
  }





  /**
   * Получение dom-элемента
   */
  get dom() {
    return this._domObject;
  }





  /**
   * Создание кнопки
   */
  create() {

    this._domObject = document.createElement( 'div' );
    this._domObject.id = `vkfpButton${this._pos}`;
    this._domObject.classList.add( `vkfpButton` );
    this._domObject.addEventListener( `click`, this.send.bind( this ) );
	
	
	
	if ( this._attaches !== null ) this._domObject.classList.add( `vkfpButtonWithAttach` );



    let buttonText = document.createElement( `span` );
    buttonText.classList.add( `vkfpText` );
    buttonText.textContent = this._alias || this._message || `Кнопочка`;



    let buttonDelete = document.createElement( `span` );
    buttonDelete.classList.add( `vkfpDelete` );
    buttonDelete.addEventListener( `click`, this.delete.bind( this ) );



    this._domObject.append( buttonText, buttonDelete );

  }





  /**
   * Отправка сообщения
   */
  send( click ) {
    if ( click.toElement.classList.value == 'vkfpDelete' ) return;



    let deps = app.getDeps();
    if ( deps.result === false ) return;



    deps.chatInput.textContent += this._message;
    for ( let key in this._attaches ) {
      let script = document.createElement( `script` );
      script.innerText = `
	  try {
		cur.addMedia[ 1 ].chooseMedia.pbind( '${key}', '${this._attaches[ key ]}', {} )();
	  } catch { }
	  `;
      document.body.appendChild( script );
      script.remove();
    }



    deps.chatSend.click();
  }





  /**
   * Удаление кнопки
   */
  delete() {

    app._buttons[ this._pos ].dom.remove();



    delete app._buttons[ this._pos ];

    for ( let i = this._pos; i < app.templates.length - 1; i++ ) {
      app.templates[ i ] = app.templates[ i + 1 ];
      this._pos = i;
      app._buttons[ i ][ this._pos ] = i;
    }

    app.templates.length -= 1;

  }

}
