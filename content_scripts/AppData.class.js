/**
 * Настройки расширения
 * Хранит в себе стандартный конфиг кнопок и необходимые для работы настройки
 * @author slpakkie
 */
class _AppData {

  /** Версия расширения */
  _currentVersion = 2;

  /** ID интервала */
  _intervalId;
  /** Интервал времени для мониторинга */
  _intervalTime = 10;

  /** true, если кнопки были созданы */
  _buttonsCreated = false;



  /**
   * Стандартный набор кнопок
   * @readonly
   */
  _defaultSamples = [
    { "pos": 0, "style": "default", "alias": "Послать на ***", "message": 'Пошел нахуй!🖕🏻', "attaches": null },
    { "pos": 1, "style": "default", "alias": null, "message": 'Ясно', "attaches": null },
    { "pos": 2, "style": "default", "alias": null, "message": 'Понятно', "attaches": null },
    { "pos": 3, "style": "default", "alias": null, "message": 'Ага, ага', "attaches": null },
    { "pos": 4, "style": "default", "alias": null, "message": 'Ммм...', "attaches": null },
    { "pos": 5, "style": "default", "alias": null, "message": 'Понимаю', "attaches": null },
    { "pos": 6, "style": "default", "alias": null, "message": 'Осуждаю', "attaches": null },
    { "pos": 7, "style": "default", "alias": null, "message": 'Ахапхахпхах', "attaches": null },
    { "pos": 8, "style": "default", "alias": null, "message": 'Получается так', "attaches": null },
    { "pos": 9, "style": "default", "alias": "FFF", "message": '', "attaches": { "photo": "172226864_457266456" } }
  ];

  /**
   * Стандартная конфигурация
   * @readonly
   */
  _defaultConf = {
    "version": "2",
    "firstStart": false,
    "savedConf": "true",
    "samples": this.defaultSamples
  };





  /**
   * Получить версию расширения
   */
  get currentVersion() {
    return this._currentVersion;
  }



  /**
   * Установить ID интервала
   * @param {number} value
   */
  set intervalId( value ) {
    this._intervalId = value;
  }

  /**
   * Получить ID интервала
   * @returns {number} Interval-ID
   */
  get intervalId() {
    return this._intervalId;
  }



  /** Получить интервал для заупска мониторинга */
  get intervalTime() {
    return this._intervalTime;
  }



  /**
   * Получить стандартный набор кнопок в формате JSON
   * @returns {string} JSON-string
   */
  get defaultSamples() {
    return JSON.stringify( this._defaultSamples );
  }



  /**
   * Получить стандартную конфигурацию
   * @returns {string} JSON-string
   */
  get defaultConf() {
    return JSON.stringify( this._defaultConf );
  }



  /**
   * Установить статус создания кнопок
   */
  set buttonsCreated( value ) {
    this._buttonsCreated = value;
  }

  /**
   * Получить статус создания кнопок
   */
  get buttonsCreated() {
    return this._buttonsCreated;
  }

}
