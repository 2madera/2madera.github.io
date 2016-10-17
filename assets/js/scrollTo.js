(function () {

    function getCurrentPosition() {
        "use strict";
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) {
            return self.pageYOffset;
        }

        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop) {
            return document.documentElement.scrollTop;
        }

        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) {
            return document.body.scrollTop;
        }
        return 0;
    }

    function getTargetPosition(element) {
        "use strict";
        var offset = element.offsetTop;
        var node = element;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            offset += node.offsetTop;
        }
        return offset;
    }

    function smoothScrollTo(element) {
        "use strict";
        var targetElement = document.getElementById(element.href.toString().split('#')[1]);
        var initialPosition = getCurrentPosition();
        var finalPosition = getTargetPosition(targetElement);
        var distance = finalPosition > initialPosition ? finalPosition - initialPosition : initialPosition - finalPosition;
        //if (distance < 100) {
        //    scrollTo(0, finalPosition);
        //    return;
        //}
        var constSpeed = 15;
        var speed = Math.round(distance / 20);
        var step = Math.round(distance / 20);
        var leapY = finalPosition > initialPosition ? initialPosition + step : initialPosition - step;
        var timer = 0;
        if (speed >= constSpeed) {
            speed = constSpeed
        }
        if (finalPosition > initialPosition) {
            for (var i = initialPosition; i < finalPosition; i += step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY += step;
                if (leapY > finalPosition) leapY = finalPosition;
                timer++;
            }
            return;
        }
        for (var j = initialPosition; j > finalPosition; j -= step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY -= step;
            if (leapY < finalPosition) leapY = finalPosition;
            timer++;
        }
    }

    var navigationLinks = document.getElementById('navigation').children;

    for (var el = 0; el < navigationLinks.length; el++) {
        navigationLinks[el].addEventListener("click", function (evt) {
            evt.preventDefault();
            smoothScrollTo(evt.target);
        }, false);
    }

})();

