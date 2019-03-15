$(document).ready((event) => {
    $('#btn-calculate-bmi').click((event) => {
        event.preventDefault();

        const name = $('#name').val();
        const weight = parseFloat($('#weight').val());
        const height = parseFloat($('#height').val()) / 100;
        const urlString = `/users/bmi?name=${name}&weight=${weight}&height=${height}`;

        // console.log(name, height, weight, urlString);

        $.ajax({
            url: urlString,
            type: 'GET'
        }).done(response => $('#bmi-value').val(response.data))
            .fail(error => console.log(error));
    });
});