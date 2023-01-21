function sizeRange(checkbox) {
    var checkboxes = document.getElementsByName('size-range')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}

let hello="https://assets.ajio.com/medias/sys_master/root/20220326/jxmg/623e2e48aeb26921aff93bc4/-473Wx593H-441138425-navy-MODEL.jpg";

let bye="https://assets.ajio.com/medias/sys_master/root/20220326/T06L/623e3371aeb26921aff96490/-473Wx593H-441138425-navy-MODEL4.jpg";


function changeImg(x,img){
    if(x==1){
        img.src=hello
    }
    if(x==2){
        img.src=bye
    }
}