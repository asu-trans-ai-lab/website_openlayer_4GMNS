var LNK = new require('./../lnk.js'); 
var path = require('path'); 
var faker = require('faker');
require('should');
var lnk = new LNK();


var mockupEntry = function() {
	return {
		name : faker.name.findName(),
		email: faker.internet.email()
		//card: faker.helpers.createCard()
	}
}

var mockup = function(count) {
	var data = [];
	for (var i = 0; i < count; i++) {
		data.push(mockupEntry());
	}
	return data;
}


var sampleConfigs = mockup(10);
var encryptedSampleConfig;

describe('encrypt / decrypt', function(){

    it('should fail to encrypt', function(){
		(function(){
			lnk.encrypt(mockup(100)).should.throw();
		}).should.throw();
  	});

    it('should encrypt JSON to URIComponent', function(){
		encryptedSampleConfig = lnk.encrypt(sampleConfigs);
		encryptedSampleConfig.length.should.be.above(0);
  	});

    it('should decrypt URIComponent to JSON', function(){
		var json = lnk.decrypt(encryptedSampleConfig);
		for (var i = 0; i < json.length; i++) {
			var item = json[i];
			item.name.should.be.equal(sampleConfigs[i].name);
			item.email.should.be.equal(sampleConfigs[i].email);
		}
  	});

});