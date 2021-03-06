// Generated by CoffeeScript 1.3.3
var getLocalStorageValue, setLocalStorageValue,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

getLocalStorageValue = function(key) {
  var localStorageKey;
  localStorageKey = 'tributary/';
  return localStorage.getItem([localStorageKey, key].join('/'));
};

setLocalStorageValue = function(key, value) {
  var localStorageKey;
  localStorageKey = 'tributary/';
  return localStorage.setItem([localStorageKey, key].join('/'), value);
};

tributary.Tributary = (function(_super) {

  __extends(Tributary, _super);

  function Tributary() {
    this.get_code = __bind(this.get_code, this);

    this.newcode = __bind(this.newcode, this);

    this.execute = __bind(this.execute, this);
    return Tributary.__super__.constructor.apply(this, arguments);
  }

  Tributary.prototype.defaults = {
    code: ""
  };

  Tributary.prototype.initialize = function() {
    this.on("code", this.newcode);
    return this.on("execute", this.execute);
  };

  Tributary.prototype.execute = function() {
    var code, svg, trib, trib_options;
    try {
      svg = d3.select("svg");
      code = "tributary.initialize = function(g) {";
      code += this.get("code");
      code += "};";
      eval(code);
    } catch (e) {
      this.trigger("error", e);
      return false;
    }
    try {
      window.trib = {};
      window.trib_options = {};
      trib = window.trib;
      trib_options = window.trib_options;
      $("svg.tributary_svg").empty();
      tributary.initialize(d3.select("svg.tributary_svg"));
    } catch (e) {
      this.trigger("error", e);
      return false;
    }
    this.trigger("noerror");
    return true;
  };

  Tributary.prototype.newcode = function(code) {
    this.set({
      code: code
    });
    this.execute();
    return true;
  };

  Tributary.prototype.get_code = function(callback) {
    var src_url,
      _this = this;
    if (this.get("gist") && this.get("filename")) {
      src_url = "/tributary/api/" + this.get("gist") + "/" + this.get("filename");
      return d3.text(src_url, function(data) {
        var code;
        if (data) {
          code = data;
          _this.set({
            code: data
          });
        } else {
          code = _this.get("code");
          console.log("codeee?", code);
          if (!code) {
            code = "";
          }
        }
        return callback(null, code);
      });
    }
  };

  return Tributary;

})(Backbone.Model);

tributary.Reptile = (function(_super) {

  __extends(Reptile, _super);

  function Reptile() {
    this.execute = __bind(this.execute, this);
    return Reptile.__super__.constructor.apply(this, arguments);
  }

  /*
      #   For making tiles with tributary code
  */


  Reptile.prototype.initialize = function() {
    Reptile.__super__.initialize.apply(this, arguments);
    this.set({
      code: "g.append(\"rect\").attr(\"width\", 100).attr(\"height\", 100)"
    });
    return this;
  };

  Reptile.prototype.execute = function() {
    var code;
    delete tributary.initialize;
    try {
      code = "tributary.initialize = function(g) {";
      code += this.get("code");
      code += "};";
      eval(code);
      $('#clones').empty();
      tributary.make_clones();
      this.trigger("noerror");
    } catch (e) {
      this.trigger("error", e);
    }
    return true;
  };

  return Reptile;

})(tributary.Tributary);

tributary.Delta = (function(_super) {

  __extends(Delta, _super);

  function Delta() {
    this.execute = __bind(this.execute, this);
    return Delta.__super__.constructor.apply(this, arguments);
  }

  /*
      #   For exploring transitions
  */


  Delta.prototype.execute = function() {
    var svg;
    try {
      svg = d3.select(".tributary_svg");
      eval(this.get("code"));
      this.trigger("noerror");
    } catch (e) {
      this.trigger("error", e);
    }
    if (tributary.bv) {
      try {
        $('#clones').empty();
        tributary.make_clones();
      } catch (_error) {}
    }
    try {
      $("#delta").empty();
      tributary.init(tributary.g, 0);
      tributary.execute();
    } catch (e) {
      this.trigger("error", e);
    }
    return true;
  };

  return Delta;

})(tributary.Tributary);

