var test      = require('tape');
var createURI = require("../index");

test('valid URI', function (t) {
  var rslt = createURI("/path/{id}", {
    id: "badger&snake"
  });

  t.equal(rslt, "/path/badger&snake");
  t.end();
});

test('valid URI with params', function (t) {
  var rslt = createURI("/path/{id}", {
    id: "badger&snake",
    index: 3,
    ref: "mushroom&mushroom"
  });

  t.equal(rslt, "/path/badger&snake?index=3&ref=mushroom%26mushroom");
  t.end();
});

test('valid URI with fragment', function (t) {
  var rslt = createURI("/path/{id}#section-{sectionNum}", {
    id: "badger&snake",
    index: 3,
    ref: "mushroom&mushroom",
    sectionNum: 1
  });

  t.equal(rslt, "/path/badger&snake?index=3&ref=mushroom%26mushroom#section-1");
  t.end();
});

test('valid URI with existing params', function (t) {
  var rslt = createURI("/path/{id}?num=3#section-{sectionNum}", {
    id: "badger&snake",
    index: 3,
    ref: "mushroom&mushroom",
    sectionNum: 1
  });

  t.equal(rslt, "/path/badger&snake?num=3&index=3&ref=mushroom%26mushroom#section-1");
  t.end();
});

test('return null when invalid', function (t) {
  var rslt = createURI("/path/{id}", {});

  t.notOk(rslt);
  t.end();
});
