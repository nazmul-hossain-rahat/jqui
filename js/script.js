$(document).ready(function(){
	// jqui
    $( "#dable" ).draggable();
    
    $( "#accordion" ).accordion({
      collapsible: true
    });
    // 

    var aTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript"
      
    ];
    $( "#tags" ).autocomplete({
      source: aTags
    });
    // dropable
   $( "#draggable" ).draggable();
    $( "#droppable" ).droppable({
      drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
    });
    // simple photo manager
     // There's the gallery and the trash
    var $gallery = $( "#gallery" ),
      $trash = $( "#trash" );
 
    // Let the gallery items be draggable
    $( "li", $gallery ).draggable({
      cancel: "a.ui-icon", // clicking an icon won't initiate dragging
      revert: "invalid", // when not dropped, the item will revert back to its initial position
      containment: "document",
      helper: "clone",
      cursor: "move"
    });
 
    // Let the trash be droppable, accepting the gallery items
    $trash.droppable({
      accept: "#gallery > li",
      classes: {
        "ui-droppable-active": "ui-state-highlight"
      },
      drop: function( event, ui ) {
        deleteImage( ui.draggable );
      }
    });
 
    // Let the gallery be droppable as well, accepting items from the trash
    $gallery.droppable({
      accept: "#trash li",
      classes: {
        "ui-droppable-active": "custom-state-active"
      },
      drop: function( event, ui ) {
        recycleImage( ui.draggable );
      }
    });
 
    // Image deletion function
    var recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Recycle this image' class='ui-icon ui-icon-refresh'>Recycle image</a>";
    function deleteImage( $item ) {
      $item.fadeOut(function() {
        var $list = $( "ul", $trash ).length ?
          $( "ul", $trash ) :
          $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $trash );
 
        $item.find( "a.ui-icon-trash" ).remove();
        $item.append( recycle_icon ).appendTo( $list ).fadeIn(function() {
          $item
            .animate({ width: "48px" })
            .find( "img" )
              .animate({ height: "36px" });
        });
      });
    }
 
    // Image recycle function
    var trash_icon = "<a href='link/to/trash/script/when/we/have/js/off' title='Delete this image' class='ui-icon ui-icon-trash'>Delete image</a>";
    function recycleImage( $item ) {
      $item.fadeOut(function() {
        $item
          .find( "a.ui-icon-refresh" )
            .remove()
          .end()
          .css( "width", "96px")
          .append( trash_icon )
          .find( "img" )
            .css( "height", "72px" )
          .end()
          .appendTo( $gallery )
          .fadeIn();
      });
    }
 
    // Image preview function, demonstrating the ui.dialog used as a modal window
    function viewLargerImage( $link ) {
      var src = $link.attr( "href" ),
        title = $link.siblings( "img" ).attr( "alt" ),
        $modal = $( "img[src$='" + src + "']" );
 
      if ( $modal.length ) {
        $modal.dialog( "open" );
      } else {
        var img = $( "<img alt='" + title + "' width='384' height='288' style='display: none; padding: 8px;' />" )
          .attr( "src", src ).appendTo( "body" );
        setTimeout(function() {
          img.dialog({
            title: title,
            width: 400,
            modal: true
          });
        }, 1 );
      }
    }
 
    // Resolve the icons behavior with event delegation
    $( "ul.gallery > li" ).on( "click", function( event ) {
      var $item = $( this ),
        $target = $( event.target );
 
      if ( $target.is( "a.ui-icon-trash" ) ) {
        deleteImage( $item );
      } else if ( $target.is( "a.ui-icon-zoomin" ) ) {
        viewLargerImage( $target );
      } else if ( $target.is( "a.ui-icon-refresh" ) ) {
        recycleImage( $item );
      }
 
      return false;
    });
 
    // simple photo manager


    // shortable
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
    // shortable

 

// Checkboxradio
function handleShape( e ) {
      $( ".shape" )
        .removeClass( "circle pill square rectangle" )
        .addClass( $( e.target ).val() );
    };
    function handleToggle( e ) {
      var target = $( e.target );
 
      if ( target.is( ".brand-toggle" ) ) {
        var checked = target.is( ":checked" ),
          value = $( "[name='brand']" )
            .filter( ":checked" )
            .attr( "data-" + target[ 0 ].id )
        $( ".shape" ).css( target[ 0 ].id, checked ? value : "" );
      } else {
        $( ".shape" ).toggleClass( target[ 0 ].id, target.is( ":checked") );
      }
    }
    function updateBrand() {
      handleShape( { target: $( "[name='shape']:checked" ) } );
      $( ".toggle:checked" ).each( function() {
        handleToggle( { target: $( this ) } );
      } );
    }
 
    // Initalize widgets
    $( "input" ).checkboxradio();
    $( ".shape-bar, .brand" ).controlgroup();
    $( ".toggles" ).controlgroup( {
      direction: "vertical"
    } );
 
    // Bind event handlers
    $( "[name='shape']").on( "change", handleShape );
    $( ".toggle" ).on( "change", handleToggle );
    $( "[name='brand']").on( "change", updateBrand );
 
    // Set initial values
    updateBrand();