tributary.Flow = (function(_super) {

  __extends(Flow, _super);

  function Flow() {
    this.execute = __bind(this.execute, this);
    return Flow.__super__.constructor.apply(this, arguments);
  }

  /*
      #   Music visualization exploration
  */


  Flow.prototype.execute = function() {
    try {
      eval(this.get("code"));
      this.trigger("noerror");
    } catch (e) {
      this.trigger("error", e);
    }
    try {
      $("#flow").empty();
      tributary.init(tributary.g);
      tributary.execute();
      this.trigger("noerror");
    } catch (e) {
      this.trigger("error", e);
    }
    return true;
  };

  return Flow;

})(tributary.Tributary);

tributary.Geyser = (function(_super) {

  __extends(Geyser, _super);

  function Geyser() {
    this.execute = __bind(this.execute, this);
    return Geyser.__super__.constructor.apply(this, arguments);
  }

  /*
      #   Music visualization with controls for mapping frequencies to viz params
  */


  Geyser.prototype.execute = function() {
    var svg;
    $("#geyser").empty();
    try {
      svg = d3.select("#geyser");
      eval(this.get("code"));
    } catch (_error) {}
    try {
      tributary.init(tributary.g);
    } catch (_error) {}
    try {
      tributary.execute();
    } catch (_error) {}
    return true;
  };

  return Geyser;

})(tributary.Tributary);

tributary.Fountain = (function(_super) {

  __extends(Fountain, _super);

  function Fountain() {
    this.execute = __bind(this.execute, this);
    return Fountain.__super__.constructor.apply(this, arguments);
  }

  /*
      #   Music visualization with MIDI controls for mapping frequencies to viz params
  */


  Fountain.prototype.execute = function() {
    var svg;
    $("#fountain").empty();
    try {
      svg = d3.select("#fountain");
      eval(this.get("code"));
    } catch (_error) {}
    try {
      tributary.init(tributary.g);
    } catch (_error) {}
    try {
      tributary.execute();
    } catch (_error) {}
    return true;
  };

  return Fountain;

})(tributary.Tributary);

