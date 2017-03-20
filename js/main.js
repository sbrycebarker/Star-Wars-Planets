angular.module('myApp')
    .directive('iconAnimate', function () {
    return {
      scope: {
        icon: '='
      },
      link: function( scope , elem, attrs) {
        var icons = $('.icons')

        icons.css({'animation': 'moveup 3s'})
        console.log(icons)

        // elem.css( {'opacity': '0'});
      }

    }
});
