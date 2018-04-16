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
  }, 
  
  copyFontAwesome: {
    src: ["{{ROOT}}/node_modules/font-awesome/fonts/**/*"],
    dest: "{{BUILD}}/assets/fonts"
  }


## Set up firebase
**ionic cordova platform remove android** <br/>
**ionic cordova platform add android@6.4.0 --save** <br/>
**ionic cordova plugin add cordova-plugin-fcm** <br/>
**npm install --save @ionic-native/fcm** <br/>
