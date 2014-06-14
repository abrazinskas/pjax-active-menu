pjax-active-menu
================
This plugin allows adding active class to the menu items if pjax is used.
By default navigation items are not marked as being active, based on the current position. 
Pjax active menu is a javascript plugin that uses regular expressions to map current url and the appropriate navigation item.


How to use it
================
```javascript
//by default, all items with attribute ‘url-matcher’ will be taken into an account. 
$(document).ready(function(){

$('ul.nav').pjax_menu();  
});
```

or
```javascript
// an argument is a name of the attribute used on the navigation items which contains the regular expression. 
$(document).ready(function(){

$('ul.nav').pjax_menu('data-target');

)};
```




HTML markup example
-------------------
```html
<ul class="nav navbar-nav">
					<li class="active"><a href="/?page=page1" data-target="\/\?page\=page1">Page1</a></li>
					<li><a href="/?page=page2" data-target="\/\?page\=page2">Page2</a></li>
					<li><a href="/?page=page3" data-target="\/\?page\=page3">Page3</a></li>
				</ul>
```				


Matchers (Regular expressions)
-----------------

Regular expressions play a key role in mapping urls to navigation items. 
Here are couple of examples of mappers, that can be used:

`\/pages/home`  -> /pages/home

`\/gallery/photos/\d+` ->  /gallery/photos/1, /gallery/photos/100, /gallery/photos/99,etc

				
Note
-----------------

At the moment it maps only relative url, so it will not work for subdomains.			
				
Live presentation
======================
http://pjax-active-menu.herokuapp.com/


