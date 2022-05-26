
var app = angular.module('svgGenApp', ['angularSpinner']);


app.controller('svgCtrl', ($scope, $window, usSpinnerService) => {
    $scope.subtitle1 = 'Number of current shapes: ';
    $scope.subtitle2 = 'Surface area occupied by shapes: ';
    $scope.diameter = Math.floor(Math.random() * (200 - 30 + 1)) + 30;
    $scope.side = Math.floor(Math.random() * (150 - 20 + 1)) + 20;

    $scope.genRnd = () => {
        $scope.diameter = Math.floor(Math.random() * (200 - 30 + 1)) + 30;
        $scope.side = Math.floor(Math.random() * (150 - 20 + 1)) + 20;
        $scope.r1 = Math.floor(Math.random() * (200 - 30 + 1));
    };

    $scope.rect = '<rect width="100%" y="0" height="100%" class="area" ng-click="genRnd()" generate-shape/>';

    $scope.makeSVG = (tag, attrs) => {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (var k in attrs) {
            svg.setAttribute(k, attrs[k]);
        }

        return svg;
    };

    $scope.dismiss = $event => {
        $event.target.remove();
    };

    $scope.getRandomColor = () => {
        function c() {
            return Math.floor(Math.random() * 256).toString(16);
        }
        var colorHEX = "#" + c() + c() + c();
        if (colorHEX.length < 7)
            colorHEX += "c";

        return colorHEX;
    };

    $scope.refreshPage = () => {
        window.location.reload(false);
    };

    $scope.resized = false;
});

app.directive("loadData", $compile => {
    return (scope, el, attrs) => {
        $('#output').append($compile('<svg id="plot">' + scope.rect + '</svg>')(scope));
        scope.resized = false;
        $(window).on('resize', () => {
            scope.windowResized();
        });
    };
});

app.directive('generateShape', $compile => {
    return (scope, el, attrs) => {
        el.bind('click', () => {
            var areaHeight = $('#output').height();
            var areaWidth = $('#output').width();
            console.log(areaHeight + ' | ' + areaWidth);
            var cx = Math.floor(Math.random() * (areaWidth - 4 - scope.diameter / 2 - (4 + scope.diameter / 2) + 1) + (4 + scope.diameter / 2));
            var cy = Math.floor(Math.random() * (areaHeight - 4 - scope.diameter / 2 - (4 + scope.diameter / 2) + 1) + (4 + scope.diameter / 2));
            var circle = scope.makeSVG('circle', {
                cx: cx,
                cy: cy,
                r: scope.diameter / 2,
                fill: scope.getRandomColor(),
                'ng-click': 'dismiss($event)'
            });

            var x = Math.floor(Math.random() * (areaWidth - scope.side - 4 - (4 + scope.side) + 1) + (4 + scope.side));
            var y = Math.floor(Math.random() * (areaHeight - scope.side - 4 - (4 + scope.side) + 1) + (4 + scope.side));
            var square = scope.makeSVG('rect', {
                x: x,
                y: y,
                width: scope.side,
                height: scope.side,
                fill: scope.getRandomColor(),
                'ng-click': 'dismiss($event)'
            });

            var shapeSelector = Math.floor(Math.random() * (1 - 0 + 1) + 0);
            console.log('shapeSelector: ' + shapeSelector);
            if (shapeSelector == 0)
                $('#plot').append($compile(circle)(scope));
            else
                $('#plot').append($compile(square)(scope));
        });
    };
});