tributary.TributaryView = (function(_super) {

  __extends(TributaryView, _super);

  function TributaryView() {
    this._loadFile = __bind(this._loadFile, this);

    this._fileDrop = __bind(this._fileDrop, this);

    this._dragOver = __bind(this._dragOver, this);

    this.save_gist = __bind(this.save_gist, this);

    this.init_gui = __bind(this.init_gui, this);
    return TributaryView.__super__.constructor.apply(this, arguments);
  }

  TributaryView.prototype.check_date = true;

  TributaryView.prototype.initialize = function() {
    var _this = this;
    this.endpoint = this.options.endpoint || "tributary";
    this.chosenRow = 0;
    this.chosenColumn = 0;
    this.onNumeric = false;
    d3.select("#editor").on("click", function() {
      _this.sliding = false;
      return _this.picking = false;
    });
    d3.select(".CodeMirror").on("click", function() {
      _this.sliding = false;
      return _this.picking = false;
    });
    this.code_editor = CodeMirror(d3.select("#editor").node(), {
      mode: "javascript",
      theme: "lesser-dark",
      lineNumbers: true,
      onChange: function() {
        var thisCode;
        thisCode = _this.code_editor.getValue();
        return _this.model.trigger("code", thisCode);
      }
    });
    this.controls = {};
    this.dating = false;
    this.gui = new dat.GUI();
    this.make_ui = function() {
      var key, max, min, val, _results;
      if (!_this.dating) {
        _this.gui.destroy();
        _this.gui = new dat.GUI();
        _results = [];
        for (key in trib) {
          if (_this.controls[key] != null) {
            delete _this.controls[key];
          }
          if ((typeof trib_options !== "undefined" && trib_options !== null) && (trib_options[key] != null)) {
            _this.controls[key] = _this.gui.add(trib, key, trib_options[key].min, trib_options[key].max);
          } else {
            val = trib[key];
            if (typeof val === "number") {
              if (val === 0) {
                min = -100;
                max = 100;
              } else {
                min = -10 * val;
                max = 10 * val;
              }
            }
            _this.controls[key] = _this.gui.add(trib, key, min, max);
          }
          _results.push(_this.controls[key].onChange((function(key) {
            return function(value) {
              var cursor, newtxt, txt;
              _this.dating = true;
              txt = new RegExp("trib\." + key + "\\s*=(\\s*)[-+]?(?:\\d+\\.?\\d*|\\.?\\d+)(?:[eE][-+]?\\d+)?");
              cursor = _this.code_editor.getSearchCursor(txt);
              if (cursor.findNext()) {
                newtxt = "trib." + key + " = " + value;
                return cursor.replace(newtxt);
              }
            };
          })(key)));
        }
        return _results;
      }
    };
    this.inlet = Inlet(this.code_editor);
    this.init_gui();
    if (this.model.get("code") != null) {
      this.code_editor.setValue(this.model.get("code"));
      this.model.execute();
    }
    this.model.get_code(function(error, code) {
      return _this.code_editor.setValue(code);
    });
    $('body')[0].addEventListener('dragover', this._dragOver, false);
    $('body')[0].addEventListener('drop', this._fileDrop, false);
    this.code_last_modified = new Date(0, 0, 0);
    this.past = new Date();
    d3.timer(function() {
      if (new Date() - _this.past > 300) {
        if (_this.file != null) {
          _this._loadFile();
        }
        _this.past = new Date();
      }
      return false;
    });
    return this;
  };

  TributaryView.prototype.init_gui = function() {
    var editor, editor_drag, handle_data, he,
      _this = this;
    $('#tweet_this').append("tweet this");
    $('#tweetPanel').on("click", function(e) {
      return _this.save_gist(function(newurl, newgist) {
        var tweetlink;
        tweetlink = "http://twitter.com/home/?status=See my latest %23tributary here " + "http://mainstem.org" + newurl;
        return window.location = tweetlink;
      });
    });
    $('#savePanel').on('click', function(e) {
      return _this.save_gist(function(newurl, newgist) {
        return window.location = newurl;
      });
    });
    this.editor_width = 600;
    this.editor_height = 300;
    editor = $('#editor');
    editor.css('width', this.editor_width);
    editor.css('height', this.editor_height);
    editor_drag = d3.behavior.drag().on("drag", function(d, i) {
      var dx, dy;
      dx = d3.event.dx;
      dy = d3.event.dy;
      d.x -= dx;
      d.y -= dy;
      _this.editor_handle.style("bottom", _this.editor_height + d.y + "px");
      _this.editor_handle.style("right", -10 + _this.editor_width + d.x + "px");
      editor.css('width', _this.editor_width + d.x + "px");
      editor.css('height', _this.editor_height + d.y + "px");
      editor.find('.CodeMirror-scroll').css('height', _this.editor_height + d.y + "px");
      return editor.find('.CodeMirror-gutter').css('height', _this.editor_height + d.y + "px");
    });
    handle_data = {
      x: 0,
      y: 0
    };
    this.editor_handle = d3.select("body").append("div").attr("id", "editor_handle").data([handle_data]).style("position", "fixed").style("display", "block").style("float", "left").style("bottom", this.editor_height + "px").style("right", -11 + this.editor_width + "px").style("width", "20px").style("height", "20px").style("background-color", "rgba(50, 50, 50, .4)").style("z-index", 999).call(editor_drag);
    this.model.on("error", function() {
      return _this.editor_handle.style("background-color", "rgba(250, 50, 50, .7)");
    });
    this.model.on("noerror", function() {
      _this.editor_handle.style("background-color", "rgba(50, 250, 50, .4)");
      _this.make_ui();
      return _this.dating = false;
    });
    he = $('#hideEditor');
    return he.on("click", function(e) {
      var txt;
      $("#editor").toggle();
      $("#editor_handle").toggle();
      txt = he.html();
      if (txt === "Hide") {
        return he.html("Show");
      } else {
        return he.html("Hide");
      }
    });
  };

  TributaryView.prototype.save_gist = function(callback) {
    var filename, gist, oldgist,
      _this = this;
    oldgist = parseInt(this.model.get("gist"));
    filename = this.model.get("filename");
    if (filename === "") {
      filename = "inlet.js";
    }
    gist = {
      description: 'just another inlet to tributary',
      "public": true,
      files: {}
    };
    gist.files[filename] = {
      content: this.model.get("code")
    };
    d3.select("#saveButton").style("background-image", "url(/static/img/ajax-loader.gif)");
    d3.select("#saveButton").style("background-repeat", "no-repeat");
    d3.select("#saveButton").style("top", "0px");
    return $.post('/tributary/save', {
      "gist": JSON.stringify(gist)
    }, function(data) {
      var newgist, newurl;
      if (typeof data === "string") {
        data = JSON.parse(data);
      }
      newgist = data.id;
      newurl = "/" + _this.endpoint + "/" + newgist + "/" + filename;
      return callback(newurl, newgist);
    });
  };

  TributaryView.prototype._dragOver = function(ev) {
    'Called when a user drags a file over the #drop_file div';
    ev.stopPropagation();
    ev.preventDefault();
    return ev.dataTransfer.dropEffect = 'copy';
  };

  TributaryView.prototype._fileDrop = function(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    this.file = ev.dataTransfer.files[0];
    this.code_last_modified = new Date(0, 0, 0);
    return this._loadFile();
  };

  TributaryView.prototype._loadFile = function() {
    var reader,
      _this = this;
    reader = new FileReader();
    if (!this.check_date || this.file.lastModifiedDate > this.code_last_modified) {
      console.log("read file!");
      reader.onload = function() {
        return _this.code_editor.setValue(reader.result);
      };
      this.code_last_modified = this.file.lastModifiedDate;
      return reader.readAsText(this.file);
    }
  };

  return TributaryView;

})(Backbone.View);

