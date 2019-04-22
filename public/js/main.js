var camToSee = {
    checkedCard: function() {
        var cardList = $('.card-list'),
            cardListItem = cardList.find('li');

        cardListItem.on('click', function(e) {
            var el = $(this);

            el.parents('.card-list').find('li').removeClass('active');
            el.addClass('active');

            e.preventDefault();
            e.stopPropagation();

        });
    },
    appColorScheme: function() {
        var colorThemes = $('.color-themes-links'),
            colorThemeItem = colorThemes.find('li');

        colorThemeItem.on('click', function(e) {
            var el = $(this);

            colorThemeItem.removeClass('active');
            el.addClass('active');

            $("body").removeClass(function(index, css) {
                return (css.match(/(^|\s)main-theme-\S+/g) || []).join(' ');
            });

            if (el.hasClass('color-theme-light')) {
                $("body").addClass('main-theme-light');
                $("html").removeClass('overall-showed');
                $(".overall-panel.overall-main-nav").removeClass('showed');
            }
            if (el.hasClass('color-theme-dark')) {
                $("body").addClass('main-theme-dark');
                $("html").removeClass('overall-showed');
                $(".overall-panel.overall-main-nav").removeClass('showed');
            }

            e.preventDefault();
            e.stopPropagation();

        });
    },
    overallPanels: function() {

        var showPanelBtn = $('.show-overall-panel'),
            hidePanelBtn = $('.hide-overall-panel');

        showPanelBtn.on('click', function(e) {
            var el = $(this);

            $("html").removeClass('overall-showed');

            if (el.hasClass('show-overall-modal-right')) {
                $("html").addClass('overall-showed');
                $('.overall-panel.overall-modal-right').addClass('showed');
            }

            if (el.hasClass('show-overall-modal-bottom')) {
                $("html").addClass('overall-showed');
                $('.overall-panel.overall-modal-bottom').addClass('showed');
            }

            if (el.hasClass('show-overall-modal-overall')) {
                $("html").addClass('overall-showed');
                $('.overall-panel.overall-modal-overall').addClass('showed');
            }

            e.preventDefault();
            e.stopPropagation();

        });


        hidePanelBtn.on('click', function(e) {
            var el = $(this);
            if (el.hasClass('hide-overall-modal-right') || el.hasClass('hide-overall-modal-bottom') || el.hasClass('hide-overall-modal-overall')) {
                $("html").removeClass('overall-showed');
                el.parents('.overall-panel').removeClass('showed');
            }

            e.preventDefault();
            e.stopPropagation();

        });


        $(document).on('click', function(e) {
            if (!$(e.target).closest('.overall-panel-container').length) {
                $("html").removeClass('overall-showed');
                $('.overall-panel').removeClass('showed');
            }
        });

    },
    init: function() {
        this.checkedCard();
        this.appColorScheme();
        this.overallPanels();
    }
};

var mainContent = $('.app-view');
mainContent.hide();

document.onreadystatechange = function() {

    if (document.readyState == "interactive") {
        setTimeout(function() {
            camToSee.init();
            $('.white_over_all').css({
                'display': 'none'
            });
        }, 50);
        mainContent.show();

    }
};