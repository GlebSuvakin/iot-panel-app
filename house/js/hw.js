function fun1() {
    var rng = document.getElementById('r1'); //rng - это ползунок
    var light = document.getElementById('light'); // i1 - input
    light.value = rng.value;
}

function fun2() {
    var rng = document.getElementById('r2'); //rng - это ползунок
    var temp = document.getElementById('temp'); // i1 - input
    temp.value = rng.value;
}