tributary.GeyserView = (function(_super) {

  __extends(GeyserView, _super);

  function GeyserView() {
    this.render = __bind(this.render, this);
    return GeyserView.__super__.constructor.apply(this, arguments);
  }

  GeyserView.prototype.initialize = function() {
    return this;
  };

  GeyserView.prototype.render = function() {
    var geyserpad, keys, pad_data, padgh, padgw, padh, padn, pads, padsg, padw, spacing, xn, yn,
      _this = this;
    padn = 16;
    xn = 4;
    yn = 4;
    spacing = 10;
    pad_data = d3.range(padn);
    geyserpad = d3.select("#geyserpad");
    padgw = parseInt(geyserpad.style("width"));
    padgh = parseInt(geyserpad.style("height"));
    padw = (padgw - spacing * xn) / xn;
    padh = (padgh - spacing * yn) / yn;
    keys = ['4', '5', '6', '7', 'r', 't', 'y', 'u', 'f', 'g', 'h', 'j', 'v', 'b', 'n', 'm'];
    padsg = geyserpad.append("g").attr("id", "geyserpads");
    pads = padsg.selectAll("rect.geyserpad").data(pad_data).enter().append("rect").attr("class", "geyserpad").attr("width", padw).attr("height", padh).attr("fill", "#000000").attr("stroke", "#000000").attr("stroke-width", 3).style("opacity", 0.3).attr("stroke-opacity", 1).attr("transform", function(d, i) {
      var x, y;
      x = i % xn * (padw + spacing) + spacing / 2;
      y = parseInt(i / yn) * (padh + spacing) + spacing / 2;
      return "translate(" + [x, y] + ")";
    }).on("click", function() {}).on("mousedown", function(d, i) {
      d3.select(this).attr("fill", "#ffff00");
      return tributary.pads[i].start();
    }).on("mouseup", function(d, i) {
      d3.select(this).attr("fill", "#000");
      return tributary.pads[i].stop();
    }).each(function(d, i) {
      var _this = this;
      $('body').bind('keydown', jwerty.event(keys[d], function() {
        tributary.pads[d].start();
        return d3.select(_this).attr("fill", "#ffff00");
      }));
      return $('body').bind('keyup', jwerty.event(keys[d], function() {
        tributary.pads[d].stop();
        return d3.select(_this).attr("fill", "#000");
      }));
    });
    _.each(pad_data, function(d) {
      $('body').bind('keydown', jwerty.event(keys[d], function() {
        tributary.pads[d].start();
        return d3.select(this).attr("fill", "#ffff00");
      }));
      return $('body').bind('keyup', jwerty.event(keys[d], function() {
        return tributary.pads[d].stop();
      }));
    });
    return this;
  };

  return GeyserView;

})(Backbone.View);

