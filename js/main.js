$(function() {
	var SliderModule = (function () {
		var pb = {};
		pb.el = $('#slider');
		pb.items = {
				panel: pb.el.find('li')
		}

		// Declaracion de variables
		var SliderInterval,
			currentSlider = 0,
			nextSlider = 1,
			lengthSlider = pb.items.panel.length;


		//Inicializacion
		pb.init = function(settings){
			this.settings = settings || {duration: 8000}
			var output = '';

			SliderInit();

			for(var i = 0; i < lengthSlider; i++){
				if(i==0){
					output += '<li class="active-control"></li>';
				}else{
					output  +='<li></li>';
				}
			}

			// controlesdel slider
			$('#slider-controls').html(output).on('click', 'li', function(e){
				var $this = $(this);
				if(currentSlider !== $this.index()){
					changePanel($this.index());
				}
				
			});
		}

		var SliderInit = function(){
			SliderInterval = setInterval(pb.startSlider, pb.settings.duration);
		}

		pb.startSlider = function(){
			var panels = pb.items.panel,
				controls = $('#slider-controls li');

			if(nextSlider >= lengthSlider){
				nextSlider = 0;
				currentSlider = lengthSlider - 1;
			}

			//Efectos
			controls.removeClass('active-control').eq(currentSlider).addClass('active-control');
			panels.eq(currentSlider).fadeOut('slow');
			panels.eq(nextSlider).fadeIn('slow');

			// Actualizar nuestros datos
			currentSlider = nextSlider;
			nextSlider +=1;
		}

		//Funcion para los controles del slider
		var changePanel = function(id){
			clearInterval(SliderInterval);
			var panels = pb.items.panel,
				controls = $('#slider-controls li');

			//Comprobamos el ID
			if(id >= lengthSlider){
				id = 0;
			}else if(id < 0){
				id = lengthSlider - 1;
			}

			//Efectos
			controls.removeClass('active-control').eq(id).addClass('active-control');
			panels.eq(currentSlider).fadeOut('slow');
			panels.eq(id).fadeIn('slow');


			//Actualizamos nuestros datos
			currentSlider = id;
			nextSlider = id+1;

			SliderInit();
		}

		return pb;
	}());
	SliderModule.init({duration: 6000});
});