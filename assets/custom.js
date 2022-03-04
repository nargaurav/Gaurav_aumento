/*
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */

$(window).resize(function(){
  if($(".circle-left-cat").height()  > $(".circle-right-cat").height()){
    $(".MegaMenu.MegaMenu--grid").height($(".circle-left-cat").height() + 200);
    $(".MegaMenu.MegaMenu--grid").width($(".circle-left-cat").height() + 200)
    //     console.log("Ma...")
  }
  else if($(".circle-right-cat").height() > $(".circle-left-cat").height()){
    $(".MegaMenu.MegaMenu--grid").height($(".circle-right-cat").height() + 200);
    $(".MegaMenu.MegaMenu--grid").width($(".circle-right-cat").height() + 200)
    // console.log("dar.")
  }else{

    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isSafari = /constructor/i.test(window.HTMLElement) || (function(p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;
    var isEdge = !isIE && !!window.StyleMedia;
    var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    console.log($(".circle-right-cat"), $(".circle-left-cat"));    

    if (isSafari) {
      console.log("safari...");
      $(".isSafari .MegaMenu.MegaMenu--grid").height($(".circle-right-cat").height() + 500);
      $(".isSafari .MegaMenu.MegaMenu--grid").width($(".circle-right-cat").height() + 500)
    }
    if (isChrome) {
      console.log("chrome...");
      $(".isChrome .MegaMenu.MegaMenu--grid").height($(".circle-right-cat").height() + 200);
      $(".isChrome .MegaMenu.MegaMenu--grid").width($(".circle-right-cat").height() + 200)
    }
    if(isFirefox){
      console.log("firefox...");
      $(".isFirefox .MegaMenu.MegaMenu--grid").height($(".circle-right-cat").height() + 200);
      $(".isFirefox .MegaMenu.MegaMenu--grid").width($(".circle-right-cat").height() + 200)
    }
    if(isEdge){
      console.log("edge...");
      $(".isFirefox .MegaMenu.MegaMenu--grid").height($(".circle-right-cat").height() + 200);
      $(".isFirefox .MegaMenu.MegaMenu--grid").width($(".circle-right-cat").height() + 200)
    }    
  }
});
$(document).ready(function() {
  // init AOS
  $(function() {
    AOS.init({
      duration: 1000,
      once: true
    });
  });
  if($(".circle-left-cat").height()  > $(".circle-right-cat").height()){
    $(".MegaMenu.MegaMenu--grid").height($(".circle-left-cat").height() + 200);
    $(".MegaMenu.MegaMenu--grid").width($(".circle-left-cat").height() + 200)
    console.log("Ma...")
  }

  else if($(".circle-right-cat").height() > $(".circle-left-cat").height()){
    $(".MegaMenu.MegaMenu--grid").height($(".circle-right-cat").height() + 200);
    $(".MegaMenu.MegaMenu--grid").width($(".circle-right-cat").height() + 200)

  }

  else{
    // console.log("Equal...")
    $(".MegaMenu.MegaMenu--grid").height($(".circle-right-cat").height() + 200);
    $(".MegaMenu.MegaMenu--grid").width($(".circle-right-cat").height() + 200)
  }

  const loadImagesWithAlt = () => {
    let flkty = Flickity.data($('.Product__Slideshow')[0]);
    if(flkty){
      let selectedColorName = "";
      let selectedColorName_2 = "";

      let selectedOption;
      let countOfOptions = 0;
      $(".ProductForm__Option").each(function(){
        if($(this).find("input[type='radio']").length){
          countOfOptions++;
          let nameOfInput = $(this).find("input[type='radio']").attr("name");
          if($(`input[name='${nameOfInput}']:checked`).val() != undefined){
            if(countOfOptions == 1){
              selectedOption = $(`input[name='${nameOfInput}']:checked`).val()
            }
            else{
              selectedOption += " / "+$("input[name='"+nameOfInput+"']:checked").val();
            }
          }

        } 
      });
      console.log("Loading Image for ->", selectedOption);
      selectedColorName = selectedOption;
      //       console.log("Selected Color name: ",selectedColorName);
      let variantFeaturedImage = $("select[name='id'] option[data-title='"+ selectedColorName +"']").attr("data-image").split("?")[0];
      let variantFeaturedImageId = $("select[name='id'] option[data-title='"+ selectedColorName +"']").attr("data-image");
      //console.log( "Selected Option", $("select[name='id'] option:selected").data("title"))
      let ImageArray = [];
      let ImageIdArray = [];

      // Add Variant Featured Image by Deafult in the ImageArray
      $(".product-images-with-alt .slider-item").each(function(){
        let imgAlt = $(this).data('media-alt');
        let imgSrc= $(this).find("img").data("original-src").split("?")[0];
        if(variantFeaturedImage == imgSrc){
          ImageArray.push($(this).clone());
          ImageIdArray.push($(this).attr("id"));
        }
      });

      // Add  Image by ALT text in the ImageArray
      $(".product-images-with-alt .slider-item").each(function(){
        let imgAlt = ($(this).data('media-alt')).toLowerCase();
        let imgSrc= $(this).find("img").data("original-src").split("?")[0];
        selectedColorName = selectedColorName.toLowerCase();
        if(selectedColorName.includes(imgAlt)){
          ImageArray.push($(this).clone());
          ImageIdArray.push($(this).attr("id"));
        }
      });

      // Add Additional images by Deafult in the ImageArray
      $(".product-images-with-alt .slider-item").each(function(){
        let imgAlt = ($(this).data('media-alt')).toLowerCase();        
        if(imgAlt == "additional"){
          ImageArray.push($(this).clone());
          ImageIdArray.push($(this).attr("id"));
        }
      });

      flkty.destroy();
      // ImageArray = ImageArray.reverse();
      $(".Product__Slideshow").empty();
      $(".Product__SlideshowNavScroller").empty();
      $(".flickity-page-dots").empty();

      for(let [index,image ] of ImageArray.entries()){
        //console.log($(image).attr("data-image-media-position"))

        let isSelected = "";
        index === 0 ? isSelected = "is-selected" : "";
        let dotsHtml = `<a href="#${image.attr("id")}" data-offset="-25" data-focus-on-click="" class="Product__SlideshowNavDot ${isSelected}"></a>`;
        let imgThumb = `<a href="${image.find("img").attr("data-original-src")}" data-index="${index}" data-media-id="${image.attr("data-media-id")}" class="Product__SlideshowNavImage ${isSelected}"> <img src="${image.find("img").attr("data-original-src")}" alt="${image.attr("data-media-alt")}"></a>`;
        let mobileDotsHtml = `<button type="button" class="dot ${isSelected}" data-index="${index}"></button>`
        $(image).attr("data-image-media-position", index)
        $(".Product__Slideshow").append(image);
        $(".Product__SlideshowNavScroller").append(imgThumb);
        $(".flickity-page-dots").append(mobileDotsHtml);
      };

      let flktyMobile = new Flickity('.Product__Slideshow', flkty.options); 

      let slideshowDesktopNavDelegate = new domDelegate.Delegate(document.querySelector('.Product__SlideshowNavScroller'));

      slideshowDesktopNavDelegate.on('click', '.Product__SlideshowNavImage', function (event, element) {
        $(".Product__SlideshowNavImage").removeClass("is-selected");
        $(this).addClass("is-selected");
        flktyMobile.selectCell(parseInt(element.getAttribute('data-index')));
      });

      let slideshowMobileNavDelegate = new domDelegate.Delegate(document.querySelector('.Product__SlideshowMobileNav'));

      slideshowMobileNavDelegate.on('click', '.dot', function (event, element) {
        $(".dot").removeClass("is-selected");
        $(this).addClass("is-selected");
        flktyMobile.selectCell(parseInt(element.getAttribute('data-index')));
      });

      slideshowMobileNavDelegate.on('click', '.Product__SlideshowNavArrow', function (event, element) {
        if (element.getAttribute('data-direction') === 'next') {
          if($(".dot.is-selected").next(".dot").length){
            $(".dot.is-selected").removeClass("is-selected").next(".dot").addClass("is-selected");
          }
          flktyMobile.next();
        } else {
          if($(".dot.is-selected").prev(".dot").length){
            $(".dot.is-selected").removeClass("is-selected").prev(".dot").addClass("is-selected");
          }
          flktyMobile.previous();
        }
      });

      flktyMobile.on( 'select', function() {
        let index = this.selectedIndex;
        $(".dot").removeClass("is-selected");
        $(".dot[data-index='"+ index +"']").addClass("is-selected");
      });
    }
  }

  $("select.SizeSwatch").change(function(){
    console.log("changed.");
    console.log("---------->",$(this).val());
    $(this).parents(".ProductForm__Option").find("input.SizeSwatch__Radio").removeAttr("checked");

    console.log($(this).parents(".ProductForm__Option").find("input[value='"+ $(this).val() +"']"))
    $(this).parents(".ProductForm__Option").find("input[value='"+ $(this).val() +"']").attr("checked", "checked");
    let selectedOption;
    let countOfOptions = 0;
    $(".ProductForm__Option").each(function(){
      if($(this).find("input[type='radio']").length){
        countOfOptions++;
        let nameOfInput = $(this).find("input[type='radio']").attr("name");
        if($(`input[name='${nameOfInput}']:checked`).val() != undefined){
          countOfOptions == 1 ?  selectedOption = $(`input[name='${nameOfInput}']:checked`).val() : selectedOption += " / "+$("input[name='"+nameOfInput+"']:checked").val();
        }
      }  
    });
    let optionValue = $("select[name='id'] option[data-title='"+ selectedOption +"']").val();
    $("select[name=id]").val(optionValue).trigger("change");
    $("select[name='id'] option[data-title='"+ selectedOption +"']").val(optionValue).trigger("change");
    setTimeout(function(){
      loadImagesWithAlt();
    },200)
  });

  $('.template-product .ColorSwatch').click(function() {
    console.log("Color-Swatch Clicked");
    $(this).parents(".HorizontalList").find('.ColorSwatch').each(function(){

      $(this).prev("input").removeAttr("checked");

    });
    $(this).parents(".HorizontalList").find('.ColorSwatch').removeClass("color-selected");
    $(this).addClass("color-selected");
    $(this).prev("input").attr("checked", "checked");
    let inventoryQuant = Number($('.no-js.ProductForm__Option select').find(":selected").attr('available'))
    $('.inventory-text').empty();    
    let selectedOption;
    let countOfOptions = 0;
    $(".ProductForm__Option").each(function(){
      if($(this).find("input[type='radio']").length){
        countOfOptions++;
        let nameOfInput = $(this).find("input[type='radio']").attr("name");
        if($(`input[name='${nameOfInput}']:checked`).val() != undefined){
          countOfOptions == 1 ?  selectedOption = $(`input[name='${nameOfInput}']:checked`).val() : selectedOption += " / "+$("input[name='"+nameOfInput+"']:checked").val();
        }
      }      
    });    
    let optionValue = $("select[name='id'] option[data-title='"+ selectedOption +"']").val();
    $("select[name=id]").val(optionValue).trigger("change");
    $("select[name='id'] option[data-title='"+ selectedOption +"']").val(optionValue).trigger("change");
    setTimeout(function(){
      loadImagesWithAlt();
    },200)
  });


  $("#custom-name").on('input', function() {
    let customString = $(this).val().replace(/[^\w\s\][^,]/gi, '');
    let customStringLength = customString.length;
    customStringLength === 0 ? $(`.size_custom_latter .SizeSwatch__Radio`).removeAttr('disabled',true) : false;
    if (customString.length == 1){
      $(".ProductForm__AddToCart").addClass("btn-disabled");
    }else{
      $(".ProductForm__AddToCart").removeClass("btn-disabled");
    }


    $(".template-product .ProductForm__Option .size_change .SizeSwatch__Radio").on("click", function(){
      if (customString.length == 1){
        console.log("changed size", customStringLength);

        $(".ProductForm__AddToCart").addClass("btn-disabled");
        // $(".ProductForm__AddToCart").removeAttr('data-action',true);

      }else{

        $(".ProductForm__AddToCart").removeClass("btn-disabled");
        //  $(".ProductForm__AddToCart").removeAttr('data-action',false);
        console.log("more_length");

      }
    });

    $('.template-product .ProductForm__Option .ColorSwatchList .ColorSwatch').click(function() {
      if (customString.length == 1){
        $(".ProductForm__AddToCart").addClass("btn-disabled");
        // $(".ProductForm__AddToCart").removeAttr('data-action',true);
        console.log("colorclicked",customStringLength );
      }else{
        $(".ProductForm__AddToCart").removeClass("btn-disabled");
        //  $(".ProductForm__AddToCart").removeAttr('data-action',false);
        console.log("more_length");
      }
    });

    if(customString.length > 1 && customString.length < 10){
      if($(".custom-letters-swatch-list .SizeSwatch__Radio:radio[value='" + customStringLength + "']").length){
        $(".custom-letters-swatch-list .SizeSwatch__Radio:radio[value='" + customStringLength + "']").next("label").click();
        $("#product-custom-letters-select").parent(".SumoSelect").find(".optWrapper .options .opt").removeClass("selected")
        $("#product-custom-letters-select").parent(".SumoSelect").find(".optWrapper .options li").each(function(){
          let currentLabelText = $.trim($(this).find("label").text());
          if(currentLabelText == customStringLength){
            $(this).click();
          }
        });
      }else{
        $(`.size_custom_latter .SizeSwatch__Radio:not([value="${customStringLength}"])`).attr('disabled',true);
        var selectedSwatch = $(".ProductForm__Variants .SizeSwatch__Radio:radio[value='" + customStringLength + "']")[0];
        selectedSwatch.hasAttribute('disabled') ? selectedSwatch.removeAttribute('disabled') : false;
        $(".ProductForm__Variants .ProductForm__Option  .size_custom_latter .SizeSwatch__Radio:radio[value='" + customStringLength + "']").next("label").click(); 
      }
    }
    else{
      $(".custom-letters-swatch-list .SizeSwatch__Radio:radio[value='2']").next("label").click();
      $("#product-custom-letters-select").parent(".SumoSelect").find(".optWrapper .options li:first").click();
    }
  });

  $(".HorizontalList__Item [data-drawer-id='sidebar-cart']").on("click", function(){
    let toggler = $(this)
    setTimeout(function(){
      if(toggler.attr("data-action") == "open-drawer"){
        toggler.attr("data-action", "close-drawer")
      }else{
        toggler.attr("data-action", "open-drawer")
      }
    },500)
  });

  $(".ProductForm__AddToCart").hover(function(){
    $('#variant-inventory').toggleClass("showText");
  });

  if ($(window).width() < 480 || $(window).height() < 480) {
    $(".ProductForm__AddToCart").click(function(){
      $('#variant-inventory').toggleClass("showText");
    });
  }
  $(".mob-head").click(function() {
    //alert("test");
    //  $(".Drawer__Close").toggleClass("close_drawer");
    if('.Drawer__Close'){
      $(".mob-head").hide();
      $(".Drawer__Header").addClass("new_close_drawer");
    }
  });
  // $("#shopify-section-collection-template .Grid__Cell .ProductItem__ColorSwatchList ").find('.ColorSwatch:first').addClass("color-selected");

  $('#shopify-section-collection-template .ColorSwatch').click(function() {
    console.log("Here We are..")

    $(this).parents(".ProductItem__ColorSwatchList").find(".ColorSwatch").removeClass("color-selected");

    $(this).addClass("color-selected")
    let inventoryQuant = Number($('.no-js.ProductForm__Option select').find(":selected").attr('available'))
    $('.inventory-text').empty();
    $("select[name='id']").trigger("change");
    let selectedColorName = `${$(this).prev("input").attr("value")} / ${$("#product-size-select").val()}`;
    let optionValue = $("select[name='id'] option[data-title='"+ selectedColorName +"']").val();
    $("select[name='id'] option[data-title='"+ selectedColorName +"']").val(optionValue).trigger("change");
    loadImagesWithAlt();
  });

  $(".Drawer__Close").click(function() {
    //alert("test");
    $(".mob-head").show();
    $(".Drawer__Header").removeClass("new_close_drawer");
  });

  // $('.reset-button').click(function () {
  //    if($('.Text--subdued .symbol').text() == '+'){
  //       $('.Text--subdued .symbol').text('-');   
  //     } else {
  //       $('.Text--subdued .symbol').text('+');
  //     }
  //  // $('.CollectionToolbar__Item--filter').text('Filter +');
  // });
  // CUSTOM ID BRACELET product swatch select

  $(".color-swatch").click(function () {
    if ($(this).hasClass("color-selected")) {
      $(".color-swatch").removeClass("color-selected");
    }
    else {
      $(".color-swatch").removeClass("color-selected");
      $(this).addClass("color-selected");
    }
  });

  /*- Homepage -*/

  /*- Featured items slider -*/
  $('.featured-items__container').slick({
    slidesToShow: 4,
    arrows: true,
    dots: false,
    prevArrow: '<button type="button" class="slick-prev"><img src="https://cdn.shopify.com/s/files/1/0250/1406/files/Arrow-left.png" /></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="https://cdn.shopify.com/s/files/1/0250/1406/files/Arrow-right.png" /></button>',
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 2
      }
    }]
  });
  /*- Product -*/

  $("[data-link-for]").click(function(){
    let linkFor = $(this).attr("data-link-for");
    // alert(linkFor);
    localStorage.setItem("linkFor", linkFor);
  });

  function setActive(){
    let linkTo = localStorage.getItem("linkFor");
    $(".nav-item[data-name='"+linkTo+"']").addClass("active");
    $(".faq__content[data-id]").css("display", "none");
    $("[data-id='"+ linkTo+"']").css("display", "block");
  }

  $(".customer-care__nav .nav-item").on("click", function(){
    let name = $(this).data("name");
    //alert(name);
    $(".faq__content[data-id='"+ name+"']").css("display", "block");
  })

  if($(".customer-care__nav").length){
    setActive();
  }

  if ($(window).width() < 767) {
    $('.ProductMeta__Description .drop-control').removeClass('active');  
    $('.ProductMeta__Description .drop-control').siblings('.Rte').slideUp(200);
    $('.ProductMeta__Description .drop-control').children('.control').text('+');
  }

  /*================ Expand ================*/
  $('.ProductMeta__Description .drop-control').click(function() {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).siblings('.Rte').slideUp(200);
      $(this).children('.control').text('+');
    } else {
      $(this).addClass('active');
      $(this).siblings('.Rte').slideDown(200);
      $(this).children('.control').text('-');
    }
    $('.ProductMeta__Details .drop-control').removeClass('active');
    $('.ProductMeta__Details .drop-control').siblings('.Rte').slideUp(200);
    $('.ProductMeta__Details .drop-control').children('.control').text('+');
  });
  $('.ProductMeta__Details .drop-control').click(function() {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).siblings('.Rte').slideUp(200);
      $(this).children('.control').text('+');
    } else {
      $(this).addClass('active');
      $(this).siblings('.Rte').slideDown(200);
      $(this).children('.control').text('-');
    }
    $('.ProductMeta__Description .drop-control').removeClass('active');
    $('.ProductMeta__Description .drop-control').siblings('.Rte').slideUp(200);
    $('.ProductMeta__Description .drop-control').children('.control').text('+');
  });

  /*- Dropdown Change -*/
  $(".product-size-select,.product-custom-letters-select,.single-option-selector,#product-size-select").SumoSelect();
  //   $(".product-custom-letters-select").SumoSelect();
  //   $(".single-option-selector").SumoSelect();

  $(document).on("click", ".optWrapper .options li label", function() {
    /*- Sumo Select Handler -*/
    let value = $.trim($(this).text());
    $(".SizeSwatch__Radio:radio[value='" + value + "']").next("label").click();

    //if($(".size-swatch-list .SizeSwatch__Radio:radio[value='" + value + "']").length){
    //  $(".size-swatch-list .SizeSwatch__Radio:radio[value='" + value + "']").next("label").click();
    //}

    //if($(".custom-letters-swatch-list .SizeSwatch__Radio:radio[value='" + value + "']").length){
    //  $(".custom-letters-swatch-list .SizeSwatch__Radio:radio[value='" + value + "']").next("label").click();
    //}
  });

  /*- Customer Care FAQs -*/
  $('.nav-item').click(function() {
    let current_id = $(this).data('name')
    $('.nav-item').removeClass('active');
    $(this).addClass('active');
    $('.faq-q').next().slideUp();
    $('.faq-q').children('.faq-plus').show();
    $('.faq-q').children('.faq-minus').hide();
    $('.faq__content').hide();
    $("[data-id='"+current_id+"']").show();
  });

  $('.faq-q').click(function() {
    $(this).next().slideToggle();
    $(this).children('.faq-plus').toggle();
    $(this).children('.faq-minus').toggle();
  });

  /*- About -*/
  $('.full-width__slider').slick({
    dots: false,
    arrows: false,
    infinite: false,
    autoplay: false,
    centerMode: false,
    variableWidth: true
  });

  $('.variable-height-slider').slick({
    centerMode: true,
    slidesToShow: 4,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: window.autoplayTime,
    speed: 300,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          centerMode: true,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]	
  });

  $('.full-width-slider-showroom').slick({
    centerMode: true,
    slidesToShow: 4,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: window.autoplayTime,
    speed: 300,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]	
  });
  $('.full-width-slider-custom-lou').slick({
    centerMode: true,
    slidesToShow: 4,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: window.autoplayTime,
    speed: 300,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]	
  });

  $("#engraving_checkbox").on("change", function(){
    if($(this).is(":checked")){
      $("#EngravingContainer").show();
      $("[data-action='add-to-cart']").addClass("EngraveSelect");
    }else{
      $("#EngravingContainer").hide();
      $("[data-action='add-to-cart']").addClass("EngraveSelect");
    }
  });

  $(document).on("submit", ".EngraveSelect", function(e){
    e.preventDefault();
  });

  /* $("#type_engagement").on("click", function() {
    $(".stone_sec").addClass("show_stone");
  });
  $("#type_reset").on("click", function() {
    $(".stone_sec").removeClass("show_stone");	
  });*/
  $('#type_engagement').click(function(){
    $('.stone_sec').slideDown('slow');
  });
  $('#type_reset').click(function(){
    $('.stone_sec').slideUp(400);
  });
  $(document).on("click", ".swatch_hide_show", function(){
    $(this).parent(".ProductItem__Info").find(".hideOtherSwatches,.swatch_hide_show").toggleClass('swatch_show')
  });

  $('.SizeSwatch__Radio').click(function() {
    if ($(this).val() == 'Custom Digits') {
      $('#custom-digits').show()
    } else {
      $('#custom-digits').hide()
    }
  });

  /*-  custom id bracelet -*/
  let $color_dict = {
    'rouge tomate': '#DE2920',
    'moutard': '#F3AA04',
    'vert': '#045543',
    'bleu fonce': '#033A69',
    'aubergine': '#622853',
    'noir': '#000000',
    'rose clair': '#F4CBD5',
    'jaune clair': '#F4F0A3',
    'vert clair': '#BCE4DB',
    'bleu clair': '#C6D6ED',
    'violet': '#B3B5DC',
    'blanc': '#FFFFFF',
    'neon pink': '#FE23A5',
    'neon orange': '#FF9503',
    'neon yellow': '#FFEF55',
    'neon green': '#08FF04',
    'neon blue': '#00D7FE'
  }

  $(".custom-id-input").on('input', function() {

    let id = $(this).data('id');
    let input_num = $(`.custom-id-input[data-id='${id}']`).val().length;
    let input_text = $(`.custom-id-input[data-id='${id}']`).val();    
    // console.log("input added" ,input_text);
    if(input_num > 0){
      $(`.custom-id-overlay .ind-letter-${id}`).show();
      $(`.ind-letter-${id} .heart-preview`).hide();
      $(`.ind-letter-${id} .star-preview`).hide();
      $(`.ind-letter-${id} .flower-preview`).hide();
      $(`.ind-letter-${id} .text-preview`).text(`${input_text}`).show()
      $(`.custom-color-dropdown[data-id='${id}'] input`).prop("disabled", false);
    } 
    else {
      $(`.ind-letter-${id} .heart-preview`).hide();
      $(`.ind-letter-${id} .star-preview`).hide();
      $(`.ind-letter-${id} .flower-preview`).hide();
      $(`.ind-letter-${id} .text-preview`).text('').hide();
      $(`.custom-id-overlay .ind-letter-${id}`).hide();
      $(`.custom-color-dropdown[data-id='${id}'] input`).prop("disabled", true);
    }

    //     if (input_num > 0) {
    //       if (input_text != '♥' && input_text != '✿' && input_text != '★') {
    //         $(`.custom-id-overlay .ind-letter-${id}`).show();
    //         $(`.ind-letter-${id} .text-preview`).text(`${input_text}`).show()
    //       }
    //       $(`.custom-color-dropdown[data-id='${id}'] input`).prop("disabled", false);
    //     } 
    //     else {
    //       $(`.ind-letter-${id} .heart-preview`).hide();
    //       $(`.ind-letter-${id} .star-preview`).hide();
    //       $(`.ind-letter-${id} .flower-preview`).hide();
    //       $(`.ind-letter-${id} .text-preview`).text('').hide();
    //       $(`.custom-id-overlay .ind-letter-${id}`).hide();
    //       $(`.custom-color-dropdown[data-id='${id}'] input`).prop("disabled", true);
    //     }
  });

  $(".custom-id-input").focus(function() {
    $(`.custom-id-input`).removeClass('activeInput')
    let id = $(this).data('id');
    $('.custom-color-dropdown').hide()
    $(`.custom-color-dropdown[data-id='${id}']`).show()
    $(this).addClass('activeInput')
    $(this).addClass('whitecolorinput')
  });

  $("#custom-id-preview input").keypress(function (e) {
    var keyCode = e.keyCode || e.which;
    $("#lblError").html("");
    //Regex for Valid Characters i.e. Alphabets and Numbers.
    var regex = /^[A-Za-z0-9♥]+$/;
    //Validate TextBox value against the Regex.
    var isValid = regex.test(String.fromCharCode(keyCode));
    if (!isValid) {
      $("#lblError").html("Only Alphabets,Numbers And Specific Symbol allowed.");
    }
    return isValid;
  });

  $('.icon-button').click(function() {
    let id = $('.activeInput').data('id');
    $(`.custom-id-input[data-id='${id}']`).val("");
    $(`.ind-letter-${id} .heart-preview`).hide();
    $(`.ind-letter-${id} .star-preview`).hide();
    $(`.ind-letter-${id} .flower-preview`).hide();
    $(`.ind-letter-${id} .text-preview`).text('').hide();
    $(`.custom-id-overlay .ind-letter-${id}`).show();
  });

  $('.star-icon').click(function() {
    let id = $('.activeInput').data('id');
    if ($(`.custom-id-input[data-id='${id}']`).val().length < 1) {
      $(`.custom-id-input[data-id='${id}']`).val($(`.custom-id-input[data-id='${id}']`).val() + "★");
    } else {
      $(`.custom-id-input[data-id='${id}']`).val("★");
    }
    $(`.ind-letter-${id} .star-preview`).show();
    $(`.custom-color-dropdown[data-id='${id}'] input`).prop("disabled", false);
  });

  $('.heart-icon').click(function() {
    let id = $('.activeInput').data('id');
    if ($(`.custom-id-input[data-id='${id}']`).val().length < 1) {
      $(`.custom-id-input[data-id='${id}']`).val($(`.custom-id-input[data-id='${id}']`).val() + "❤");
    } else {
      $(`.custom-id-input[data-id='${id}']`).val("❤");
    }
    $(`.ind-letter-${id} .heart-preview`).show();
    $(`.custom-color-dropdown[data-id='${id}'] input`).prop("disabled", false);
  });

  $('.flower-icon').click(function() {
    let id = $('.activeInput').data('id');
    if ($(`.custom-id-input[data-id='${id}']`).val().length < 1) {
      $(`.custom-id-input[data-id='${id}']`).val($(`.custom-id-input[data-id='${id}']`).val() + "✿");
    } else {
      $(`.custom-id-input[data-id='${id}']`).val("✿");
    }
    $(`.ind-letter-${id} .flower-preview`).show();
    $(`.custom-color-dropdown[data-id='${id}'] input`).prop("disabled", false);
  });

  $(".color-swatch").click(function() {
    let color_text = $(this).next().text();
    let id = $(this).parent().parent().parent().parent().find('.color-header .current-color').data('id');
    $(this).parent().parent().parent().parent().find('.color-header .current-color').text(color_text);
    $(this).parent().parent().parent().parent().find('.color-header input').val(color_text)

    $(`.custom-id-input[data-id='${id}']`).css('color', $color_dict[color_text])
    $(`.ind-letter-${id} .text-preview`).css('color', $color_dict[color_text]);
    $(`#custom-id-preview .custom-id-input[data-id='${id}']`).css('text-shadow', '0 0 1px black')
    $(`#custom-id-preview .ind-letter-${id} .text-preview`).css('text-shadow', '0 0 1px black');

    $(`.ind-letter-${id} .flower-preview`).css('fill', $color_dict[color_text])
    $(`.ind-letter-${id} .heart-preview`).css('fill', $color_dict[color_text])
    $(`.ind-letter-${id} .star-preview`).css('fill', $color_dict[color_text])
  });
  $(".CollectionToolbar__Item--filter").click(function () {
    // toggle open/close symbol
    if($('.Text--subdued .symbol').text() == '+'){
      $('.Text--subdued .symbol').text('-');   
    } else {
      $('.Text--subdued .symbol').text('+');
    }
  });
  $('.CollectionToolbar__Item--filter').click(function() {
    var pos_filter = $(this).offset();
    if ($('.custom-filter').hasClass('shown')) {
      $('.custom-filter').slideUp()
      $('.custom-filter').removeClass('shown')
      //  $('.filter-plus').text('+')
      //$('.equis').hide();
    } 
    else {
      $('.custom-filter').slideDown()
      $('.custom-filter').addClass('shown')
      //  $('.filter-plus').text('-');
      $(window).scroll(function() {
        var windowHeight = $(window).scrollTop();
        if (windowHeight <= 300) {
          $('.custom-filter').css('position', 'absolute')
          $('.custom-filter').css('top', '0px')
        } else {
          $('.custom-filter').css('position', 'fixed')
          if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $('.custom-filter').css('top', '97px')
          } else {
            $('.custom-filter').css('top', '112px')
          }
          if (windowHeight > 10734) {
            $('.custom-filter').css('display', 'none')
          }
        }
      });
    }
  });
  $('.Popover__Close').click(function() {
    $('.sort-plus').text('+');
  });
  $('.HorizontalList__Item-shop').mouseover(function() {
    $('.MegaMenu').show();
  });

  $('.HorizontalList__Item-shop').mouseout(function() {
    $('.MegaMenu').hide();
  });

  $("[data-action='apply-tags'], .reset-button").on("click", function() {
    $(this).parents(".CollectionMain2").find(".collection-toolbar-custom.CollectionToolbar .CollectionToolbar__Item--filter").click();
  });

  $('.reset-button').click(function() {
    $('.collection-filter-button .Text--subdued').hide()
  });

  $('.custom-filter .Collapsible[data-type=price] .Linklist__Item').sort(function(a, b) {
    if (($(a).text().length > $(b).text().length)) {
      return 1;
    } 
    else if (($(a).text().length == $(b).text().length)) {
      return 0;
    } 
    else {
      return -1;
    }
  })
  .each(function() {
    var elem = $(this);
    elem.remove();
    $(elem).appendTo(".custom-filter .Collapsible[data-type=price] .Linklist");
  });

  var $me = $(".custom-filter .Collapsible[data-type=price] .Linklist .Linklist__Item").first();
  $me.parent().append($me);

  var maxHeight = 0;

  $(".ProductItem__Title").each(function() {
    $(this).height() > maxHeight ? maxHeight = $(this).height(): false;
  });

  $(".ProductItem__Title").height(maxHeight);

  $('.ShareLinks').click(function() {
    $(this).toggleClass('active');
    $('.ProductMeta__ShareList').toggle()
  });

  loadImagesWithAlt();
  
  document.querySelectorAll(".Link--primary").forEach(function(element){
    element.addEventListener('click',function(){
      var mainElement = this.closest('.Linklist'),
          selectedList = mainElement.querySelector('.Linklist__Item.is-selected'),
          selectedButton = mainElement.querySelector('.Link--primary.is-selected');
      if(selectedList != null && selectedButton != null){
        selectedList.classList.remove("is-selected");
        selectedButton.classList.remove("is-selected");
      }
      this.classList.add("is-selected");
      this.parentElement.classList.add("is-selected");
    });
  });
  
  $(document).on("click", ".hasEngraved", function(){
    let timeStamp = $(this).attr("data-timestamp");
    $.when((function(){
      $(`.hasEngraved[data-timestamp='${timeStamp}']`).each(function(){
        let id = $(this).attr("data-item-key");
        let qty = 0;
        $.ajax({
          type: 'POST',
          url: '/cart/change.js',
          async: false,
          dataType: 'json',
          data: {
            id: id,
            quantity: 0
          },
          success: function() {
            console.log("item line is removed");
          },
          error: function(error) {
            console.log(error.responseJSON.message);
          }
        });
      })
    })()).then(function(){
      console.log("Done");
      window.location.reload();
    })
    //     $(`.hasEngraved[data-timestamp='${timeStamp}']`).each(function(){
    //       let id = $(this).attr("data-item-key");
    //       let qty = 0;
    //       $.ajax({
    //         type: 'POST',
    //         url: '/cart/change.js',
    //         async: false,
    //         dataType: 'json',
    //         data: {
    //           id: id,
    //           quantity: 0
    //         },
    //         success: function() {
    //           console.log("item line is removed");
    //         },
    //         error: function(error) {
    //           console.log(error.responseJSON.message);
    //         }
    //       });
    //     }).then(function(){
    //       console.log("Done");
    //     })
    
  
    //     	value: function _updateItemQuantity(event, target) {
    //             var _this35 = this;
    //             console.log("000",target);
    //             let targetHasTimeStamp = target.hasAttribute("data-timestamp") || target.classList.contains("hasEngraved");
    //             //             console.log(targetHasTimeStamp);

    //             let productArray = new Set();
    //             if(targetHasTimeStamp){
    //               let timeStamp = target.getAttribute("data-timestamp");
    //               document.querySelectorAll(`.hasEngraved[data-timestamp='${timeStamp}']`).forEach(async function(element){
    //                 productObject["id"] = element.getAttribute("data-item-key");
    //                 productArray.push(element.getAttribute("data-item-key"));
    //                 productObject["quantity"] = 0;

    //                 //                 await $.ajax({
    //                 //                   type: 'POST',
    //                 //                   url: '/cart/change.js',
    //                 //                   async: false,
    //                 //                   dataType: 'json',
    //                 //                   data: productObject,
    //                 //                   success: function() {
    //                 //                     console.log("item line is removed");
    //                 //                   },
    //                 //                   error: function(error) {
    //                 //                     console.log(error.responseJSON.message);
    //                 //                   }
    //                 //                 });
    //               })
    //               //               .then(function(){
    //               //               	window.location.reload();
    //               //               });

    //               for(let id of productArray){
    //                 let productObject = {};
    //                 productObject["id"] = id;
    //                 productObject["quantity"] = 0;
    //                 $.ajax({
    //                   type: 'POST',
    //                   url: '/cart/change.js',
    //                   async: false,
    //                   dataType: 'json',
    //                   data: productObject,
    //                   success: function() {
    //                     console.log("item line is removed");
    //                   },
    //                   error: function(error) {
    //                     console.log(error.responseJSON.message);
    //                   }
    //                 });
    //               }

    //             }else{



    //               document.dispatchEvent(new CustomEvent('theme:loading:start'));

    //               var quantity = null,elementToAnimate = null;

    //               if (target.tagName === 'INPUT') {
    //                 quantity = parseInt(Math.max(parseInt(target.value) || 1, 1));
    //               } 
    //               else {
    //                 quantity = parseInt(target.getAttribute('data-quantity'));
    //               }

    //               // If the quantity is 0, then we will animate the product with a removal effect
    //               if (quantity === 0) {
    //                 elementToAnimate = target.closest('.CartItemWrapper');
    //               }

    //               fetch(window.routes.cartChangeUrl + '.js', {
    //                 body: JSON.stringify({ line: target.getAttribute('data-line'), quantity: quantity }),
    //                 credentials: 'same-origin',
    //                 method: 'POST',
    //                 headers: {
    //                   'Content-Type': 'application/json',
    //                   'X-Requested-With': 'XMLHttpRequest' // This is needed as currently there is a bug in Shopify that assumes this header
    //                 }
    //               })
    //               .then(function (cart) {
    //                 //               let orginalQty = 
    //                 //               let lineId = $(target).attr("data-line");


    //                 //               if(target.classList.contains("plus")){
    //                 //                 let qty = parseInt(target.getAttribute("data-quantity"));
    //                 //                 let href = $(target).attr("href").replace(`quantity=${qty}`, `quantity=${qty+1}`)

    //                 //                 $(target).prev("input").val(qty);
    //                 //                 $(target).attr("title", "Set quantity to "+(qty+1));
    //                 //                 $(target).attr("data-quantity", qty+1);
    //                 //                 $(target).attr("href", href);
    //                 //               }else{
    //                 //                 let qty = parseInt(target.getAttribute("data-quantity"));
    //                 //                 let href = $(target).attr("href").replace(`quantity=${qty}`, `quantity=${qty-1}`)

    //                 //                 $(target).prev("input").val(qty);
    //                 //                 $(target).attr("title", "Set quantity to "+(qty-1));
    //                 //                 $(target).attr("data-quantity", qty-1);
    //                 //                 $(target).attr("href", href);
    //                 //               }

    //                 window.location.reload();
    //                 cart.json().then(function (content) {
    //                   _this35.itemCount = content['item_count'];
    //                   _this35._rerenderCart(elementToAnimate);

    //                   document.dispatchEvent(new CustomEvent('theme:loading:end'));
    //                 });
    //               });
    //             }
    //             event.preventDefault();
    //           }
    
    
  })  
});
/*  $('.full-width-slider-about').slick({
    centerMode: true,
    slidesToShow: 4,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: window.autoplayTime,
    speed: 300,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }

    ]	
  });*/