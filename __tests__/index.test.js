// __tests__/index.test.js
import { fetchAppData } from '../src/utility'; // Import the function to mock
import { initialize,setUp } from '../src/index'; // Import the function that uses fetchAppData

// Mock the module
jest.mock('../src/utility', () => ({
  fetchAppData: jest.fn(), // Mock the fetchAppData function
}));

describe('My tests', () => {
  beforeEach(() => {
    document.body.innerHTML = ''; // Clear the body to simulate a fresh DOM
    jest.clearAllMocks(); // Clear all mocks before each test
    setUp("app1_acm_true_tenant5","dGVuYW50NV9fU0VQUkFUT1JfX2FwcDFfYWNtX3RydWVfdGVuYW50NQ==")
  
  });
  
  
  
    test('should display correct content in chat modal', async() => {
      // Mock loggedInUser to simulate a logged-in state
      const loggedInUser = {
        tenant: 'tenant1',
        password: 'passmenow',
        role: 65536,
        app_name: 'MYnewapp33',
        timestamp: '2024-08-17 18:00:05',
        full_name: 'user2user',
        is_online: true,
        email: 'u2@gmail.com',
        id: '2',
        phone: '919999999999',
        gender: 'Male',
        type: 'user_type',
      };
    
      localStorage.setItem('tezkit_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb20uemFsYW5kby5jb25uZXhpb24iLCJpYXQiOjE3MjE4Mjk5MTAsImV4cCI6MTcyNzgyOTkxMCwidXNlcl9pZCI6IjMiLCJ1c2VyX3R5cGUiOiJvdGhlciIsImVtYWlsIjoidTJAZ21haWwuY29tIiwidGVuYW50X2FjY291bnRfbmFtZSI6InRlbmFudDEiLCJyb2xlX3BvbGljeSI6Ilt7XCJyb2xlXCI6IDY1NTM2LjAsIFwiYXBwX25hbWVcIjogXCJteW5ld2FwcDJcIn1dIn0.QmhuPBHKFO37BnVJDDtTYd013NoObA_ZI-ppio3NT8o');  
      localStorage.setItem('tezkit_app_data', JSON.stringify({"app_id":"NDNxXp0K8i","auth_key":"dGVuYW50NV9fU0VQUkFUT1JfX2FwcDFfYWNtX3RydWVfdGVuYW50NQ==","settings":{"authCloudManaged":true,"requestCloudManaged":null,"app_type":"p2a"},"role":"Owner","tenant_id":"tenant5","timestamp":1728500149,"app_name":"app1_acm_true_tenant5","region":"IN"}));
  
  
      // Call initialize function which should render the chat opener and modal
      await initialize(loggedInUser);
    
      // Simulate interaction to open chat modal
      const chatOpener = document.getElementById('chat_modal_opener');
      const fa_icon = chatOpener.firstChild;
      fa_icon.click(); // Trigger click event
    
      // Re-fetch the chat_modal element after interaction
      const chatModal = document.getElementById('chatModal');
      expect(chatModal).not.toBeNull();
    
      // Verify content inside chat modal
      const chatHeader = chatModal.querySelector('.chat_header');
      console.log("whaewirwerchatHeader",chatHeader.innerHTML)
      expect(chatHeader).not.toBeNull();
      
      const loginMessage = chatHeader.querySelector('#loginMessage');
      expect(loginMessage).not.toBeNull();
      console.log("whati siddf",loginMessage.textContent)
      expect(loginMessage.textContent).toBe('user2user');
    
      const statusElement = chatHeader.querySelector('#statusElement');
      expect(statusElement).not.toBeNull();
      expect(statusElement.style.background).toBe('rgb(169, 155, 190)'); // Adjust according to the actual color
    
      const closeButton = chatHeader.querySelector('#close-btn');
      expect(closeButton).not.toBeNull();
      expect(closeButton.textContent).toBe('Close');
    
      const chatBody = chatModal.querySelector('#chatBody');
      expect(chatBody).not.toBeNull();
    
      const chatInput = chatModal.querySelector('#chatInput');
      expect(chatInput).not.toBeNull();
      expect(chatInput.placeholder).toBe('Type here...');
    
      const sendButton = chatModal.querySelector('#sendButton');
      expect(sendButton).not.toBeNull();
      expect(sendButton.textContent).toBe('Send');
    });
});
