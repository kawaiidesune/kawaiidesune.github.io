
import spUtils from './Utils';

/*-----------------------------------------------
|   Cookie Notice
-----------------------------------------------*/
spUtils.$document.ready(() => {
  const Selector = { NOTICE: '.notice' }
  const DataKeys = { OPTIONS: 'options' }
  const CookieNames = { COOKIE_NOTICE: 'cookieNotice' }
  const Events = { HIDDEN_BS_TOAST: 'hidden.bs.toast' }

  const $notices = $(Selector.NOTICE);
  const defaultOptions = { 
    autoShow: false, 
    autoShowDelay: 0,
    showOnce: false, 
    cookieExpireTime: 3600000 
  };

  const getCookie = (name) => {
    var keyValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : keyValue;
  }
  const setCookie = (name, value, expire) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + expire );
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString();
  }
  $notices.each((index, value) => {
    const $this = $(value);
    const options = $.extend(defaultOptions, $this.data(DataKeys.OPTIONS));
    let cookieNotice;
    if(options.showOnce){
      cookieNotice = getCookie(CookieNames.COOKIE_NOTICE);
    }
    if(options.autoShow && cookieNotice === null){ 
      setTimeout(() => $this.toast('show'), options.autoShowDelay);
     }
  })
  
  $(Selector.NOTICE).on(Events.HIDDEN_BS_TOAST, (e) => {
    const $this = $(e.currentTarget);
    const options = $.extend(defaultOptions, $this.data(DataKeys.OPTIONS));
    options.showOnce && setCookie(CookieNames.COOKIE_NOTICE, false, options.cookieExpireTime);
  });
});