// Checkboxradio
// controlgroup
var page = $( "#page" );
    var basicControls = [ "#print", "#bold", "#italic", "#undo", "#redo" ];
    var valueControls = [ "#fontsize", "#forecolor", "#hilitecolor", "#backcolor", "fontname" ];
 
    $( "#print" ).button({
      "icon": "ui-icon-print",
      "showLabel": false
    });
    $( "#redo" ).button({
      "icon": "ui-icon-arrowreturnthick-1-e",
      "showLabel": false
    });
    $( "#undo" ).button({
      "icon": "ui-icon-arrowreturnthick-1-w",
      "showLabel": false
    });
 
    $( ".toolbar" ).controlgroup();
    $( "#zoom" ).on( "selectmenuchange", function() {
      page.css({ "zoom": $( this ).val() });
    })
    $( basicControls.concat( valueControls ).join( ", " ) ).on( "click change selectmenuchange",
      function() {
        document.execCommand(
          this.id,
          false,
          $( this ).val()
        );
      } );
    $( "form" ).on( "submit", function( event ) {
      event.preventDefault();
    });

    // controlgroup
// date picker
$( "#datepicker" ).datepicker();

// date picker


// page 3
// dialog
 $( "#dialog" ).dialog();
// dialog

// progress bar
 var progressTimer,
      progressbar = $( "#progressbar" ),
      progressLabel = $( ".progress-label" ),
      dialogButtons = [{
        text: "Cancel Download",
        click: closeDownload
      }],
      dialog = $( "#dialog" ).dialog({
        autoOpen: false,
        closeOnEscape: false,
        resizable: false,
        buttons: dialogButtons,
        open: function() {
          progressTimer = setTimeout( progress, 2000 );
        },
        beforeClose: function() {
          downloadButton.button( "option", {
            disabled: false,
            label: "Start Download"
          });
        }
      }),
      downloadButton = $( "#downloadButton" )
        .button()
        .on( "click", function() {
          $( this ).button( "option", {
            disabled: true,
            label: "Downloading..."
          });
          dialog.dialog( "open" );
        });
 
    progressbar.progressbar({
      value: false,
      change: function() {
        progressLabel.text( "Current Progress: " + progressbar.progressbar( "value" ) + "%" );
      },
      complete: function() {
        progressLabel.text( "Complete!" );
        dialog.dialog( "option", "buttons", [{
          text: "Close",
          click: closeDownload
        }]);
        $(".ui-dialog button").last().trigger( "focus" );
      }
    });
 
    function progress() {
      var val = progressbar.progressbar( "value" ) || 0;
 
      progressbar.progressbar( "value", val + Math.floor( Math.random() * 3 ) );
 
      if ( val <= 99 ) {
        progressTimer = setTimeout( progress, 50 );
      }
    }
 
    function closeDownload() {
      clearTimeout( progressTimer );
      dialog
        .dialog( "option", "buttons", dialogButtons )
        .dialog( "close" );
      progressbar.progressbar( "value", false );
      progressLabel
        .text( "Starting download..." );
      downloadButton.trigger( "focus" );
    }
// progress bar

// color animaltion
var state = true;
    $( "#button" ).on( "click", function() {
      if ( state ) {
        $( "#effect" ).animate({
          backgroundColor: "#aa0000",
          color: "#fff",
          width: 500
        }, 1000 );
      } else {
        $( "#effect" ).animate({
          backgroundColor: "#fff",
          color: "#000",
          width: 240
        }, 1000 );
      }
      state = !state;
    });
// color animaltion
var state = true;
    $( "#button" ).on( "click", function() {
      if ( state ) {
        $( "#effect" ).animate({
          backgroundColor: "#aa0000",
          color: "#fff",
          width: 500
        }, 1000 );
      } else {
        $( "#effect" ).animate({
          backgroundColor: "#fff",
          color: "#000",
          width: 240
        }, 1000 );
      }
      state = !state;
    });
