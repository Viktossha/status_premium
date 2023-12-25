import '../scss/style.scss';
import '../fonts/fonts.scss';
import $ from 'jquery';
import 'jquery.inputmask';
import 'inputmask.numeric.extensions';
import validate from 'jquery-validation';

$(document).ready(function () {

    $('input[name="phone"]').inputmask("+7(999)999-99-99");

    $.validator.addMethod("minlenghtphone", function (value, element) {
        return value.replace(/\D+/g, '').length > 10;
    })


    $('#main-form').validate({
        rules: {
            user: 'required',
            phone: {
                required: true,
                minlenghtphone: true
            }
        },
        messages: {
            user: 'Это поле обязательно для заполнения',
            phone: {
                required: 'Это поле обязательно для заполнения',
                minlenghtphone: '10-значный формат номера'
            },
        },
        submitHandler: function (form) {
            $('.popup__bg').fadeIn()
            $('#main-form').trigger('reset');
        }
    });

    $('#step-form').validate({
        rules: {
            user: 'required',
            phone: {
                required: true,
                minlenghtphone: true
            }
        },
        messages: {
            user: 'Это поле обязательно для заполнения',
            phone: {
                required: 'Это поле обязательно для заполнения',
                minlenghtphone: '10-значный формат номера'
            },
        },
        submitHandler: function (form) {
            $('.popup__bg').fadeIn()
            $('#main-form').trigger('reset');
        }
    });

    $(document).click(function (e) {
        if ($(e.target).is('.popup__bg')) {
            $(".popup__bg").fadeOut();
        }
    });
})
