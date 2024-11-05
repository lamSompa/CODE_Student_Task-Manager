// Test to check if Jest is working
test('Example test', () => {
    expect(true).toBe(true);
  });
  
  // To test DOM manipulation, consider using a library like JSDOM
  const { JSDOM } = require('jsdom');
  
  describe('DOM Manipulation', () => {
    let document;
  
    beforeEach(() => {
      const dom = new JSDOM(`<!DOCTYPE html><body><div id="menu-icon"></div><div id="dropdown"></div></body>`);
      document = dom.window.document;
    });
  
    it('should toggle dropdown visibility', () => {
      const menuIcon = document.getElementById('menu-icon');
      const dropdown = document.getElementById('dropdown');
      menuIcon.click();
      expect(dropdown.classList.contains('active')).toBe(true);
    });
  });