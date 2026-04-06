$(window).load(function(){
	$('.loading').fadeOut('fast');
	$('.container').fadeIn('fast');
});
$('document').ready(function(){
		var vw;
		var totalBalloons = 7;

        function alignMessage() {
            var w = $(window).width();
            var vw = w / 2;
            var gap = Math.min(w / 7.5, 90); 
            var topOffset = w < 600 ? 100 : 200;
            
            for(var i=1; i<=totalBalloons; i++) {
                $('#b'+i).stop();
                var targetId = $('#b'+i+i).length ? '#b'+i+i : '#b'+i; 
                var leftPos = vw - (7*gap)/2 + ((i-0.5)*gap);
                
                $(targetId).animate({top: topOffset, left: leftPos}, 500); 
            }
        }

		$(window).resize(function(){
            // Only realign if they have already been forced into the message state (signified by checking opacity or b11)
            if ($('#b11').length) {
                alignMessage();
            }
		});

	$('#turn_on').click(function(){
		$('#bulb_yellow').addClass('bulb-glow-yellow');
		$('#bulb_red').addClass('bulb-glow-red');
		$('#bulb_blue').addClass('bulb-glow-blue');
		$('#bulb_green').addClass('bulb-glow-green');
		$('#bulb_pink').addClass('bulb-glow-pink');
		$('#bulb_orange').addClass('bulb-glow-orange');
		$('body').addClass('peach');
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#play').fadeIn('slow');
		});
	});
	$('#play').click(function(){
		var audio = $('.song')[0];
        audio.play();
        $('#bulb_yellow').addClass('bulb-glow-yellow-after');
		$('#bulb_red').addClass('bulb-glow-red-after');
		$('#bulb_blue').addClass('bulb-glow-blue-after');
		$('#bulb_green').addClass('bulb-glow-green-after');
		$('#bulb_pink').addClass('bulb-glow-pink-after');
		$('#bulb_orange').addClass('bulb-glow-orange-after');
		$('body').css('backgroud-color','#FFF');
		$('body').addClass('peach-after');
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#bannar_coming').fadeIn('slow');
		});
	});

	$('#bannar_coming').click(function(){
		$('.bannar').addClass('bannar-come');

		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#balloons_flying').fadeIn('slow');

		// Show the album photos
		$('.album-photo').fadeIn('slow');

		$('.can-zoom').fadeIn('slow');

		});
	});

    function loopBalloon(id) {
        var randleft = 1000*Math.random();
        var randtop = 500*Math.random();
        $('#'+id).animate({left:randleft,bottom:randtop},10000,function(){
            loopBalloon(id);
        });
    }

	$('#balloons_flying').click(function(){
		$('.balloon-border').animate({top:-500},8000);
        
        for(var i=1; i<=totalBalloons; i++) {
            if (i % 2 === 0) {
                $('#b'+i).addClass('balloons-rotate-behaviour-one');
            } else {
                $('#b'+i).addClass('balloons-rotate-behaviour-two');
            }
            loopBalloon('b'+i);
        }

		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#cake_fadein').fadeIn('slow');
		});
	});	

	$('#cake_fadein').click(function(){
		$('.cake').fadeIn('slow');
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#light_candle').fadeIn('slow');
		});
	});

	$('#light_candle').click(function(){
		$('.fuego').fadeIn('slow');
		$(this).fadeOut('slow').promise().done(function(){
			$('#wish_message').fadeIn('slow');
		});
	});

		
	$('#wish_message').click(function(){
         // Rename IDs to lock them out of resize/float conflicts
         for(var i=1; i<=totalBalloons; i++) {
             $('#b'+i).attr('id','b'+i+i);
         }
         
         alignMessage();

		$('.balloons').css('opacity','0.9');
		$('.balloons h2').fadeIn(3000);
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#story').fadeIn('slow');
		});
	});
	
	$('#story').click(function(){
		$(this).fadeOut('slow');
		$('.cake').fadeOut('fast').promise().done(function(){
			$('.message').fadeIn('slow');
		});

		var $messages = $(".message p");   
		var totalMessages = $messages.length;

		function msgLoop(i) {
			if (i < totalMessages - 1) {
				$messages.eq(i).fadeIn('slow').delay(1500).fadeOut('slow').promise().done(function(){
					msgLoop(i + 1);
				});
			} else {
				$messages.eq(i).fadeIn('slow').promise().done(function(){
					$('.cake').fadeIn('fast');
				});
			}
		}

		msgLoop(0);
	});

});

// Zoom (lightbox) feature
$('.album-photo').click(function() {
    var src = $(this).attr('src');
    $('#lightbox img').attr('src', src);
    $('#lightbox').css('display', 'flex').hide().fadeIn('fast');
});

// Close when clicking outside image
$('#lightbox').click(function(e) {
    if (e.target !== this) return; 
    $('#lightbox').fadeOut('fast');
});