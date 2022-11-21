const miliseg = document.querySelector('.miliseconds');
const seg = document.querySelector('.seconds');
const min = document.querySelector('.minutes');

let miliNum = 99;
let segNum = 10;
let minNum = 1;
let INTERVALO

function milissegundos() {
  miliNum--;

  if (miliNum < 0) {
    miliNum = 99;
    return segundos();
  }
  if (miliNum < 10) {
    return (miliseg.innerHTML = '0' + miliNum);
  }
  return (miliseg.innerHTML = miliNum);
}

function segundos() {
  segNum--;
  if (segNum < 0) {
    segNum = 59;
    return minutos();
  }
  if (segNum < 10) {
    return (seg.innerHTML = '0' + segNum);
  }
  return (seg.innerHTML = segNum);
}

function minutos() {
  minNum--;
  if (minNum < 0) return 'finish';
  if (minNum < 10) {
    return (min.innerHTML = '0' + minNum);
  }
  return (min.innerHTML = minNum);
}

function iniciar() {
  document.querySelector('.iniciar').style.display = 'none';
  miliseg.innerHTML = miliNum;
  seg.innerHTML = segNum;
  min.innerHTML = minNum;
  clearInterval(INTERVALO)
  INTERVALO = setInterval(() => {
    let resp = milissegundos();
    if(resp === "finish") clearInterval(INTERVALO)
  }, 10);
}

function validateSize(e) {
  console.log(e.target);
  if (e.target.value > 9) e.target.value = 9;
}

function checkPasswd(){
  let n1 = document.getElementById("number1").value;
  let n2 = document.getElementById("number2").value;
  let n3 = document.getElementById("number3").value;
  let n4 = document.getElementById("number4").value;

  console.log(n1+n2+n3+n4, process.env.PASSWD)
}
