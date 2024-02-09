document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("pollForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        var poll1 = document.getElementById("poll1").value;
        var poll2 = document.getElementById("poll2").value;
        var poll3 = document.getElementById("poll3").value;
        var poll4 = document.getElementById("poll4").value;
        var chartType = document.querySelector("input[name='chart-type']:checked").value;

        var formData = {
            "Poll1": poll1,
            "Poll2": poll2,
            "Poll3": poll3,
            "Poll4": poll4,
            "ChartType": chartType
        };
        console.log(formData);
        window.location.href = "mainpage/mainpage.html";
        form.reset();
    });
});
