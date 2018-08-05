### xlsxvo ([English Document](./README_EN.md))
* 把excel转成代码可阅读的vo类型
* 自动生成各种开发语言自定义的静态文件

### 更新日志
* v0.1.0

### 使用说明
* 目前只支持.xlsx格式，不支持.xls格式。
* 本项目是基于nodejs的，所以需要先安装nodejs环境。
* 执行命令
```bash
# Clone this repository
git clone https://github.com/hk86s/xlsxvo.git
# Go into the repository
cd xlsxvo
# Install dependencies
npm install
```

### 配置说明
```javascript
{
    "xlsx": {
        /** 定义属性的行 */
        "title": 2,
        /** 定义属性的行 */
        "note": 3,
        /** xlsx文件路径 */
        "path": "./Demo.xlsx",
    },
    "json": {
        /** 是否压缩JSON */
        "uglify": false,
        /** 导出的JSON文件的路径 */
        "path": "./Demo.json"
    },
    /**
    * 导出类文件，用于不同开发语言直接读取数据作为常量或初始变量使用
    * 支持同时发布更多语言，模板可由开发者根据项目需求自定义实现
    */
    "lang": [
        {
            /** 表示为该语言定义的变量类型所在行号 */
            "define": 1,
            /** 表示为生成该语言的文件模板，系统将自动替换模板内的占位符为实际类名或变量名 */
            "template": "./ts.templ",
            /** true表示把所有类合并到同一个文件中，否则将以类名分别命名 */
            "merge": false,
            /** 为文件输出目录 */
            "path": "./ts"
        }
    ],
    /** 将excel直接导出成protobuf流文件 */
    "protobuf": {
        /** 表示为该语言定义的变量类型所在行号 */
        "define": 1,
        /** 使用proto2语法，或是proto3语法 */
        "syntax": 3,
        /** 表示把所有类合并到同一个文件中，否则将以类名分别命名 */
        "merge": false,
        /** proto为文件输出目录 */
        "path": "./protobuf"
    }
}
```