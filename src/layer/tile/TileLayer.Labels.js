/*
 * L.TileLayer.Labels is a class that you can use as a base for creating
 * dynamically drawn Labels-based tile layers.
 */

L.TileLayer.Labels = L.TileLayer.extend({
	options: {
		async: false
	},

	initialize: function (options) {
		L.setOptions(this, options);
	},

	redraw: function () {
		var tiles = this._tiles;

		for (var i in tiles) {
			if (tiles.hasOwnProperty(i)) {
				this._redrawTile(tiles[i]);
			}
		}
		return this;
	},

	_redrawTile: function (tile) {
		this.drawTile(tile, tile._tilePoint, this._map._zoom);
	},

	_createTileProto: function () {
		var proto = this._canvasProto = L.DomUtil.create('div', 'leaflet-tile');
		proto.width = proto.height = this.options.tileSize;
	},

	_createTile: function () {
		var tile = this._canvasProto.cloneNode(false);
		tile.onselectstart = tile.onmousemove = L.Util.falseFn;
		return tile;
	},

        
        _loadTile: function (tile, tilePoint) {
                tile._layer  = this;
                tile.onload  = this._tileOnLoad;
                tile.onerror = this._tileOnError;

                this._adjustTilePoint(tilePoint);
                
                // ajax  this.getTileUrl(tilePoint);
                                                                                                  },
                        this._redrawTile(tile);
                        if (!this.options.async) {
                                this.tileDrawn(tile);
                        }
	},

	drawTile: function (/*tile, tilePoint*/) {
		tile.innerHTML = this.getTileUrl(tilePoint);
	},

	tileDrawn: function (tile) {
		this._tileOnLoad.call(tile);
	}
});


L.tileLayer.labels = function (options) {
	return new L.TileLayer.Labels(options);
};
