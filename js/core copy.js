(function(){

	var Agenda = {
		
		init: function( config) {
			self = this;
			$(config.diary).on({
				'submit': function(){
					return false;
				},
				'valid': function(e){
					e.preventDefault();
					self.add();
				}
			});


			this.template = config.template;
			this.container = config.container;
			this.extract();	
		},
		add: function(){
			var item = {
				celular: document.getElementById("celular").value,
				nombres: document.getElementById("nombres").value,
				apellidos: document.getElementById("apellidos").value,
				telefono: document.getElementById("telefono").value,
				direccion: document.getElementById("direccion").value,
				empresa: document.getElementById("empresa").value,
				email: document.getElementById("email").value
			};


			localStorage.setItem(item.celular, JSON.stringify(item) );

			// this.extract();

			// var a = localStorage.key();
			// for (var i = 0; i < localStorage.length; i++) {
			// 	var a = localStorage.key(i);
			// 	var b = JSON.parse( localStorage.getItem(a) );
			// 	console.log(b);
			// 	if (a === item.celular) {
			// 		console.log('el item es igual');
			// 	};
			// }

			// this.container[0].innerHTML = "<dt>" + item.nombres + 
			// 								" <strong>" + item.apellidos + "</strong></dt>" +
			// 								"<dd><ul>" +
			// 								"<li><strong>Celular: " + item.celular + "</strong></li>" +
			// 								"<li><strong>Teléfono: " + item.telefono + "</strong></li>" +
			// 								"<li><strong>Dirección: " + item.direccion + "</strong></li>" +
			// 								"<li><strong>Empresa: " + item.empresa + "</strong></li>" +
			// 								"<li><strong>Correo electrónico: " + item.email + "</strong></li>" +
			// 								"</ul>" +
			// 								"<a data-op='edit' data-id='"+item.celular+"' href='#' class='small success button btn_edit' >Edit</a>" +
			// 								"<a data-op='remove' data-id='"+item.celular+"' href='#' class='small alert button btn_delet' >Eliminar</a>" +
			// 								"</dd>" +
			// 								this.container[0].innerHTML;

			$(':input','#form_cont').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');

		},
		extract: function(){
			var listItems = [];
			for (var i = 0; i < localStorage.length; i++) {
				var a = localStorage.key(i);
				listItems.push( JSON.parse(localStorage.getItem(a)) );
			}
			self.contacts = $.map(listItems, function(user) {
				return {
					nombre : user.nombres,
					apellido : user.apellidos,
					celular : user.celular,
					telefono : user.telefono,
					direccion : user.direccion,
					empresa	: user.empresa,
					email : user.email
				};
			});
			
			self.attachTemplate();
			this.edit();
		},
		edit: function(){
			this.container.on('click', '.btn_edit, .btn_delet', function(event) {
				event.preventDefault();
				var op = event.target.getAttribute('data-op'),
					user_sel = JSON.parse( localStorage.getItem( event.target.getAttribute("data-id") ) );

				if (op == 'edit') {
					document.getElementById("celular").value = user_sel.celular;
					document.getElementById("nombres").value = user_sel.nombres;
					document.getElementById("apellidos").value = user_sel.apellidos;
					document.getElementById("telefono").value = user_sel.telefono;
					document.getElementById("direccion").value = user_sel.direccion;
					document.getElementById("empresa").value = user_sel.empresa;
					document.getElementById("email").value = user_sel.email;
				} else if(op == 'remove'){
					localStorage.removeItem(user_sel.celular);
					var sel_user_elemt = document.getElementById('user-'+user_sel.celular);
					$("#"+sel_user_elemt.id).next().remove();
					sel_user_elemt.remove();

				};
			});
		},
		attachTemplate: function(){
			var template = Handlebars.compile( this.template );
			this.container.append( template(this.contacts) );
		}
	};

	Agenda.init({
		diary: $('#form_cont'),
		template: $('#cont-list-template').html(),
		container: $('.list dl')
	});




	function accordion(){
		$('dl').on('click', 'dt', function(event) {
			event.preventDefault();
			$(this)
				.next()
					.slideDown(150)
					.siblings('dd')
						.slideUp(150);
		});
	}

	accordion();


})();