tributary.FountainView = (function(_super) {

  __extends(FountainView, _super);

  function FountainView() {
    this.render = __bind(this.render, this);
    return FountainView.__super__.constructor.apply(this, arguments);
  }

  FountainView.prototype.initialize = function() {
    return this;
  };

  FountainView.prototype.render = function() {
    var fountainpad, keys, pad_data, padgh, padgw, padh, padn, pads, padsg, padw, spacing, xn, yn,
      _this = this;
    padn = 16;
    xn = 4;
    yn = 4;
    spacing = 10;
    pad_data = d3.range(padn);
    fountainpad = d3.select("#fountainpad");
    padgw = parseInt(fountainpad.style("width"));
    padgh = parseInt(fountainpad.style("height"));
    padw = (padgw - spacing * xn) / xn;
    padh = (padgh - spacing * yn) / yn;
    keys = ['4', '5', '6', '7', 'r', 't', 'y', 'u', 'f', 'g', 'h', 'j', 'v', 'b', 'n', 'm'];
    padsg = fountainpad.append("g").attr("id", "fountainpads");
    pads = padsg.selectAll("rect.fountainpad").data(pad_data).enter().append("rect").attr("class", "fountainpad").attr("width", padw).attr("height", padh).attr("fill", "#000000").attr("stroke", "#000000").attr("stroke-width", 3).style("opacity", 0.3).attr("stroke-opacity", 1).attr("transform", function(d, i) {
      var x, y;
      x = i % xn * (padw + spacing) + spacing / 2;
      y = parseInt(i / yn) * (padh + spacing) + spacing / 2;
      return "translate(" + [x, y] + ")";
    }).on("click", function() {}).on("mousedown", function(d, i) {
      d3.select(this).attr("fill", "#ffff00");
      return tributary.pads[i].start();
    }).on("mouseup", function(d, i) {
      d3.select(this).attr("fill", "#000");
      return tributary.pads[i].stop();
    }).each(function(d, i) {
      var _this = this;
      $('body').bind('keydown', jwerty.event(keys[d], function() {
        tributary.pads[d].start();
        return d3.select(_this).attr("fill", "#ffff00");
      }));
      return $('body').bind('keyup', jwerty.event(keys[d], function() {
        tributary.pads[d].stop();
        return d3.select(_this).attr("fill", "#000");
      }));
    });
    _.each(pad_data, function(d) {
      $('body').bind('keydown', jwerty.event(keys[d], function() {
        tributary.pads[d].start();
        return d3.select(this).attr("fill", "#ffff00");
      }));
      return $('body').bind('keyup', jwerty.event(keys[d], function() {
        return tributary.pads[d].stop();
      }));
    });
    return this;
  };

  return FountainView;

})(Backbone.View);
