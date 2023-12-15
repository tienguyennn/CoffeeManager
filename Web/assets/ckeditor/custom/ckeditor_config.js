/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function (config) {
    // Define changes to default configuration here. For example:
    //config.language = 'vi';
    //config.uiColor = '#ffffff';
    ////config.filebrowserBrowseUrl = '/fileman/index.html';
    ////config.filebrowserImageBrowseUrl = '/fileman/index.html' + '?type=image';
    ////config.removeDialogTabs = 'link:upload;image:upload';
    //config.toolbar_Basic = [['Bold', 'Italic', 'Underline', 'Strike','Image', '-'], ['NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'TextColor', '-'], ['Styles', 'Font', 'FontSize']];
    //config.toolbar = 'Basic';

    config.language = 'vi';
    //config.filebrowserBrowseUrl = '/fileman/index.html';
    //config.filebrowserImageBrowseUrl = '/fileman/index.html';
    //config.removeDialogTabs = 'link:upload;image:upload';
    config.plugins = 'dialogui,dialog,about,a11yhelp,dialogadvtab,basicstyles,bidi,blockquote,notification,button,toolbar,clipboard,panelbutton,panel,floatpanel,colorbutton,colordialog,templates,menu,contextmenu,copyformatting,div,resize,elementspath,enterkey,entities,popup,filetools,filebrowser,find,fakeobjects,flash,floatingspace,listblock,richcombo,font,forms,format,horizontalrule,htmlwriter,iframe,wysiwygarea,image,indent,indentblock,indentlist,smiley,justify,menubutton,language,link,list,liststyle,magicline,maximize,newpage,pagebreak,pastetext,pastetools,pastefromgdocs,pastefromword,preview,print,removeformat,save,selectall,showblocks,showborders,sourcearea,specialchar,scayt,stylescombo,tab,table,tabletools,tableselection,undo,lineutils,widgetselection,widget,notificationaggregator,uploadwidget,uploadimage,wsc';
    //config.extraPlugins = 'html5video,html5audio,simple-ruler';
    config.skin = 'moono-lisa';
};
