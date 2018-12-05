/*jslint browser: true, vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50*/
/*global $, jQuery, alert*/

// Single state object
var state = {
    items: []
};

// State modification functions
var addItem = function (state, item) {
    'use strict';
    state.items.push(item);
};

var removeItem = function (arr, name) {
    'use strict';
    var i;
    for (i = 0; i < arr.items.length - 1; i++) {
        //console.log('i:' + i + '  arr.items.name:' + arr.items[i].name);
        if (arr.items[i].name === name) {
            arr.items.splice(i, 1);
        }
    }
    state = arr;
    //console.log('state length:' + state.items.length);
};

var checkItem = function (arr, name) {
    'use strict';
    var i;
    for (i = 0; i < arr.items.length - 1; i++) {
        //console.log('i:' + i + '  arr.items[i].name:' + arr.items[i].name);
        if (arr.items[i].name === name) {
            console.log('arr.items[i].isChecked:' + arr.items[i].isChecked);
            if (arr.items[i].isChecked) {
                console.log('isChecked is true, set to false');
                arr.items[i].isChecked = false;
            } else {
                console.log('isChecked is false, set to true');
                arr.items[i].isChecked = true;
            }
        }
    }
    state = arr;
};


// Render functions
var renderList = function (state, element) {
    'use strict';
    var itemsHTML = state.items.map(function (item) {
        var isCheckedClass;
        if (item.isChecked) {
            isCheckedClass = ' shopping-item__checked'
        }
        return ('<li>' +
        '<span class="shopping-item">' + item.name + '</span>' +
        '<div class="shopping-item-controls' + item.isChecked + '">' +
          '<button class="shopping-item-toggle">' +
            '<span class="button-label">check</span>' +
          '</button>' +
          '<button class="shopping-item-delete">' +
            '<span class="button-label">delete</span>' +
          '</button>' +
        '</div>' + '</li>');
    });
    element.html(itemsHTML);
};

// Event listeners
$('.js-shopping-list-form').submit(function (event) {
    'use strict';
    event.preventDefault();
    console.log("name: " + $('.shopping-list-entry').val());
    var item = {
            name: $('.shopping-list-entry').val(),
            isChecked: false
        };
    console.log(item);
    addItem(state, item);
    
    renderList(state, $('.shopping-list'));
});

$('ul').on('click', '.shopping-item-toggle', function (event) {
    'use strict';
    checkItem(state, $(this).closest('.shopping-item-controls').siblings('.shopping-item').text());
    $(this).addClass('shopping-item__checked');
});

$('ul').on('click', '.shopping-item-delete', function (event) {
    'use strict';
    removeItem(state, $(this).closest('.shopping-item-controls').siblings('.shopping-item').text());
    $(this).closest('li').remove();
});
