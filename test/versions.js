var test = require('tape'),
    nock = require('nock'),
    _ = require('lodash');

var versions = require('./../lib/versions');

var fixturesVersionsHtml = './test/fixtures/testVersions.html';
var dlUrl = 'http://dl.nwjs.io/';
var expectedVersions = ['0.10.2','0.10.1','0.10.0','0.10.0-rc1','0.9.3'];

test('getLatestVersion', function (t) {
    t.plan(1);

    nock(dlUrl).get('/').replyWithFile(200, fixturesVersionsHtml);
    versions.getLatestVersion(dlUrl).then(function(result){
        t.equal(result, expectedVersions[0]);
    });
});

test('getVersions', function (t) {
    t.plan(1);

    nock(dlUrl).get('/').replyWithFile(200, fixturesVersionsHtml);
    versions.getVersions(dlUrl).then(function(result){
        t.deepEqual(result, expectedVersions);
    });
});


test('getVersionNames', function (t) {
    t.plan(2);

    var v = '0.8.4';
    var expected = {
        linux32: 'v'+v+'/nwjs-v'+v+'-linux-ia32.tar.gz',
        linux64: 'v'+v+'/nwjs-v'+v+'-linux-x64.tar.gz',
        osx32: 'v'+v+'/nwjs-v'+v+'-osx-ia32.zip',
        osx64: 'v'+v+'/nwjs-v'+v+'-osx-x64.zip',
        win32: 'v'+v+'/nwjs-v'+v+'-win-ia32.zip',
        win64: 'v'+v+'/nwjs-v'+v+'-win-x64.zip',

    };

    var names = versions.getVersionNames(v);
    t.equal( names.version, v );
    t.deepEqual(names.platforms, expected);
});
