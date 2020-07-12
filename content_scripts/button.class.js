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
   * Установка позиции
   * @param {number} value
   */
  set pos( value ) {
    this._pos = value;
  }





  /**
   * Создание кнопки
   */
  create() {

    this._domObject = document.createElement( 'div' );
    this._domObject.id = `vkfpButton${this._pos}`;
    this._domObject.classList.add( `vkfpButton` );
    this._domObject.setAttribute( 'draggable', 'true' );

    this._domObject.addEventListener( 'dragstart', this.dragstart );

    this._domObject.addEventListener( 'drop', this.drop );

    this._domObject.addEventListener( `click`, this.send.bind( this ) );



    if ( this._attaches !== null && this._attaches !== undefined ) this._domObject.classList.add( `vkfpButtonWithAttach` );



    let buttonText = document.createElement( `span` );
    buttonText.classList.add( `vkfpText` );
    buttonText.textContent = this._alias || this._message || `Как у вас это вышло о_О`;



    let buttonDelete = document.createElement( `span` );
    buttonDelete.classList.add( `vkfpDelete` );
    buttonDelete.addEventListener( `click`, this.delete.bind( this ) );



    this._domObject.append( buttonText, buttonDelete );

  }





  dragstart( event ) {
    event.dataTransfer.setData( 'takenId', this.id );
    event.dataTransfer.effectAllowed = `move`;
    event.dataTransfer.dropEffect = `move`;
  }





  drop( event ) {
    app.wrapper.insertBefore( document.querySelector( `#${event.dataTransfer.getData( 'takenId' )}` ), this );



    let newPos = parseInt( this.id.slice( 10 ) ),
      oldPos = parseInt( event.dataTransfer.getData( 'takenId' ).slice( 10 ) );

    app.shiftButtons( oldPos, newPos );
  }





  /**
   * Отправка сообщения
   */
  send( click ) {
    if ( click.toElement.classList.value == 'vkfpDelete' ) return;



    let deps = app.getDeps();



    deps.chatInput.textContent += this._message;



    for ( let key in this._attaches ) {
      let script = document.createElement( `script` );

      script.innerText = `
        {
          let addMediaIndex;
		  for (i in cur.addMedia) { addMediaIndex = i; break; };
      `;

      script.innerText += `try {`;

      this._attaches[ key ].forEach( ( photoId ) => {
        script.innerText += `cur.addMedia[ addMediaIndex ].chooseMedia.pbind( '${key}', '${photoId}', {} )();`;
      } );

      script.innerText += `} catch { } }`;



      document.body.appendChild( script );
      script.remove();

    }



    deps.chatSend.click();
  }





  /**
   * Удаление кнопки
   */
  delete() {

    this._domObject.remove();



    for ( let i = this._pos; i < app._userTemplates.length - 1; i++ ) {
      app._userTemplates[ i ] = app._userTemplates[ i + 1 ];
      app._userTemplates[ i ].pos = i;
      app._buttons[ i ] = app._buttons[ i + 1 ];
      app._buttons[ i ]._pos = i;
    }

    app._userTemplates.length -= 1;
    delete app._buttons[ app._userTemplates.length ];



    app.saveConf();

  }

}
