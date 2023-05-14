import Chance from 'chance';

const chance = new Chance();

let randomNumber = '532200' + Math.floor(1000 + Math.random() * 9000);
let randomMail = chance.email({domain: 'example.com'});
let randomName = chance.name();
let randomSurname = chance.last();

describe('Citlekci.com.tr - Üye Kayıt Kontrolü', () => {
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

        cy.on('uncaught:exception', (err, runnable) => {
            if (err.message.includes("Cannot read properties of undefined (reading 'init')")) {
              return false;
            }
            // undefined hatası almakta. Onu elimine etmek için uncaught exception ekledim.
            return true;
          });

        cy.viewport('macbook-16');
        // cy.blockAnalytics(); // Opsiyonel
        if (Cypress.$('#setrow-push-popup-cancel-button').length) {
          cy.get('#setrow-push-popup-cancel-button').should('be.visible').click()
        } else {
          console.log('Popup mevcut değil')
        }
      });   

    it('Üye Giriş ve Kayıt anasayfada mevcut mu? Gözüküyor mu?', () => {
        cy.visit('https://www.citlekci.com.tr/');
        cy.get('a[title="Hesabım"]')
        .should('exist')
        .should('be.visible')
    });
    it('Üye Kayıt Formu - Yanlış girdiler denemesi. | Hiç bir veri doğru değil.', () => {
       cy.visit('https://www.citlekci.com.tr/UyeGiris')
       cy.get('#txtQuickName')
       .type(". {enter}")
       cy.get('#txtQuickLastName')
       .type(". {enter}")
       cy.get('#txtQuickEmail')
       .type(". {enter}")
       cy.contains('span', 'Lütfen E-posta Adresinizi Kontrol Ediniz.')
        .should("exist")
        .should("be.visible")
       cy.get('#txtQuickPass')
       .type(". {enter}")
       cy.contains('span', 'Şifreniz 6-50 karakter arası uzunlukta olmalıdır.')
       .should("exist")
       .should("be.visible")
       cy.contains('span', 'Lütfen Cep Telefonu Numaranızı Giriniz.')
       .should("exist")
       .should("be.visible")
       cy.wait(1000)
       cy.get('#chkMailPermission')
       .check()
       cy.get('#chkSmsPermission')
       .check()
       cy.get('#chkSozlesme')
       .check()
       cy.get('.userRightBox > .userLoginBtn').click()
    });
    it('Üye Kayıt Formu - Yanlış girdiler 2. deneme. | Farklı Numara ve Email Kayıtlı', () => {
        cy.visit('https://www.citlekci.com.tr/UyeGiris')
        console.log(randomNumber)
        cy.get('#txtQuickName')
        .type(". {enter}")
        cy.get('#txtQuickLastName')
        .type(". {enter}")
        cy.get('#txtQuickEmail')
        .type("rulirit.nopalon@gotgel.org {enter}")
        cy.get('#txtQuickPass')
        .type("n6uo5vNztooxtH{enter}")
        cy.get('#txtQuickTel')
        .type(randomNumber)
        cy.wait(1000)
        cy.get('#chkMailPermission')
        .check()
        cy.get('#chkSmsPermission')
        .check()
        cy.get('#chkSozlesme')
        .check()
        cy.get('#kayitliKullanici')
        .should('exist')
        .should("be.visible")
        cy.get('.userRightBox > .userLoginBtn').click()

    });
    it('Üye Kayıt Formu Yanlış girdiler 3. deneme. | Doğru Numara ve Email Yok ', () => {
        cy.visit('https://www.citlekci.com.tr/UyeGiris')
        console.log(randomNumber)
        cy.get('#txtQuickName')
        .type(". {enter}")
        cy.get('#txtQuickLastName')
        .type(". {enter}")
        cy.get('#txtQuickEmail')
        .type("{enter}")
        cy.contains('span', 'Lütfen E-posta Adresinizi Kontrol Ediniz.')
        .should("exist")
        .should("be.visible")
        cy.get('#txtQuickPass')
        .type("n6uo5vNztooxtH{enter}")
        cy.get('#txtQuickTel')
        .type(randomNumber)
        cy.wait(1000)
        cy.get('#chkMailPermission')
        .check()
        cy.get('#chkSmsPermission')
        .check()
        cy.get('#chkSozlesme')
        .check()
        cy.get('.userRightBox > .userLoginBtn').click()
    });

    it('Üye Kayıt Formu Yanlış girdiler 3. deneme. | Ad Soyad ve Numara Doğru. Mail yanlış. ', () => {
        cy.visit('https://www.citlekci.com.tr/UyeGiris')
        console.log(randomNumber)
        console.log(randomName)
        console.log(randomSurname)
        console.log(randomMail)
        cy.get('#txtQuickName')
        .type(randomName)
        cy.get('#txtQuickLastName')
        .type(randomSurname)
        cy.get('#txtQuickEmail')
        .type(randomMail)
        cy.contains('span', 'Lütfen E-posta Adresinizi Kontrol Ediniz.')
        .should("exist")
        .should("be.visible")
        cy.get('#txtQuickPass')
        .type("n6uo5vNztooxtH{enter}")
        cy.get('#txtQuickTel')
        .type(randomNumber)
        cy.wait(1000)
        cy.get('#chkMailPermission')
        .check()
        cy.get('#chkSmsPermission')
        .check()
        cy.get('#chkSozlesme')
        .check()
        cy.get('.userRightBox > .userLoginBtn').click()
    });
})