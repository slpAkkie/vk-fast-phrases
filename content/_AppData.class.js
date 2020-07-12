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
    { "pos": 0, "style": "default", "alias": null, "message": 'Понимаю', "attaches": null },
    { "pos": 1, "style": "default", "alias": null, "message": 'Ясно', "attaches": null },
    { "pos": 2, "style": "default", "alias": null, "message": 'Привет', "attaches": null },
    { "pos": 3, "style": "default", "alias": null, "message": 'Пока', "attaches": null },
    { "pos": 4, "style": "default", "alias": null, "message": 'Спокойной ночи', "attaches": null }
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
