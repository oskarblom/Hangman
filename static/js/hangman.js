function Hangman(canvas/*, wordLength*/) {

            // Initialize
            var r = Raphael(canvas, '100%', '100%');
            var hangmanParts = [];
            var state = 0;
//            var word = new Array(wordLength);

//            for (var i=0; i<wordLength; i++) {
//                r.path(['M', 100 + 24*i, 165] + 'l 20 0');
//                word[i] = '_';
//            }

//            this.drawLetter = function(letter, position) {
//                word[position] = letter;
//                console.log(word);
//                var mockLetter = r.print(100 + 24*position, 150, '|', r.getFont("Comic"), 20);
//                var realLetter = r.print(100 + 24*position, 150, letter, r.getFont("Comic"), 20);
//                realLetter.hide();
//                mockLetter[0].animate({path: realLetter[0].attrs.path}, 1000);
//            }

            this.drawNextPart = function() {
                switch (state) {
                    case 0:
                        hangmanParts['hill'] = r.path('M 100,100 c 30,0,30,0,60,0').animate(
                            {path:'M 100,100 c 30,-30,30,-30,60,0'}, 1000);
                        break;
                    case 1:
                        hangmanParts['vertical'] = r.path('M 130,78 l 0,0').animate(
                            {path:'M 130,78 l 0,-60'}, 1000);
                        break;
                    case 2:
                        hangmanParts['horizontal'] = r.path('M 130,18 l 0,0').animate(
                            {path: 'M 130,18 l 50,0'}, 1000, function() {
                                hangmanParts['horizontal'].animate({path: 'M 130,18 l 50,8'}, 500);
                            });
                        break;
                    case 3:
                        hangmanParts['diagonal'] = r.path('M 130,38 l 0,0').animate(
                            {path: 'M 130,38 l 16,-16'}, 800, function() {
                                hangmanParts['diagonal'].animate({path: 'M 130,38 l 20,-20'}, 200);
                                hangmanParts['horizontal'].animate({path: 'M 130,18 l 50,0'}, 200);
                            });
                        break;
                    case 4:
                        hangmanParts['rope'] = r.path('M 180,18 l 0,0').animate(
                            {path: 'M 180,18 l 0,30'}, 1000, function() {
                                hangmanParts['rope'].animate({path: 'M 180,18 c 10,5,-10,20,0,25'}, 500);
                            });
                        break;
                    case 5:
                        hangmanParts['head'] = r.circle(180, 43, 0).animate({cy: 48, r: 5}, 1000);
                        break;
                    case 6:
                        hangmanParts['body'] = r.path('M 180,53 l 0,0').animate(
                            {path: 'M 180,53 l 0,15'}, 1000);
                        break;
                    case 7:
                        hangmanParts['left_leg'] = r.path('M 180,68 l 0,0').animate(
                            {path: 'M 180,68 l -10,10'}, 1000);
                        break;
                    case 8:
                        hangmanParts['right_leg'] = r.path('M 180,68 l 0,0').animate(
                            {path: 'M 180,68 l 10,10'}, 1000);
                        break;
                    case 9:
                        hangmanParts['left_arm'] = r.path('M 180,58 l 0,0').animate(
                            {path: 'M 180,58 l -10,0'}, 1000);
                        break;
                    case 10:
                        var easing = 'bounce';
                        hangmanParts['right_arm'] = r.path('M 180,58 l 0,0').animate(
                            {path: 'M 180,58 l 10,0'}, 1000, function() {
                                hangmanParts['rope'].animate({path: 'M 180,18 l 0,30'}, 1000, easing);
                                hangmanParts['head'].animate({cy: 53}, 1000, easing);
                                hangmanParts['body'].animate({path: 'M 180,58 l 0,15'}, 1000, easing);
                                hangmanParts['left_leg'].animate({path: 'M 180,73 l -3,10'}, 1000, easing);
                                hangmanParts['right_leg'].animate({path: 'M 180,73 l 3,10'}, 1000, easing);
                                hangmanParts['left_arm'].animate({path: 'M 180,63 l -3,8'}, 1000, easing);
                                hangmanParts['right_arm'].animate({path: 'M 180,63 l 3,8'}, 1000, easing);
                            }
                        );
                        break;
                    default:
                        alert('dead');
                }
                state++;
            };
        }
