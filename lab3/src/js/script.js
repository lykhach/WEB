(function () {
    var form = document.querySelector('.formWithValidation');
    var validateBtn = form.querySelector('.validateBtn');
    var name1 = form.querySelector('.name');
    var password = form.querySelector('.password');
    var passwordConfirmation = form.querySelector('.passwordConfirmation');
    var date = form.querySelector('.date');
    var num = form.querySelector('.num');
    var numr = form.querySelector('.numr');
    var fields = form.querySelectorAll('.field');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        removeValidation();
        checkPasswordMatch();
        checkDate();
        checkNum();
        checkNumR();
        checkName();
    });

    if (validateBtn) {
      validateBtn.addEventListener('click', function(event) {
          const elem = {
            data: {
              name: name1.value,
              password: password.value,
              passwordConfirmation: passwordConfirmation.value,
              date: date.value,
              num: num.value,
              numr: numr.value,
            },
          };

          fetch('send', {
              method: 'POST',
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(elem),
          })
          .catch(error => console.log(error));
      });

    }

    var checkName = function () {
        if (checkFieldsPresence1(name1) == false)
            return;
        if ((/[^a-zA-Z0-9]/.test(name1.value))) {
            var error = generateError('Невірний символ');
            name1.parentElement.insertBefore(error, name1);
        }
    };

    var checkDate = function () {
        if (checkFieldsPresence1(date) == false)
            return;

        var arrD = date.value.split(".");
        arrD[1] -= 1;

        var d = new Date(arrD[2], arrD[1], arrD[0]);
        if((d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0])) {
            return;
        } else {
            var error = generateError('Невірна дата');
            date.parentElement.insertBefore(error, date);
        }
    };

    var checkNum = function () {
        if (checkFieldsPresence1(num) == false)
            return; //проверка на пустые поля
        if (parseInt(num.value) != num.value) {
            var error = generateError('Невірне число');
            num.parentElement.insertBefore(error, num);
        }
    };

    function isInteger(num) {
        return (num ^ 0) === num;
    }

    var checkNumR = function () {
        if (checkFieldsPresence1(numr) == false)
            return;
        var arr = numr.value;
        for (var i = 0; i < arr.length - 2; i++) {
            if ((arr[i] == 's') && (arr[i + 1] == 'q') && (arr[i + 2] == 'r')) {
                var error = generateError('Невірне число R');
                numr.parentElement.insertBefore(error, numr);
                break;
            }
        }
    };

    var checkPasswordMatch = function () {
        if (checkFieldsPresence1(password) == false || checkFieldsPresence1(passwordConfirmation) == false)
            return;
        if (password.value !== passwordConfirmation.value) {
            var error = generateError('Паролі не співпадають');
            password.parentElement.insertBefore(error, password);
        }
    };

    var checkFieldsPresence1 = function (arr) {
        if (!arr.value) {
            var error = generateError('Заповніть поле!');
            arr.parentElement.insertBefore(error, arr);
            return false;
        }
    };

    var removeValidation = function () {
        var errors = form.querySelectorAll('.error');
        for (var i = 0; i < errors.length; i++) {
            errors[i].remove();
        }
    };

    var generateError = function (text) {
        var error = document.createElement('div');
        error.className = 'error';
        error.style.color = 'red';
        error.innerHTML = text;
        return error;
    };
})();

function getExistingUsers() {
    fetch('history.json')
    .then(data => {
        return data.json();
    })
    .then(data => {
        var list = document.getElementById('history');
        const realData = data;
        var res = [];

        if (parseInt(realData.count) === 0) {
          document.getElementById('message').innerHTML = "Історія чиста!";
        } else {
            document.getElementById('message').innerHTML = "Історія";
            Object.keys(realData).forEach(k => {
                Object.keys(realData[k]).forEach(v => {
                    (res[v] = (res[v] || { id: v }))[k] = realData[k][v];
                });
            });

            res.forEach(elem => {
                var newLi = document.createElement('li');
                newLi.innerHTML = `
                    Імя = ${elem.name}<br>
                    Дата = ${elem.date}<br>
                    Число = ${elem.num}<br>
                    Число R = ${elem.numr}<br>
                    Пароль = ${elem.password}<br>
                    Повторний Пароль = ${elem.passwordConfirmation}
                `;

                list.appendChild(newLi);
            });
        }
    })
    .catch(error => console.log(error));
}
