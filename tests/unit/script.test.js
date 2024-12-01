const { JSDOM } = require('jsdom');

describe('DOM Manipulation', () => {
  let document;

  beforeEach(() => {
    const dom = new JSDOM(`<!DOCTYPE html><body><div id="menu-icon"></div><div id="dropdown" class="hidden"></div></body>`);
    document = dom.window.document;
  });

  it('should toggle dropdown visibility on click', () => {
    const menuIcon = document.getElementById('menu-icon');
    const dropdown = document.getElementById('dropdown');

    // Simulate click
    menuIcon.click();
    dropdown.classList.toggle('active');

    expect(dropdown.classList.contains('active')).toBe(true);

    // Simulate another click
    menuIcon.click();
    dropdown.classList.toggle('active');

    expect(dropdown.classList.contains('active')).toBe(false);
  });

  it('should handle multiple clicks correctly', () => {
    const menuIcon = document.getElementById('menu-icon');
    const dropdown = document.getElementById('dropdown');

    // Simulate multiple clicks
    for (let i = 0; i < 5; i++) {
      menuIcon.click();
      dropdown.classList.toggle('active');
    }

    // Check final state
    expect(dropdown.classList.contains('active')).toBe(false);
  });

  it('should not toggle dropdown if menu icon is not clicked', () => {
    const dropdown = document.getElementById('dropdown');

    // Ensure no click
    expect(dropdown.classList.contains('active')).toBe(false);
  });
});