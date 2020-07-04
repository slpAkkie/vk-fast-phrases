/** Объект настроек расширения */
let vkfpSettings = new _vkfpSettings();

/** Класс приложения */
class _vkfp {
  /** Массив всех кнопок */
  _buttonList = [];

  constructor() {
    /** Создание стилей и их вставка */
    let vkfpStyles = document.createElement( 'style' );
    vkfpStyles.innerText = vkfpSettings.styles;
    document.getElementsByTagName( 'head' )[ 0 ].append( vkfpStyles );

    /** Интервал для мониторинга url */
    vkfpSettings.pageListener = setInterval( this.locationChecker.bind( this ), vkfpSettings.updateTime );
  }

  /** Функция создания кнопок */
  insertButtons() {
    /** Куда будем вставлять блок с кнопками - Арендодатель */
    let landlord = document.querySelector( vkfpSettings.queries.landlord ) || document.querySelector( vkfpSettings.queries.secondaryLandlord ) || null;
    if ( landlord === null ) return;

    /** Контейнер для всех кнопок */
    let vkfpContainer = document.createElement( vkfpSettings.tags.container );
    vkfpContainer.id = vkfpSettings.IDs.container;

    /** Перебираем стандартный набор кнопок и добавляем их на страницу */
    vkfpSettings.defaultButtons.forEach( ( buttonSample ) => {
      /** Создаем кнопку */
      let button = new Button( buttonSample.message );
      this._buttonList.push( button );
      /** Вставляем кнопку в контейнер */
      vkfpContainer.append( button.get() );
    } );

    /** Добавялем полученный блок кнопок в блок Арендодателя */
    landlord.append( vkfpContainer );
  }

  /** Функция обновления видимости блока кнопок */
  updateVisibility() {
    /** Если мы не на странцие конкретного диалога, то скрываем блок кнопок */
    document.querySelector( vkfpSettings.queries.pageHistory ) === null
      ? ( document.querySelector( vkfpSettings.queries.container ).classList.add( 'VKFP-hide' ) )
      : ( document.querySelector( vkfpSettings.queries.container ).classList.remove( 'VKFP-hide' ) );
  }

  /** Функция мониторинга url */
  locationChecker() {
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
    this.insertButtons();
    vkfpSettings.isExist = true;
    this.updateVisibility();
  }
}

/** Создаем объект приложения */
let vkfp = new _vkfp();
