describe('then app', function() {
  it('should create a shark', function() {
    browser.get('http://localhost:5000');
    element(by.model('shark.name')).sendKeys('test shark');
    element(by.model('shark.preyPreference')).sendKeys('tests');
    element(by.css('.shark .btn-create')).click();
    element(by.css('#sharklist li:first-child')).getText(function(text) {
      expect(text).toEqual('test shark is a shark with a speed of 60 who likes tests');
    });
  });
  it('should cancel an update of a shark', function() {
    browser.get('http://localhost:5000');
    element(by.css('#sharklist li:first-child')).element(by.css('.shark .btn-edit')).click();
    element(by.model('shark.name')).clear().sendKeys('edited shark');
    element(by.model('shark.speed')).clear().sendKeys('edited speed');
    element(by.model('shark.preyPreference')).clear().sendKeys('edited prey');
    element(by.css('.shark .btn-cancel')).click();
    element(by.css('#sharklist li:first-child')).getText(function(text) {
      expect(text).toEqual('test shark is a shark with a speed of 60 who likes tests');
    });
  });
  it('should update a shark', function() {
    browser.get('http://localhost:5000');
    element(by.css('#sharklist li:first-child')).element(by.css('.shark .btn-edit')).click();
    element(by.model('shark.name')).clear().sendKeys('edited shark');
    element(by.model('shark.speed')).clear().sendKeys('edited speed');
    element(by.model('shark.preyPreference')).clear().sendKeys('edited prey');
    element(by.css('.shark .btn-update')).click();
    element(by.css('#sharklist li:first-child')).getText(function(text) {
      expect(text)
      .toEqual('edited shark is a shark with a speed of edited speed who likes edited prey');
    });
  });
  it('should delete a shark', function() {
    browser.get('http://localhost:5000');
    element(by.css('#sharklist li:first-child')).element(by.css('.shark .btn-delete')).click();
    element(by.css('#sharklist')).getText(function(text) {
      expect(text).toEqual(null);
    });
  });
  it('should create a prey', function() {
    browser.get('http://localhost:5000');
    element(by.model('prey.name')).sendKeys('test prey');
    element(by.model('prey.speed')).sendKeys('test speed');
    element(by.css('.prey  .btn-create')).click();
    element(by.css('#preylist li:first-child')).getText(function(text) {
      expect(text).toEqual('test prey has a speed of test speed');
    });
  });
  it('should cancel an update of a prey', function() {
    browser.get('http://localhost:5000');
    element(by.css('#preylist li:first-child')).element(by.css('.prey .btn-edit')).click();
    element(by.model('prey.name')).clear().sendKeys('edited prey');
    element(by.model('prey.speed')).clear().sendKeys('edited speed');
    element(by.css('.prey .btn-cancel')).click();
    element(by.css('#preylist li:first-child')).getText(function(text) {
      expect(text).toEqual('test prey has a speed of test speed');
    });
  });
  it('should update a prey', function() {
    browser.get('http://localhost:5000');
    element(by.css('#preylist li:first-child')).element(by.css('.prey .btn-edit')).click();
    element(by.model('prey.name')).clear().sendKeys('edited prey');
    element(by.model('prey.speed')).clear().sendKeys('edited speed');
    element(by.css('.prey .btn-update')).click();
    element(by.css('#preylist li:first-child')).getText(function(text) {
      expect(text)
      .toEqual('edited prey has a speed of edited speed');
    });
  });
  it('should kill a prey', function() {
    browser.get('http://localhost:5000');
    element(by.css('#preylist li:first-child')).element(by.css('.prey .btn-delete')).click();
    element(by.css('#preylist')).getText(function(text) {
      expect(text).toEqual(null);
    });
  });
});
