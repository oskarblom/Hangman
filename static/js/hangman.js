function Hangman(canvas) {
    this.r = Raphael(canvas, '100%', '100%');
    this.hangmanParts = [];
    this.state = 0;
}

Hangman.prototype.drawNextPart = function() {
    
    var parts = this.hangmanParts;
    var strokeWidth = "4";
    var attrs = {"stroke-width": "4", "stroke": "white"};

    switch (this.state) {
        case 0:
            parts['hill'] = this.r.path('M 100,100 c 30,0,30,0,60,0').attr(attrs).animate(
                {path:'M 100,100 c 30,-30,30,-30,60,0'}, 1000).scale(2.0, 2.0, 150, 0);
            break;
        case 1:
            parts['vertical'] = this.r.path('M 130,78 l 0,0').attr(attrs).animate(
                {path:'M 130,78 l 0,-60'}, 1000).scale(2.0, 2.0, 150, 0);
            break;
        case 2:
            parts['horizontal'] = this.r.path('M 130,18 l 0,0').attr(attrs).animate(
                {path: 'M 130,18 l 50,0'}, 1000, function() {
                    parts['horizontal'].animate({path: 'M 130,18 l 50,8'}, 500);
                }).scale(2.0, 2.0, 150, 0);
            break;
        case 3:
            parts['diagonal'] = this.r.path('M 130,38 l 0,0').attr(attrs).animate(
                {path: 'M 130,38 l 16,-16'}, 800, function() {
                    parts['diagonal'].animate({path: 'M 130,38 l 20,-20'}, 200);
                    parts['horizontal'].animate({path: 'M 130,18 l 50,0'}, 200);
                }).scale(2.0, 2.0, 150, 0);
            break;
        case 4:
            parts['rope'] = this.r.path('M 180,18 l 0,0').attr(attrs).animate(
                {path: 'M 180,18 l 0,30'}, 1000, function() {
                    parts['rope'].animate({path: 'M 180,18 c 10,5,-10,20,0,25'}, 500)
                }).scale(2.0, 2.0, 150, 0);
            break;
        case 5:
            parts['head'] = this.r.circle(180, 43, 0).attr(attrs).animate({cy: 48, r: 5}, 1000).scale(2.0, 2.0, 150, 0);
            break;
        case 6:
            parts['body'] = this.r.path('M 180,53 l 0,0').attr(attrs).animate(
                {path: 'M 180,53 l 0,15'}, 1000).scale(2.0, 2.0, 150, 0);
            break;
        case 7:
            parts['left_leg'] = this.r.path('M 180,68 l 0,0').attr(attrs).animate(
                {path: 'M 180,68 l -10,10'}, 1000).scale(2.0, 2.0, 150, 0);
            break;
        case 8:
            parts['right_leg'] = this.r.path('M 180,68 l 0,0').attr(attrs).animate(
                {path: 'M 180,68 l 10,10'}, 1000).scale(2.0, 2.0, 150, 0);
            break;
        case 9:
            parts['left_arm'] = this.r.path('M 180,58 l 0,0').attr(attrs).animate(
                {path: 'M 180,58 l -10,0'}, 1000).scale(2.0, 2.0, 150, 0);
            break;
        case 10:
            var easing = 'bounce';
            parts['right_arm'] = this.r.path('M 180,58 l 0,0').attr(attrs).animate(
                {path: 'M 180,58 l 10,0'}, 1000, function() {
                    parts['rope'].animate({path: 'M 180,18 l 0,30'}, 1000, easing);
                    parts['head'].animate({cy: 53}, 1000, easing);
                    parts['body'].animate({path: 'M 180,58 l 0,15'}, 1000, easing);
                    parts['left_leg'].animate({path: 'M 180,73 l -3,10'}, 1000, easing);
                    parts['right_leg'].animate({path: 'M 180,73 l 3,10'}, 1000, easing);
                    parts['left_arm'].animate({path: 'M 180,63 l -3,8'}, 1000, easing);
                    parts['right_arm'].animate({path: 'M 180,63 l 3,8'}, 1000, easing);
                }
            ).scale(2.0, 2.0, 150, 0);
            break;
        default:
            //alert('dead');
    }
    this.state++;
};
