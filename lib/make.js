/**
 * Make abstraction.
 *
 * @package appmaker
 * @author  Andrew Sliwinski <a@mozillafoundation.org>
 */

var extend = require('extend');

var Blocks = require('./blocks');
var blocks = new Blocks();
var model = require('./model');

/**
 * Returns an app from storage matching the provided ID.
 *
 * @param {string} id App ID
 *
 * @return {int}
 */
function getMakeIndex (id) {
    for (var i = 0; i < model.apps.length; i++) {
        if (model.apps[i].id !== id) continue;
        return i;
    }
}

/**
 * Returns an app clone from storage at the specified index.
 *
 * @param  {int} index App index
 *
 * @return {object}
 */
function getMakeMeta (i) {
    return JSON.parse(JSON.stringify(model.apps[i]));
}

/**
 * Returns a block clone matching the provided ID.
 *
 * @param {string} id Block ID
 *
 * @return {object}
 */
function getBlock (id) {
    var newBlock = JSON.parse(JSON.stringify(blocks[id]));
    return newBlock;
}

/**
 * Constructor
 */
function Make (id) {
    var self = this;

    self.id = id;
    self.index = getMakeIndex(id);
    self.meta = getMakeMeta(self.index);
}

Make.prototype.updateName = function (name) {
    this.meta.name = name;
    model.apps[this.index].name = name;
};

Make.prototype.insert = function (id) {
    var self = this;
    var block = console.log(getBlock(id), model.apps[this.index].blocks[2]);
    model.apps[this.index].blocks.unshift(getBlock(id));
    self.meta.blocks.unshift(getBlock(id));
};

Make.prototype.update = function (index, attributes) {
    var self = this;
    if (!model.apps[this.index] || !model.apps[this.index].blocks[index]) {
        // The app or block was probably deleted
        return;
    }
    model.apps[this.index].blocks[index].attributes = attributes;
    self.meta.blocks[index].attributes = attributes;
};

Make.prototype.remove = function (index) {
    var self = this;
    model.apps[this.index].blocks.splice(index, 1);
    self.meta.blocks.splice(index, 1);
};

/**
 * Export
 */
module.exports = Make;