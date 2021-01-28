let pre_screenW=window.innerWidth;
let pre_screenH=window.innerHeight;
let testVal;
if(pre_screenW<pre_screenH){
    testVal=pre_screenW;
    pre_screenW=pre_screenH;
    pre_screenH=testVal;
}
let isdesktop=true;
const screenW = pre_screenW;
const screenH = pre_screenH;
const speed = 5;