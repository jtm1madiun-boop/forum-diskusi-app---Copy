describe('Login Flow E2E', () => {
  beforeEach(() => {
    // Kunjungi halaman utama atau halaman login
    cy.visit('http://localhost:5173/');
    
    // Jika aplikasi Anda mengharuskan klik navigasi login terlebih dahulu,
    // Anda bisa menambahkan perintah klik navigasinya di sini.
  });

  it('should display login page correctly', () => {
    cy.get('input[id="login-email"]').should('be.visible');
    cy.get('input[id="login-password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should login and navigate to homepage', () => {
    // 1. KETIK EMAIL DAN PASSWORD DULU (sebelum API di-mock)
    cy.get('input[id="login-email"]').should('be.visible').type('aliizzudin@yahoo.co.id');
    cy.get('input[id="login-password"]').should('be.visible').type('izulganteng');

    // 2. PASANG PERANGKAP MOCKING TEPAT SEBELUM KLIK LOGIN
    // Ini memastikan loading awal aplikasi tidak terganggu oleh data palsu
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 200,
      body: { status: 'success', message: 'Login success', data: { token: 'dummy-token' } },
    });
    
    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users/me', {
      statusCode: 200,
      body: { status: 'success', message: 'OK', data: { user: { id: 'user-1', name: 'Testing User', email: 'test@gmail.com', avatar: 'url' } } },
    });

    // 3. KLIK TOMBOL LOGIN
    cy.get('button').contains(/^Login$/).click();
    
    // 4. VERIFIKASI HALAMAN BERPINDAH
    cy.get('.nav-brand h1', { timeout: 10000 }).should('contain', 'Forum Diskusi');
  });
});