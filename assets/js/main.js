!(function($) {
  "use strict";

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 2;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox({
        'share': false
      });
    });
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

})(jQuery);

		// Validaciones

		const expresiones = {
			name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
			lastname: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
			email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
			phone: /^\d{8,10}$/ // 7 a 14 numeros.
		}

		const campos = {
			name: false,
			lastname: false,
			email: false,
			phone: false
		}

		const validarFormulario = (e) => {
			if (e.target) {
				validarCampo(e.target.value, e.target.name);
			} else {
				validarCampo(e.value, e.name);
			}
		}


		const validarCampo = (value, campo) => {
			if (expresiones[campo].test(value)) {
				document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
				document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
				document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
				document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
				document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
				campos[campo] = true;
			} else {
				document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
				document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
				document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
				document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
				document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
				campos[campo] = false;
			}
		}


		inputs.forEach((input) => {
			input.addEventListener('keyup', validarFormulario);
			input.addEventListener('blur', validarFormulario);
		});


		function checkAllFormToSumit() {
			let validateAll = [];
			inputs.forEach((input) => {
				if (input.type == 'text' || input.type == 'email' || input.type == 'tel')
					validarFormulario(input);
			});

			for (const campo in campos) {
				validateAll.push(campos[campo]);
			}

			if (selectLocal.value == "Selecciona un estado") {
				document.getElementById('grupo__state').classList.add('formulario__grupo-incorrecto');
				document.querySelector('#grupo__state .formulario__input-error').classList.add('formulario__input-error-activo');
				validateAll.push(false);
			} else {
				validateAll.push(true);
			}


			if (!document.getElementById('RecieveInfoPapa').checked && !document.getElementById('RecieveInfoFrijol').checked && !document.getElementById('RecieveInfoArroz').checked && !document.getElementById('RecieveInfoCereal').checked && !document.getElementById('RecieveInfoMaíz').checked) {
				document.querySelector('#grupo__cultivo .formulario__input-error').classList.add('formulario__input-error-activo');
				validateAll.push(false);
			} else {
				document.querySelector('#grupo__cultivo .formulario__input-error').classList.remove('formulario__input-error-activo');
				validateAll.push(true);
			}

			if (!document.getElementById('terminos').checked) {
				document.querySelector('#grupo__terminos .formulario__input-error').classList.add('formulario__input-error-activo');
				validateAll.push(false);
			} else {
				document.querySelector('#grupo__terminos .formulario__input-error').classList.remove('formulario__input-error-activo');
				validateAll.push(true);
			}

			if (validateAll.indexOf(false) == -1) {
				return true;
			} else {
				return false;
			}

		}

		formulario.addEventListener('submit', (e) => {
			e.preventDefault();
			let sendBtn = document.getElementById('SendFormBtn');
			document.getElementById('formulario__merrornet').classList.remove('formulario__mensaje-exito-activo');
			if (checkAllFormToSumit()) {
				sendBtn.setAttribute('disabled', true);

				document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
				document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
				
					(async () => {
						const rawResponse = await fetch('https://2o62j44a44.execute-api.us-east-1.amazonaws.com/dev/lead', {
							method: 'POST',
							body: JSON.stringify({ 
								"campaign": 'berries',
								"usr_name": document.getElementById('name').value,
								"usr_lastname": document.getElementById('lastname').value,
								"usr_mail": document.getElementById('email').value,
								"usr_phone": document.getElementById('phone').value,
								"usr_occupation": document.getElementById('usr_occupation').value,
								"usr_state": document.getElementById('SelectMxState').value,
								"usr_local": document.getElementById('SelectMXLocal').value,
								"usr_hectares": document.getElementById('hectares').value,
								"accept_terms": document.getElementById('terminos').checked,
								"usr_farming": getFarming(),
								"createdAt": (new Date().getTime()),
								"action": 'put_lead'
							})
						});
						const content = await rawResponse.json();
						if(content == "Success Register"){
							document.getElementById('formulario__merrornet').classList.remove('formulario__mensaje-activo');		
							document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
							sessionStorage.setItem("userName", document.getElementById('name').value + " " + document.getElementById('lastname').value);
							location.href = "thanks.html"
						}
						if(content == "Error Data"){
							sendBtn.removeAttribute('disabled');
							let messgErroCont = document.getElementById('formulario__merrornet')
							messgErroCont.innerText = "Los datos enviados no son validos.";
							document.getElementById('formulario__merrornet').classList.add('formulario__mensaje-activo');
							document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
						}
						if(content == "Email Exist"){
							sendBtn.removeAttribute('disabled');
							let messgErroCont = document.getElementById('formulario__merrornet')
							messgErroCont.innerText = "Este correo ya ha sido registrado.";
							document.getElementById('formulario__merrornet').classList.add('formulario__mensaje-activo');		
							document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
						}
					})().catch(error=>{
						sendBtn.removeAttribute('disabled');
						document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
						let messgErroCont = document.getElementById('formulario__merrornet')
						messgErroCont.innerText = "Error al enviar el formulario, favor de iontentarlo más adelante.";
						document.getElementById('formulario__merrornet').classList.add('formulario__mensaje-activo');		
					});
			} else {
				sendBtn.removeAttribute('disabled');
				document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
				document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
			}
		});

		function resetForm(){
			document.getElementById('formulario__merrornet').classList.remove('formulario__mensaje-exito-activo');
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-activo');
		}

		function getFarming(){
			let farming = "";
			if (document.getElementById('RecieveInfoPapa').checked) {
				farming += "Papa ";
			}
			if (document.getElementById('RecieveInfoFrijol').checked) {
				farming += "Frijol ";
			}
			if (document.getElementById('RecieveInfoArroz').checked) {
				farming += "Arroz ";
			}
			if (document.getElementById('RecieveInfoCereal').checked) {
				farming += "Cereal ";
			}
			if (document.getElementById('RecieveInfoMaíz').checked) {
				farming += "Maíz ";
			}
			return farming;
		}

		fillStates();
	}
}

