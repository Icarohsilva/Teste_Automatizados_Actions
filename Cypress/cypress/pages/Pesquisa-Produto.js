class SearchResultsPage {
  elements = {
    pageTitle: () => cy.get('h1[class*="SearchTerm_searchTerm"]'),
    firstProduct: () => cy.get('div[class*="ProductCard_productCard"]').first(),
    priceFilterCheckbox: (value) =>
      cy.get(`input[type="checkbox"][value="${value}"]`).parent('label'),
  };

  selectFirstProduct() {
    this.elements.firstProduct().click();
  }

  applyPriceFilter(filterValue = '0-25') {
    this.elements.priceFilterCheckbox(filterValue).click();
    // Aguarda a recarga dos produtos
    cy.get('div[class*="ProductGrid_grid"]', { timeout: 15000 }).should('be.visible');
  }

}

export default new SearchResultsPage();
