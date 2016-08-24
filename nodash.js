module.exports = function () {

  /*
    OBJECT PROTOTYPES
  */

  // pick from object
  Object.prototype.pick = function () {
    var r = {};
    Array.from(arguments).forEach(a => {
      if (this[a])
        r[a] = this[a];
    });
    return r;
  };

  // list object keys
  Object.prototype.keys = function () {
    return Object.keys(this);
  };

  // clone object
  Object.prototype.clone = function () {
    return Object.assign({}, this);
  };

  // Deep clone object
  Object.prototype.cloneDeep = function () {
    return JSON.parse(JSON.stringify(this));
  };

  // object assign (mutates).
  Object.prototype.assign = function () {
    var m = Array.from(arguments);
    m.unshift(this);
    return Object.assign.apply(null, m);
  };


  /*
    ARRAY PROTOTYPES
  */

  // iteratee(i, done(err, resp))
  Array.prototype.series = function (iteratee) {
    var self = this.slice(0);
    var returnArray = [];
    return new Promise(function (resolve, reject) {
      function it() {
        if (self.length === 0)
          return resolve(returnArray);
        iteratee(self.shift(), function (err, resp) {
          if (err)
            return reject(err);
          returnArray.push(resp);
          return it();
        });
      }
      it();
    });
  };

  // array clone
  Array.prototype.clone = function () {
    return this.slice(0);
  };

  // array clone deep
  Array.prototype.cloneDeep = function () {
    return JSON.parse(JSON.stringify(this));
  };


  // insert object into array, update if key matched (mutates)
  Array.prototype.upsert = function (key, newItem) {
    if (typeof newItem != 'object') return;
    var e = this.filter(i => {
      if (i[key] && i[key] == newItem[key])
        return true;
      return false;
    });
    if (e.length > 0)
      Object.assign(e[0], newItem);
    else
      this.push(newItem);
    return this;
  };

  // merge two object array, match on keys (mutates)
  Array.prototype.update = function (key, newArray) {
    // step 1 remove non existing in new, from old
    this.forEach((v, i) => {
      var inNew = newArray.filter(e => (i[key] == e[key]));
      if (inNew.length > 0) return;
      this.splice(i, 1);
    });
    // step 2 update existing array items.
    newArray.forEach(i => {
      var inOld = this.filter(e => (i[key] == e[key]));
      if (inOld.length < 1) return;
      Object.assign(inOld[0], i);
    });
  };

};
