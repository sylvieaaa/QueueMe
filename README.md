# QueueMe

## Install primeng
**npm install primeng --save** <br/>
**npm install font-awesome --save** <br/>
**npm install @angular/animations --save** <br/>
**go to QueueMe\node_modules\@ionic\app-scripts\config and open copy.config** <br/>
**add the following to the end after copySwToolBox:** <br/>
copyPrimeng: {
    src: ['{{ROOT}}/node_modules/primeng/resources/themes/omega/theme.css', '{{ROOT}}/node_modules/primeng/resources/primeng.min.css', '{{ROOT}}/node_modules/font-awesome/css/font-awesome.min.css'],
    dest: '{{BUILD}}/assets/css'
  }, <br/>
  copyFontAwesome: {
    src: ["{{ROOT}}/node_modules/font-awesome/fonts/**/*"],
    dest: "{{BUILD}}/assets/fonts"
  }