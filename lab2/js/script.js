(function () {

    var form = document.querySelector('.formWithValidation'); //для того, чтобы использовать дочерние от нужной form
    var validateBtn = form.querySelector('.validateBtn');
    var name1 = form.querySelector('.name');
    var password = form.querySelector('.password');
    var passwordConfirmation = form.querySelector('.passwordConfirmation');
    var date = form.querySelector('.date');
    var num = form.querySelector('.num');
    var numr = form.querySelector('.numr');
    var fields = form.querySelectorAll('.field');

    form.addEventListener('submit', function (event) {

        event.preventDefault(); //не даем страничке обновиться после submit
        removeValidation(); //избегаем дублирования валидации

        //checkFieldsPresence(); //проверка на пустые поля
        checkPasswordMatch(); //проверка паролей
        checkDate();
        checkNum();
        checkNumR();
        checkName();

    });

    var checkName = function () {
        if (checkFieldsPresence1(name1) == false)
            return; //проверка на пустые поля
        if ((/[^a-zA-Z0-9]/.test(name1.value))) {
            var error = generateError('Некоректний ввід');
            name1.parentElement.insertBefore(error, name1);
        }
    };

    var checkDate = function () {
        if (checkFieldsPresence1(date) == false)
            return; //проверка на пустые поля
        /*var arrD = date.value.split(".");
        if ((arrD.length != 3) || (arrD[0] < 1) || (arrD[0] > 31) || (arrD[1] < 1) || (arrD[1] > 12) || (arrD[2] < 0) || (arrD[2] > 2018) || (arrD[1] == 2 && arrD[0] > 28)) {
            var error = generateError('Invalid Date');
            date.parentElement.insertBefore(error, date);
        }*/
        
        var arrD = date.value.split(".");
        arrD[1] -= 1;
        var d = new Date(arrD[2], arrD[1], arrD[0]);
        if((d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0])) {
            return;
        } else {
            var arrD = date.value.split("/");
            arrD[1] -= 1;
            var d = new Date(arrD[2], arrD[1], arrD[0]);
            if((d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0])) {
            return;
            } else {
                 var error = generateError('Некоректна дата');
                date.parentElement.insertBefore(error, date);
            }
        }

    /*   
           var arrD = date.value.split(".");
            arrD[1] -= 1;
            var d = new Date(arrD[2], arrD[1], arrD[0]);
            if((d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0])) {
                return;
            } else {
                var error = generateError('Некоректна дата');
                date.parentElement.insertBefore(error, date);
            }
    */

    };

    var checkNum = function () {
        if (checkFieldsPresence1(num) == false)
            return; //проверка на пустые поля
        if (parseInt(num.value) != num.value) {
            var error = generateError('Некоректний ввід');
            num.parentElement.insertBefore(error, num);
        }
    };

    function isInteger(num) {
        return (num ^ 0) === num;
    }

    var checkNumR = function () {
        if (checkFieldsPresence1(numr) == false)
            return; //проверка на пустые поля
        var arr = numr.value;
        for (var i = 0; i < arr.length - 2; i++) {
            if ((arr[i] == 's') && (arr[i + 1] == 'q') && (arr[i + 2] == 'r')) {
                var error = generateError('Некоректний ввід');
                numr.parentElement.insertBefore(error, numr);
                break;
            }
        }
    };

    var checkPasswordMatch = function () {
        if (checkFieldsPresence1(password) == false || checkFieldsPresence1(passwordConfirmation) == false)
            return; //проверка на пустые поля
        if (password.value !== passwordConfirmation.value) {
            //console.log('not equals');
            var error = generateError('Паролі не співпадають');
            //console.log(error);
            password.parentElement.insertBefore(error, password);
        }
    };

    var checkFieldsPresence1 = function (arr) {
        if (!arr.value) {
            var error = generateError('Заповніть це поле');
            arr.parentElement.insertBefore(error, arr);
            return false;
        }
    };
    //првоерка, пустое ли поле
    //var checkFieldsPresence = function () {
    //    for (var i = 0; i < fields.length; i++) {
    //        if (!fields[i].value) {
    //            var error = generateError('Cant be blank');
    //            form[i].parentElement.insertBefore(error, fields[i]);
    //            return false;
    //        }
    //    }
    //};
    //удаление всех блоков с class="error"
    var removeValidation = function () {
        var errors = form.querySelectorAll('.error');
        for (var i = 0; i < errors.length; i++) {
            errors[i].remove();
        }
    };
    //генерация ошибки
    var generateError = function (text) {
        var error = document.createElement('div');
        error.className = 'error';
        error.style.color = 'red';
        error.innerHTML = text;
        return error;
    };
})();