mainSyngenta.initThankfull = function(){
	let thanksPage = document.getElementById('ThankfullCont');
	if (typeof (thanksPage) != 'undefined' && thanksPage != null) {
		let userNamedata = sessionStorage.getItem("userName");
		let userNameContent = document.getElementById('UserName');
		if(userNamedata){
			userNameContent.innerText = sessionStorage.getItem("userName");
			sessionStorage.removeItem("userName");
		}else{
			location.href = "index.html";
		}
	}
}


mainSyngenta.admininit = function(){
	if (typeof (AdminSect) != 'undefined' && AdminSect != null) {
		sessionStorage.removeItem("ad_869_KLH9_s");
		const accessForm = document.getElementById('FormAccess');
		const requestDataForm = document.getElementById('FormDownloadDatabase');

		const accessPassInput = document.getElementById('AdminPassword');
		const wellcomeSection = document.getElementById('WelcomeAdmin');
		const downloadSection = document.getElementById('DownloadDataBase');

		const fromData = document.getElementById('fromData');
		const toData = document.getElementById('toData');

		accessForm.reset();
		requestDataForm.reset();
		accessForm.addEventListener('submit', (e) => {
			e.preventDefault();
			let getPass = accessPassInput.value;
			if(getPass){
				(async () => {
					const rawResponse = await fetch('https://2o62j44a44.execute-api.us-east-1.amazonaws.com/dev/access', {
						method: 'POST',
						body: JSON.stringify({ 
							"ub_psd": getPass
						})
					});
					const acc_response = await rawResponse.json();
					sessionStorage.setItem("ad_869_KLH9_s", 'YTC956-SynG3nt42020._');
					startGetDatatbase();
					
				})().catch(error=>{
					document.getElementById('formulario__noaccess').classList.add('formulario__mensaje-activo');
				});
			}else{
				alert('Favor de ingresar los datos solicitados.')
			}
		});

		requestDataForm.addEventListener('submit', (e) => {
			e.preventDefault();
			document.getElementById('formulario__noresults').classList.remove('formulario__mensaje-activo');
			document.getElementById('formulario__results').classList.remove('formulario__mensaje-activo');
			let getPass = accessPassInput.value;
			
			if(getPass && fromData.value && toData.value){
				(async () => {
					const rawResponse = await fetch('https://2o62j44a44.execute-api.us-east-1.amazonaws.com/dev/lead', {
						method: 'POST',
						body: JSON.stringify({ 
							"ub_psd": sessionStorage.getItem('ad_869_KLH9_s'),
							"campaign": 'berries',
							"from_data": (new Date(fromData.value).getTime()),
							"to_data": (new Date(toData.value).getTime()),
							"action": 'get_leads'
						})
					});
					const data_response = await rawResponse.json();
					if(data_response.Items.length > 0){
						document.getElementById('formulario__results').classList.add('formulario__mensaje-activo');
						createExcel(data_response.Items, (new Date(fromData.value)), (new Date(toData.value)));
						requestDataForm.reset();
					}else{
						document.getElementById('formulario__noresults').classList.add('formulario__mensaje-activo');
						requestDataForm.reset();
					}
				})().catch(error=>{
					document.getElementById('formulario__noaccess').classList.add('formulario__mensaje-activo');
				});
			}else{
				alert('Favor de ingresar los datos solicitados.')
			}
		});

		function startGetDatatbase(){
			wellcomeSection.style.display = 'none';
			downloadSection.style.display = 'block';
		}
	}
}

function createExcel(excel_data, fromDate, toDate){
	let workbook = new ExcelJS.Workbook();
	let sheet = workbook.addWorksheet('Database');
	sheet.properties.defaultColWidth = 40;
	sheet.properties.defaultRowHeight = 15;
	sheet.pageSetup.verticalCentered = true;
	
	let headers = ['id', 'Nombre', 'Apellido(s)', 'Email', 'Ocupación', 'Teléfono', 'Estado', 'Municipio', 'No. de Hectareas', 'Tipo de Cultivo', 'Fecha', 'Acepto Términos', 'Campaña'];
	sheet.addRow(headers);
	
	excel_data.forEach( usrData => {
		let data = [];
		for (const key in usrData) {
			// console.log(key);
			if(key == "id"){
				data[0] = usrData[key];
			}
			if(key == "usr_name"){
				data[1] = usrData[key];
			}
			if(key == "usr_lastname"){
				data[2] = usrData[key];
			}
			if(key == "usr_mail"){
				data[3] = usrData[key];
			}
			if(key == "usr_occupation"){
				data[4] = usrData[key];
			}
			if(key == "usr_phone"){
				data[5] = usrData[key];
			}
			if(key == "usr_state"){
				data[6] = usrData[key];
			}
			if(key == "usr_local"){
				data[7] = usrData[key];
			}
			if(key == "usr_hectares"){
				data[8] = usrData[key];
			}
			if(key == "usr_farming"){
				data[9] = usrData[key];
			}
			if(key == "createdAt"){
				data[10] = (new Date(usrData[key]).toLocaleDateString());
			}
			if(key == "accept_terms"){
				data[11] = usrData[key];
			}
			if(key == "campaign"){
				data[12] = usrData[key];
			}
		}
		sheet.addRow(data);
	});

	workbook.xlsx.writeBuffer().then((data) => {
		let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
		saveAs(blob,"Syngenta_Berries_Database.xlsx");
	});
}