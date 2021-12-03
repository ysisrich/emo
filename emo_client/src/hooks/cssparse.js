



// 辅助方法：将array转为object
function toObject(array) {
    let ret = {};
    array.forEach(e => {
        const index = e.indexOf(':');
        const property = e.substring(0, index).trim();
        const value = e.substring(index + 1).trim();
        ret[property] = value;
    });
    return ret;
}


/**
 * 将CSS形式的字符串转换为JSON
 * 
 * @param {css字符串} css 
 */
 function css2json(css) {

    let open,close
    // 移除CSS所有注释
    while ((open = css.indexOf("/*")) !== -1 &&
        (close = css.indexOf("*/")) !== -1) {
        css = css.substring(0, open) + css.substring(close + 2);
    }

    // 初始化返回值
    let json = {};

    while (css.length > 0) {
        // 存储第一个左/右花括号的下标
        const lbracket = css.indexOf('{');
        const rbracket = css.indexOf('}');

        // 第一步：将声明转换为Object，如：
        // `font: 'Times New Roman' 1em; color: #ff0000; margin-top: 1em;` 
        //  ==>
        // `{"font": "'Times New Roman' 1em", "color": "#ff0000", "margin-top": "1em"}`
        
        

        // 切割声明块并移除空白符，然后放入数组中
        let declarations = css.substring(lbracket + 1, rbracket)
            .split(";")
            .map(e => e.trim())
            .filter(e => e.length > 0); // 移除所有""空值

        // 转为Object对象
        declarations = toObject(declarations);



        // 第二步：选择器处理，每个选择器会与它对应的声明相关联，如：
        // `h1, p#bar {color: red}`
        // ==>
        // {"h1": {color: red}, "p#bar": {color: red}}

        let selectors = css.substring(0, lbracket)
            // 以,切割，并移除空格：`"h1, p#bar, span.foo"` => ["h1", "p#bar", "span.foo"]
            .split(",")
            .map(selector => selector.trim());

        // 迭代赋值
        selectors.forEach(selector => {
            // 若不存在，则先初始化
            if (!json[selector]) json[selector] = {};
            // 赋值到JSON
            Object.keys(declarations).forEach(key => {
                json[selector][key] = declarations[key];
            });
        });

        // 继续下个声明块
        css = css.slice(rbracket + 1).trim();
    }
    
    // 返回JSON形式的结果串
    return json;
}

/**
 * 将json对象转换为css
 * 
 * @param {json对象} json 
 */
function json2css(json) {
    return JSON.
    stringify(json,4).
    slice(1, JSON.stringify(json).length - 1).
    replace(new RegExp(',', 'gm'), '  ').
    replace(new RegExp('"', 'gm'), '').
    replace(/:{/ig, "{")
}


export default css2json