// color animaltion
// effect
// run the currently selected effect
    function runEffect() {
      // get effect type from
      var selectedEffect = $( "#effectTypes" ).val();
 
      // Most effect types need no options passed by default
      var options = {};
      // some effects have required parameters
      if ( selectedEffect === "scale" ) {
        options = { percent: 50 };
      } else if ( selectedEffect === "transfer" ) {
        options = { to: "#button", className: "ui-effects-transfer" };
      } else if ( selectedEffect === "size" ) {
        options = { to: { width: 200, height: 60 } };
      }
 
      // Run the effect
      $( "#effect" ).effect( selectedEffect, options, 500, callback );
    };
 
    // Callback function to bring a hidden box back
    function callback() {
      setTimeout(function() {
        $( "#effect" ).removeAttr( "style" ).hide().fadeIn();
      }, 1000 );
    };
 
    // Set effect from select menu value
    $( "#button" ).on( "click", function() {
      runEffect();
      return false;
    });
// effect
// position
 function position() {
      $( ".positionable" ).position({
        of: $( "#parent" ),
        my: $( "#my_horizontal" ).val() + " " + $( "#my_vertical" ).val(),
        at: $( "#at_horizontal" ).val() + " " + $( "#at_vertical" ).val(),
        collision: $( "#collision_horizontal" ).val() + " " + $( "#collision_vertical" ).val()
      });
    }
 
    $( ".positionable" ).css( "opacity", 0.5 );
 
    $( "select, input" ).on( "click keyup change", position );
 
    $( "#parent" ).draggable({
      drag: position
    });
 
    position();
// position
// widget
// "colorize" the widget name
    $.widget( "custom.colorize", {
      // default options
      options: {
        red: 255,
        green: 0,
        blue: 0,
 
        // Callbacks
        change: null,
        random: null
      },
 
      // The constructor
      _create: function() {
        this.element
          // add a class for theming
          .addClass( "custom-colorize" );
 
        this.changer = $( "<button>", {
          text: "change",
          "class": "custom-colorize-changer"
        })
        .appendTo( this.element )
        .button();
 
        // Bind click events on the changer button to the random method
        this._on( this.changer, {
          // _on won't call random when widget is disabled
          click: "random"
        });
        this._refresh();
      },
 
      // Called when created, and later when changing options
      _refresh: function() {
        this.element.css( "background-color", "rgb(" +
          this.options.red +"," +
          this.options.green + "," +
          this.options.blue + ")"
        );
 
        // Trigger a callback/event
        this._trigger( "change" );
      },
 
      // A public method to change the color to a random value
      // can be called directly via .colorize( "random" )
      random: function( event ) {
        var colors = {
          red: Math.floor( Math.random() * 256 ),
          green: Math.floor( Math.random() * 256 ),
          blue: Math.floor( Math.random() * 256 )
        };
 
        // Trigger an event, check if it's canceled
        if ( this._trigger( "random", event, colors ) !== false ) {
          this.option( colors );
        }
      },
 
      // Events bound via _on are removed automatically
      // revert other modifications here
      _destroy: function() {
        // remove generated elements
        this.changer.remove();
 
        this.element
          .removeClass( "custom-colorize" )
          .enableSelection()
          .css( "background-color", "transparent" );
      },
 
      // _setOptions is called with a hash of all options that are changing
      // always refresh when changing options
      _setOptions: function() {
        // _super and _superApply handle keeping the right this-context
        this._superApply( arguments );
        this._refresh();
      },
 
      // _setOption is called for each individual option that is changing
      _setOption: function( key, value ) {
        // prevent invalid color values
        if ( /red|green|blue/.test(key) && (value < 0 || value > 255) ) {
          return;
        }
        this._super( key, value );
      }
    });
 
    // Initialize with default options
    $( "#my-widget1" ).colorize();
 
    // Initialize with two customized options
    $( "#my-widget2" ).colorize({
      red: 60,
      blue: 60
    });
 
    // Initialize with custom green value
    // and a random callback to allow only colors with enough green
    $( "#my-widget3" ).colorize( {
      green: 128,
      random: function( event, ui ) {
        return ui.green > 128;
      }
    });
 
    // Click to toggle enabled/disabled
    $( "#disable" ).on( "click", function() {
      // use the custom selector created for each widget to find all instances
      // all instances are toggled together, so we can check the state from the first
      if ( $( ":custom-colorize" ).colorize( "option", "disabled" ) ) {
        $( ":custom-colorize" ).colorize( "enable" );
      } else {
        $( ":custom-colorize" ).colorize( "disable" );
      }
    });
 
    // Click to set options after initialization
    $( "#green" ).on( "click", function() {
      $( ":custom-colorize" ).colorize( "option", {
        red: 64,
        green: 250,
        blue: 8
      });
    });
// widget
 } );
   