/**
    * selectImages
    * menuleft
    * tabs
    * collapse_menu
    * showpass
    * select_colors_theme
    * icon_function
    * box_search
    * variant_picker
    * uploadfile
    * writeReview
    * multiselect
*/

; (function ($) {

  "use strict";

  var selectImages = function () {
    if ($(".image-select").length > 0) {
      const selectIMG = $(".image-select");
      selectIMG.find("option").each((idx, elem) => {
        const selectOption = $(elem);
        const imgURL = selectOption.attr("data-thumbnail");
        if (imgURL) {
          selectOption.attr(
            "data-content",
            "<img src='%i'/> %s"
              .replace(/%i/, imgURL)
              .replace(/%s/, selectOption.text())
          );
        }
      });
      selectIMG.selectpicker();
    }
  };

  var menuleft = function () {
    if ($('div').hasClass('section-menu-left')) {
      var bt =$(".section-menu-left").find(".has-children");
      bt.on("click", function () {
        var args = { duration: 200 };
        if ($(this).hasClass("active")) {
          $(this).children(".sub-menu").slideUp(args);
          $(this).removeClass("active");
        } else {
          $(".sub-menu").slideUp(args);
          $(this).children(".sub-menu").slideDown(args);
          $(".menu-item.has-children").removeClass("active");
          $(this).addClass("active");
        }
      });
      $('.sub-menu-item').on('click', function(event){
        event.stopPropagation();
      });
    }
  };

  var tabs = function(){
    $('.widget-tabs').each(function(){
        $(this).find('.widget-content-tab').children().hide();
        $(this).find('.widget-content-tab').children(".active").show();
        $(this).find('.widget-menu-tab').find('li').on('click',function(){
            var liActive = $(this).index();
            var contentActive=$(this).siblings().removeClass('active').parents('.widget-tabs').find('.widget-content-tab').children().eq(liActive);
            contentActive.addClass('active').fadeIn("slow");
            contentActive.siblings().removeClass('active');
            $(this).addClass('active').parents('.widget-tabs').find('.widget-content-tab').children().eq(liActive).siblings().hide();
        });
    });
  };

  $('.dropdown-menu.has-content').on('click', function(event){
    event.stopPropagation();
  });
  $('.button-close-dropdown').on('click', function(){
    $(this).closest('.dropdown').find('.dropdown-toggle').removeClass('show');
    $(this).closest('.dropdown').find('.dropdown-menu').removeClass('show');
  });

  var collapse_menu = function () {
    $(".overplay-menu").on("click", function () {
      $('.layout-wrap').toggleClass('full-width');
    })
    $(".button-show-hide").on("click", function () {
      $('.layout-wrap').toggleClass('full-width');
    })
    $(".sidebar-close").on("click", function () {
      $('.sidebar-right').toggleClass('active');
    })
    $(".btn-dropdown-cate").on("click", function () {
      $('.form-question-ai').toggleClass('active');
    })
  }

  var showpass = function() {
    $(".show-pass").on("click", function () {
      $(this).toggleClass("active");
      var input = $(this).parents(".password").find(".password-input");

      if (input.attr("type") === "password") {
        input.attr("type", "text");
      } else if (input.attr("type") === "text") {
        input.attr("type", "password");
      }
    });
  }

  var select_colors_theme = function () {
    if ($('div').hasClass("select-colors-theme")) {
      $(".select-colors-theme .item").on("click", function (e) {
        $(this).parents(".select-colors-theme").find(".active").removeClass("active");
        $(this).toggleClass("active");
      })
    }
  }

  var icon_function = function () {
    if ($('div').hasClass("list-icon-function")) {
      $(".list-icon-function .trash").on("click", function (e) {
        e.preventDefault();
        const isOk = confirm("Are you sure you want to delete this item?");
        if (isOk) {
          $(this).parents(".item-row").remove();
        }
      });
      $(".list-icon-function .favourite").click(function () {
          $(this).toggleClass("active");
      });
    }

    $(".item-check").click(function () {
      $(this).closest(".list-checks").find(".active").removeClass("active");
      $(this).addClass("active");
    });
  }

  var variant_picker = function () {
    if ($(".variant-picker-item").length) {
      $(".variant-picker-item label").on("click", function (e) {
        $(this)
          .closest(".variant-picker-item")
          .find(".variant-picker-label-value")
          .text($(this).data("value"));
      });
    }
  };

  var uploadfile = function () {
    if ($("#myFile").length) {
      $("#myFile").on("change", function (e) {
        var file = e.target.files[0];
        if (!file) return;
    
        var $label = $(this).closest(".uploadfile");
        var reader = new FileReader();
    
        reader.onload = function (ev) {
          var $img = $("#myFile-input");
          $img.attr("src", ev.target.result);
          $label.addClass("has-img");
        };
    
        reader.readAsDataURL(file);
      });
    }
    

    if ($("#myFile-1").length) {
      $("#myFile-1").on("change", function (e) {
        var file = e.target.files[0];
        if (!file) return;
    
        if (!file.type.startsWith("video/")) {
          alert("Please upload a video file!");
          this.value = "";
          return;
        }
    
        var $label = $(this).closest(".uploadfile");
        var video = document.getElementById("myFile-input-1");
    
        var url = URL.createObjectURL(file);
        video.src = url;
        video.load();
    
        $label.addClass("has-video");
    
        video.play().catch(() => {});
      });
    }
    
  };

  var writeReview = function () {
    if ($(".write-cancel-review-wrap").length > 0) {
        $(".btn-comment-review").click(function () {
            $(this)
                .closest(".write-cancel-review-wrap")
                .toggleClass("write-review");
        });
    }
  };

  var multiselect = function () {

    document.querySelectorAll(".multi-select").forEach(ms => {
      const selectedTagsContainer = ms.querySelector(".selected-tags");
      const dropdownList = ms.querySelector(".list-dropdown");
      const dropdownToggle = ms.querySelector(".toggle-dropdown");
    
      let selected = [];
      try {
        selected = JSON.parse(ms.dataset.default || "[]");
      } catch (e) {
        selected = [];
      }
    
      function renderTags() {
        selectedTagsContainer.innerHTML = "";
        selected.forEach(color => {
          const tag = document.createElement("div");
          tag.className = "tag";
          tag.innerHTML = `<span class="icon icon-x"></span>${color}`;
          tag.querySelector("span").onclick = (e) => {
            e.stopPropagation();
            selected = selected.filter(c => c !== color);
            renderTags();
          };
          selectedTagsContainer.appendChild(tag);
        });
      }
    
      dropdownToggle.onclick = () => {
        dropdownList.style.display = dropdownList.style.display === "flex" ? "none" : "flex";
      };
    
      dropdownList.querySelectorAll("div").forEach(option => {
        option.onclick = () => {
          const color = option.textContent.trim();
          if (!selected.includes(color)) {
            selected.push(color);
            renderTags();
          }
          dropdownList.style.display = "none";
        };
      });
    
      renderTags();
    });

  }

  var handleMessage = function () {
    $(".btn-send-mess").on("click", function () {
      var ipMessage = $(".val-message");
      var messValue = ipMessage.val().trim();
      var $chat = $(".content-chat");
    
      if (!messValue.length) return;
    
      var domMessage =
        '<div class="bubble bubble-me">' +
          '<div class="avatar">' +
            '<img src="images/avatar/user-1.png" alt="">' +
          '</div>' +
          '<div class="content body-text-2">' +
            messValue +
          '</div>' +
        '</div>';
    
      $chat.append(domMessage);
    
      $chat.stop().animate(
        { scrollTop: $chat[0].scrollHeight },
        300
      );
    
      ipMessage.val("");
    });

    if ($(".content-chat").length > 0) {
      var $chat = $(".content-chat");
      $chat.animate(
        { scrollTop: $chat[0].scrollHeight },
        300
      );
    }
  };

  if ($(".nice-select").length > 0) {
    $(".select_js").niceSelect();
  }
  $(document).on("click", ".nice-select", function () {
    const $this = $(this);
    const dropdown = $this.find(".list");

    const dropdownHeight = dropdown.outerHeight();
    const offsetTop = $this.offset().top;
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();

    const spaceBelow = windowHeight - (offsetTop - scrollTop + $this.outerHeight());

    if (spaceBelow < dropdownHeight) {
        $this.addClass("open-up");
    } else {
        $this.removeClass("open-up");
    }
  });

  var scroll = function () {
    if ($(".faq-doc-wrap").length > 0) {
      var $container = $(".doc-content");
      var $links = $(".doc-process .item-check");
      var $inner = $container.find(".inner");

      if (!$container.length || !$links.length || !$inner.length) return;

      var sections = [];
      $links.each(function () {
        var $a = $(this);
        var hash = $a.attr("href");
        if (!hash || hash.charAt(0) !== "#") return;

        var $t = $inner.find(hash);
        if ($t.length) sections.push({ hash: hash, $link: $a, $target: $t });
      });
      if (!sections.length) return;

      function setActive(hash) {
        $links.removeClass("active");
        $links.filter('[href="' + hash + '"]').addClass("active");
      }

      function getScrollTopTo($target, extraOffset) {
        extraOffset = extraOffset || 0;

        var containerTop = $container.offset().top;
        var targetTop = $target.offset().top;

        return $container.scrollTop() + (targetTop - containerTop) - extraOffset;
      }

      $links.on("click", function (e) {
        var hash = $(this).attr("href");
        var item = sections.find(function (s) { return s.hash === hash; });
        if (!item) return;

        e.preventDefault();

        var top = getScrollTopTo(item.$target, 0);
        $container.stop(true).animate({ scrollTop: top }, 450);
        setActive(hash);
      });

      function updateActive() {
        var current = sections[0].hash;

        var marker = $container.offset().top + 60;

        for (var i = 0; i < sections.length; i++) {
          if (sections[i].$target.offset().top <= marker) {
            current = sections[i].hash;
          }
        }
        setActive(current);
      }

      var ticking = false;
      $container.on("scroll", function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          updateActive();
          ticking = false;
        });
      });

      $(window).on("resize", function () {
        updateActive();
      });

      updateActive();

    }
  };

  var video = function(){
    if ($('div').hasClass('video-wrap')) {
      $('.popup-youtube').magnificPopup({
        type: 'iframe'
      });
    }
  };

  // Dom Ready
  $(function () {
    selectImages();
    menuleft();
    tabs();
    collapse_menu();
    showpass();
    select_colors_theme();
    icon_function();
    variant_picker();
    uploadfile();
    writeReview();
    multiselect();
    handleMessage();
    scroll();
    video();
  });

})(jQuery);
