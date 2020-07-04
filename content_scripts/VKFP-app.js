/** Объект настроек расширения */
let vkfpSettings = new _vkfpSettings();

/** Класс приложения */
class _vkfp {
  /** Массив всех кнопок */
  _buttonList = {};

  constructor() {
    // chrome.storage.local.clear();

    chrome.storage.local.get( null, ( value ) => {
      if ( value.isSaved === undefined ) {
        chrome.storage.local.set( { isSaved: true } );
        this.updateStorage();

        alert( `
Вы впревые запустили расширение.
Для того что бы использовать кнопку зайдите в любой диалог и нажмите на нее
Для того что бы удалить кнопку, наведите на нее и нажмите крестик.
Для того что бы добавить кнопку напечатайте текст в поле сообщения и нажмите плюсик
        `);

      } else {
        chrome.storage.local.get( 'buttons', ( ( value ) => {
          vkfpSettings.buttonSamples = JSON.parse( value.buttons );
        } ) );
      }

      /** Создание стилей и их вставка */
      let vkfpStyles = document.createElement( 'style' );
      vkfpStyles.innerText = vkfpSettings.styles;
      document.getElementsByTagName( 'head' )[ 0 ].append( vkfpStyles );

      /** Интервал для мониторинга url */
      vkfpSettings.pageListener = setInterval( this.locationChecker.bind( this ), vkfpSettings.updateTime );
    } );
  }

  updateStorage() {
    chrome.storage.local.set( { buttons: JSON.stringify( vkfpSettings.buttonSamples ) } );
  }

  /** Функция мониторинга url */
  locationChecker() {
    try {
      /** Если мы не на странице диалогов, то кнопок нет, и добавлять их некуда */
      if ( window.location.pathname.search( '/im' ) === -1 ) {
        vkfpSettings.isExist = false;
        return;
      }

      /** Если мы на странице диалогов и кнопки уже созданы, обновляем видимость */
      if ( vkfpSettings.isExist ) {
        this.updateVisibility();
        return;
      }
      /** Если мы на странице диалогов и кнопок нет, то создаем их и задаем им видимость */
      this.loadButtons();
      vkfpSettings.isExist = true;
      this.updateVisibility();
    } catch ( e ) {
      this.printError( e );
    }
  }

  /** Функция создания кнопок */
  loadButtons() {
    /** Куда будем вставлять блок с кнопками - Арендодатель */
    let landlord = document.querySelector( vkfpSettings.queries.landlord ) || document.querySelector( vkfpSettings.queries.secondaryLandlord ) || null;
    if ( landlord === null ) return;

    /** Контейнер для всех кнопок */
    this.vkfpContainer = document.createElement( vkfpSettings.tags.container );
    this.vkfpContainer.id = vkfpSettings.IDs.container;

    this.vkfpBWrapper = document.createElement( vkfpSettings.tags.bWrapper );
    this.vkfpBWrapper.id = vkfpSettings.IDs.bWrapper;

    /** Перебираем стандартный набор кнопок и добавляем их на страницу */
    vkfpSettings.buttonSamples.forEach( ( buttonSample ) => {
      this.createButton( buttonSample );
    } );

    let bNew = document.createElement( vkfpSettings.tags.button );
    bNew.id = vkfpSettings.IDs.bNew;
    bNew.classList.add( vkfpSettings.classes.button );
    bNew.textContent = 'Добавить кнопку';
    bNew.addEventListener( 'click', this.add.bind( this ) );

    this.vkfpContainer.append( this.vkfpBWrapper, bNew );

    /** Добавялем полученный блок кнопок в блок Арендодателя */
    landlord.append( this.vkfpContainer );
  }

  createButton( sample ) {
    /** Создаем кнопку */
    this._buttonList[ sample.id ] = new _Button( sample );
    /** Вставляем кнопку в контейнер */
    this.vkfpBWrapper.append( this._buttonList[ sample.id ].get() );
  }

  /** Функция обновления видимости блока кнопок */
  updateVisibility() {
    /** Если мы не на странцие конкретного диалога, то скрываем блок кнопок */
    document.querySelector( vkfpSettings.queries.pageHistory ) === null
      ? ( document.querySelector( vkfpSettings.queries.container ).classList.add( vkfpSettings.classes.hidden ) )
      : ( document.querySelector( vkfpSettings.queries.container ).classList.remove( vkfpSettings.classes.hidden ) );
  }

  deleteButton( id ) {
    for ( let i = id; i < vkfpSettings.buttonSamples.length - 1; i++ ) vkfpSettings.buttonSamples[ i ] = vkfpSettings.buttonSamples[ i + 1 ];
    vkfpSettings.buttonSamples.length -= 1;
  }

  add() {
    let chatInput = document.querySelector( vkfpSettings.queries.chatInput ),
	    emoji = chatInput.querySelectorAll('img.emoji');
    emoji.forEach((emj) => {emj.replaceWith(emj.getAttribute('alt'))});
    let bText = chatInput.innerHTML;
    if ( bText.length === 0 ) return;
    let nButton = { text: bText, id: vkfpSettings.buttonSamples.length, styleId: 0 };
    this.createButton( nButton );
    vkfpSettings.buttonSamples.push( nButton );
    this.updateStorage();
    chatInput.innerHTML = null;
  }

  printError( e ) {
    alert( 'Во время работы расширения произошла ошибка\nРабота расширения приостановлена' );
    console.error( e );

    clearInterval( vkfpSettings.pageListener );
  }
}

/** Создаем объект приложения */
let vkfp = new _vkfp();
