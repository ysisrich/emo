



export function handleScroll(params) {
    params.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    if (params.scrollTop > 500) {
        params.goTopShow = true;
    }
}

export function Scroll(params) {
    clearInterval(params.timer);
    params.timer = setInterval(()=> {
        if (params.scrollTop > 0) {
            params.scrollTop -= 50;
            document.body.scrollTop = document.documentElement.scrollTop =
                params.scrollTop;
        } else {
            clearInterval(params.timer);
            params.goTopShow = false;
        }
    },20);
}