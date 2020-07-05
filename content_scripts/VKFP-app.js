/** инициализируем конфигурацию приложения */
let vkfpSettings = new _vkfpSettings();

/** Класс приложения */
class _vkfp {
  /** Объект хранит все наши кнопки находящиеся на странице */
  _buttonList = {};

  constructor() {
    // chrome.storage.local.clear();

    // Проверяем хранилище
    chrome.storage.local.get( null, ( value ) => {
      if ( value.firstLunch === undefined ) {
        // Поблагодарим за уставноку
        alert( `Спасибо за установку расширения\nЧтобы прочитать больше про расширение нажмите цветную икноку расширения около адресной строки вашего браузера` );
        // И запишем, что пользователь уже видел это сообщение
        chrome.storage.local.set( { firstLunch: false } );
      }

      if ( value.isSaved === undefined || value.isSaved === false ) {
        // Если поля isSaved нет или оно установлено в False, значит конфигурация не сохранена или ее нет
        // Поэтому мы загрузим конфигурацию по умолчанию
        this.updateStorage();
        chrome.storage.local.set( { isSaved: true } );
      } else {
        // Иначе загрузим ее из хранилища
        chrome.storage.local.get( 'buttons', ( ( value ) => {
          vkfpSettings.buttonSamples = value.buttons === undefined ? [] : JSON.parse( value.buttons );
        } ) );
      }

      /** Интервал для мониторинга url */
      vkfpSettings.pageListener = setInterval( this.locationChecker.bind( this ), vkfpSettings.updateTime );
    } );
  }

  // Обновление конфигурации в хранилище
  updateStorage() {
    chrome.storage.local.set( { buttons: JSON.stringify( vkfpSettings.buttonSamples ) } );
  }

  /** Мониторинг url */
  locationChecker() {
    try {
      /** Если мы не на странице диалогов, то кнопок нет, и добавлять их некуда - Выходим */
      if ( window.location.pathname.search( '/im' ) === -1 ) {
        vkfpSettings.isExist = false;
        return;
      }

      /** Если кнопки уже созданы, обновляем видимость и выходим */
      if ( vkfpSettings.isExist ) {
        this.updateVisibility();
        return;
      }
      /** Если кнопок нет, то создаем из и задаем видимость */
      this.loadButtons();
      vkfpSettings.isExist = true;
      this.updateVisibility();
    } catch ( e ) {
      this.stopByError( e );
    }
  }

  /** Загрузка кнопок из заготовок */
  loadButtons() {
    /** Родительский блок для всего блока кнопок */
    let landlord = document.querySelector( vkfpSettings.queries.landlord ) || document.querySelector( vkfpSettings.queries.secondaryLandlord ) || null;
    /** Если по каким-либо причинам не получается получить родительский блок, выходим */
    if ( landlord === null ) {
      /** Оповестим об ошибке */
      this.stopByError( 'Родительский блок (landlord) не был получен' );
      return;
    }

    /** Контейнер для всех кнопок */
    this.vkfpContainer = document.createElement( vkfpSettings.tags.container );
    this.vkfpContainer.id = vkfpSettings.IDs.container;

    /** Обертка для кнопок пользователя */
    this.vkfpBWrapper = document.createElement( vkfpSettings.tags.bWrapper );
    this.vkfpBWrapper.id = vkfpSettings.IDs.bWrapper;

    /** Перебираем заготовки кнопок и добавляем их на страницу */
    vkfpSettings.buttonSamples.forEach( ( buttonSample ) => { this.createButton( buttonSample ); } );

    /** Создаем кнопку для добавления новых пользовательских кнопок */
    let bNew = document.createElement( vkfpSettings.tags.button );
    bNew.id = vkfpSettings.IDs.bNew;
    bNew.classList.add( vkfpSettings.classes.button );
    bNew.addEventListener( 'click', this.add.bind( this ) );

    /** Закидываем все кнопки в контейнер */
    this.vkfpContainer.append( this.vkfpBWrapper, bNew );

    /** Добавляем контейнер в родительский блок */
    landlord.append( this.vkfpContainer );
  }

  /** Создание и добавление кнопки */
  createButton( sample ) {
    /** Создаем кнопку через конструктор объекта */
    this._buttonList[ sample.id ] = new _Button( sample );
    /** Вставляем кнопку в контейнер */
    this.vkfpBWrapper.append( this._buttonList[ sample.id ].get() );
  }

  /** Обновление видимости блока кнопок */
  updateVisibility() {
    /** Если не открыт диалог - скрыть блок */
    document.querySelector( vkfpSettings.queries.pageHistory ) === null
      ? ( document.querySelector( vkfpSettings.queries.container ).classList.add( vkfpSettings.classes.hidden ) )
      : ( document.querySelector( vkfpSettings.queries.container ).classList.remove( vkfpSettings.classes.hidden ) );
  }

  /** Удаление кнопки */
  deleteButton( id ) {
    /** Смещаем все кнопки, идущие за удаляемой к началу на одну позицию */
    for ( let i = id; i < vkfpSettings.buttonSamples.length - 1; i++ ) vkfpSettings.buttonSamples[ i ] = vkfpSettings.buttonSamples[ i + 1 ];
    /** И уменьшаем длину массива */
    vkfpSettings.buttonSamples.length -= 1;
  }

  /** Добавить новую кнопку */
  add() {
    /** ПОлучаем содержимое поля сообщения и эмодзи в нем */
    let chatInput = document.querySelector( vkfpSettings.queries.chatInput ),
      emoji = chatInput.querySelectorAll( 'img.emoji' );
    /** Заменяем тэг img, содержащий эмодзи, на его атрибут alt, хранящий только сам эмодзи */
    emoji.forEach( ( emj ) => { emj.replaceWith( emj.getAttribute( 'alt' ) ) } );
    /** Запоминаем текст из поля сообщения */
    let bText = chatInput.innerHTML;
    /** Если поле сообщения было пустым - выходим */
    if ( bText.length === 0 ) return;
    /** Создаем заготовку кнопки */
    let nButton = { text: bText, id: vkfpSettings.buttonSamples.length, styleId: 0 };
    /** Создаем кнопку */
    this.createButton( nButton );
    /** Добавляем в список */
    vkfpSettings.buttonSamples.push( nButton );
    /** Обновляем хранилище, что бы добавить туда новую кнопку */
    this.updateStorage();
    /** Очищаем поле сообщения */
    chatInput.innerHTML = null;
  }

  /** Остановить работу приложения с сообщением об ошибке */
  stopByError( e ) {
    /** Оповещаем пользователе об ошибке и выводим лог */
    alert( 'Во время работы расширения произошла ошибка\nРабота расширения приостановлена' );
    console.error( e );

    /** Очищаем интервал, что бы не копить ошибки */
    clearInterval( vkfpSettings.pageListener );
  }
}

/** Запускаем приложение */
let vkfp = new _vkfp();
