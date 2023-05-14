require('cypress-xpath')

describe('citlekci.com.tr - QA - Anasayfa Testi', () => {
    beforeEach(() => {
      cy.on('uncaught:exception', (err, runnable) => {
        if (err.message.includes('Script error')) {
          return false;
        }
        // Crossorigin hatası almakta. Onu elimine etmek için uncaught exception ekledim.
        return true;
      });

      cy.on('uncaught:exception', (err, runnable) => {
        if (err.message.includes('getMail')) {
          return false;
        }
        // getMail hatası almakta. Onu elimine etmek için uncaught exception ekledim.
        return true;
      });
      cy.reload()
      cy.viewport('macbook-16');
      cy.visit('https://www.citlekci.com.tr/');
      // cy.blockAnalytics(); // Opsiyonel
      if (Cypress.$('#setrow-push-popup-cancel-button').length) {
        cy.get('#setrow-push-popup-cancel-button').should('be.visible').click()
      } else {
        console.log('Popup mevcut değil')
      }
    });   

  
    it('Title & URL Kontrolu', () => {
      cy.title().should('contain', 'Çitlekçi Kuruyemiş'); // Title doğru mu?
      cy.url().should('eq', 'https://www.citlekci.com.tr/'); // Başka yere yönlendiriyor mu? Https çalışıyor mu?
    });

  
  it('Banner var mı? Gözüküyor mu? Resimler mevcut mu?', () => {
     cy.get('.flex-active-slide > a > img')
     .should('exist')
     .should('be.visible')
  });
  it('Banner ileriye gidiyor mu?', () => {
    for (let i = 0; i < 6; i++) {
      cy.get('.flex-next').click()
      cy.wait(1000)
    }
  });
  it('Banner geriye gidiyor mu?', () => {
    for (let i = 0; i < 6; i++) {
      cy.get('.flex-prev').click()
      cy.wait(1000)
    }
  });
  it('Header Top var mı? Gözüküyor mu? Yönlendirmeler doğru mu?', () => {
    cy.get('.htop > .ticiContainer')
    cy.get('a[href="/magazalarimiz"]')
    .should("exist")
    .should("be.visible")
    cy.get('a[href="/hakkimizda"]')
    .should("exist")
    .should("be.visible")
    cy.get('a[href="/siparistakip.aspx#/Hesabim-Anasayfa"]')
    .should("exist")
    .should("be.visible")
  });
  it('Navigasyon Menüsü var mı? Gözüküyor mu?', () => {
    // Çalışan şey çalışmamaya başladı. Buglı.
    cy.get('.navigation')
    .should("exist")
    .should("be.visible")
  });
  it('Üye Giriş var mı? Gözüküyor mu?', () => {
  cy.wait(1000)
  cy.get('a[title="Hesabım"]')
  .should("exist")
  .should("be.visible")
  cy.get('.headerUyeGiris > a')
  .should("exist")
  .should("be.visible")
  });
  
  it('Ürün Listesi var mı? Gözüküyor mu?', () => {
    cy.get(".ProductList")
    .should("exist")
    .should("be.visible")
    cy.get(".discountPrice")
    .should("exist")
    .should("be.visible")
  });

});
