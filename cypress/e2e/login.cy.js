describe('Login Flow E2E', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/'); 
  });

  it('should display login page correctly', () => {
    cy.get('input[id="login-email"]').should('be.visible');
    cy.get('input[id="login-password"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
  });

  it('should login and navigate to homepage', () => {
    // 1. MOCKING API: Memalsukan balasan server agar selalu sukses
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 200,
      body: { status: 'success', message: 'Login success', data: { token: 'dummy-token' } },
    });
    
    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users/me', {
      statusCode: 200,
      body: { status: 'success', message: 'OK', data: { user: { id: 'user-1', name: 'Testing User', email: 'test@gmail.com', avatar: 'url' } } },
    });

    // 2. Ketik email & password
    cy.get('input[id="login-email"]').type('aliizzudin@yahoo.co.id');
    cy.get('input[id="login-password"]').type('izulganteng');
    
    // 3. Klik tombol login
    cy.get('button').contains(/^Login$/).click();
    
    // 4. Memastikan diarahkan ke homepage (dengan tambahan waktu tunggu jika komputer lambat)
    cy.get('.nav-brand h1', { timeout: 10000 }).should('contain', 'Forum Diskusi');
  });
});