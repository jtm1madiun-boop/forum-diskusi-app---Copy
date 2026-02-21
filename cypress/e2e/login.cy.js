describe('Login Flow E2E', () => {
  beforeEach(() => {
    // Aplikasi berjalan di port ini
    cy.visit('http://localhost:5173/'); 
  });

  it('should display login page correctly', () => {
    // Memastikan elemen form ada di layar
    cy.get('input[id="login-email"]').should('be.visible');
    cy.get('input[id="login-password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should login and navigate to homepage', () => {
    // 1. Ketik email (gunakan akun testing yang ada atau buat baru dari API Dicoding)
    cy.get('input[id="login-email"]').type('aliizzudin@yahoo.co.id');
    
    // 2. Ketik password
    cy.get('input[id="login-password"]').type('izulganteng');
    
    // 3. Klik tombol login
    cy.get('button').contains(/^Login$/).click();
    
    // 4. Memastikan diarahkan ke homepage (cek apakah tombol Buat Diskusi Baru muncul)
    cy.get('.nav-brand h1').should('contain', 'Forum Diskusi');
    cy.get('button').contains('Buat Thread').should('be.visible');
  });
});