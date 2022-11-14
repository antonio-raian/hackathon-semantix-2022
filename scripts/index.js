const miliseg = document.querySelector('.miliseconds');
const seg = document.querySelector('.seconds');
const min = document.querySelector('.minutes');

let miliNum = 99;
let segNum = 59;
let minNum = 59;
let INTERVALO;

function milissegundos() {
  miliNum--;

  if (miliNum == 0) {
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
  if (segNum == 0) {
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
  if (minNum < 10) {
    return (min.innerHTML = '0' + minNum);
  }
  return (min.innerHTML = minNum);
}

function iniciar() {
  miliseg.innerHTML = miliNum;
  seg.innerHTML = segNum;
  min.innerHTML = minNum;
  clearInterval(INTERVALO);
  INTERVALO = setInterval(() => {
    milissegundos();
  }, 10);
}

function parar() {
  clearInterval(INTERVALO);
}

function resetar() {
  clearInterval(INTERVALO);
  miliNum = 99;
  segNum = 59;
  minNum = 59;
  miliseg.innerHTML = '00';
  seg.innerHTML = '00';
  min.innerHTML = '01';
}
