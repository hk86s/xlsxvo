const xlsx = require("node-xlsx");
const conf = require("./config.json");
var files = xlsx.parse("Demo.xlsx");
var langTypes = [];
for (let i = 0; i < files.length; ++i) {
    let file = files[i];
    if (file.name.charAt(0) != '!') {
        langTypes.push(new LangType(file.data, conf.lang[i].define - 1, conf.xlsx.title - 1));
    }
}
if (conf.json) {
    //i 表序列
    for (let i = 0; i < langTypes.length; ++i) {
        //一张表
        let langType = langTypes[i];
        var jsonData = langType.keyIndex == -1 ? [] : {};
        //j 某张表的行号
        for (let j = conf.xlsx.start - 1 || 0; j < langType.data.length; ++j) {
            let line = langType.data[j];
            let obj = {};
            //k 某张表的列号
            for (let k = 0; k < line.length; ++k) {
                let key = langType.defineKey[k];
                let type = langType.defineType[k];
                let value = parseValue(type, line[k]);
                obj[key] = value;
            }
            if (langType.keyIndex == -1) {
                jsonData.push(obj);
            } else {
                jsonData[obj[langType.defineKey[langType.keyIndex]]] = obj;
            }
        }
    }
}
console.log('complete.');

/**
 * 一张表对应的数据及格式类型等信息
 * @param {Array<Array>} data 
 * @param {number} defineLine 
 * @param {number} titleLine 
 */
function LangType(data, defineLine, titleLine) {
    this.title = [''];
    this.defineKey = [''];
    this.defineType = [''];
    this.keyIndex = -1;
    for (let j = 0; j < data[defineLine].length; ++j) {
        let defineStr = data[defineLine][j];
        let arr = defineStr.split(':');
        this.defineKey[j] = arr[0];
        if (this.defineKey[j].charAt(0) == '*') {
            this.defineKey[j] = this.defineKey[j].substr(1);
            this.keyIndex = j;
        }
        this.defineType[j] = arr.length < 2 ? 'object' : arr[1];
        this.title[j] = data[titleLine][j];
    }
    this.data = data;
}

/**
 * 
 * @param {string} type 
 * @param {string} value 
 * @returns type定义的类型
 */
function parseValue(type, value) {
    switch (type) {
        case 'number': return +value;
        case 'string': return '' + value;
        case 'boolean': return value ? true : false;
        case 'array':
            try {
                var arr = JSON.parse(value);
            } catch (e) {
                var arr = value.split(',');
                for (var i = 0; i < arr.length; ++i) {
                    if (+arr[i] != arr[i]) break;
                }
                if (i == arr.length) {
                    for (let i = 0; i < arr.length; ++i) {
                        arr[i] = +arr[i];
                    }
                }
            }
            return arr;
    }
    try {
        return JSON.parse(value);
    } catch (e) {
        return null;
    }
}