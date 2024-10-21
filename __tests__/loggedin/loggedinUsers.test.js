// __tests__/index.test.js
import { fetchAppData } from '../../src/utility'; // Import the function to mock
import { initialize,setUp } from '../../src/index'; // Import the function that uses fetchAppData

// Mock the module
jest.mock('../../src/utility', () => ({
  fetchAppData: jest.fn(), // Mock the fetchAppData function
}));

describe('My logged in tests', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
    document.body.innerHTML = ''; // Clear the body to simulate a fresh DOM
  
  });
  
  setUp("app1_acm_true_tenant5","dGVuYW50NV9fU0VQUkFUT1JfX2FwcDFfYWNtX3RydWVfdGVuYW50NQ==")
  
 
  
  test('should display correct content in chat modal [open]', async() => {
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
    localStorage.setItem('tezkit_app_data', JSON.stringify({
    "app_id": "PMIQkW2NH2",
    "auth_key": "dGVuYW50NV9fU0VQUkFUT1JfX2FwcDFfYWNtX3RydWVfdGVuYW50NQ==",
    "settings": {
        "authCloudManaged": true,
        "requestCloudManaged": null,
        "app_type": "p2a"
    },
    "role": "Owner",
    "tenant_id": "tenant5",
    "timestamp": 1729163177,
    "app_name": "app1_acm_true_tenant5",
    "beta_toggle": {
        "admin": {
            "live_status": true
        },
        "consumer": {
            "live_status": false
        }
    },
    "region": "IN"
}));


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
  
  test('should display correct content in chat modal [close Todo]', async() => {
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
    localStorage.setItem('tezkit_app_data', JSON.stringify({
    "app_id": "PMIQkW2NH2",
    "auth_key": "dGVuYW50NV9fU0VQUkFUT1JfX2FwcDFfYWNtX3RydWVfdGVuYW50NQ==",
    "settings": {
        "authCloudManaged": true,
        "requestCloudManaged": null,
        "app_type": "p2a"
    },
    "role": "Owner",
    "tenant_id": "tenant5",
    "timestamp": 1729163177,
    "app_name": "app1_acm_true_tenant5",
    "beta_toggle": {
        "admin": {
            "live_status": true
        },
        "consumer": {
            "live_status": false
        }
    },
    "region": "IN"
}));


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

  
  test('should render chat opener when a user is logged in', () => {
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

    // Call initialize function which should render the chat opener
    initialize(loggedInUser);

    // Assert that the chat opener is added to the DOM
    const chatOpener = document.getElementById('chat_modal_opener');
    expect(chatOpener).not.toBeNull();
  });

  test('should initially minimize the chat modal', () => {
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

    // Call initialize function which should render the chat modal
    initialize(loggedInUser);

    // Assert initial style of chat modal
    const chatModal = document.getElementById('chatModal');
    expect(chatModal).not.toBeNull();
    const initialDisplayStyle = chatModal.style.display;
    expect(initialDisplayStyle === 'none' || initialDisplayStyle === '').toBe(true);
  });

  test('should display chat modal when chat opener is clicked', () => {
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

    // Call initialize function which should render the chat opener and modal
    initialize(loggedInUser);

    // Simulate interaction to open chat modal
    const chatOpener = document.getElementById('chat_modal_opener');
    const fa_icon = chatOpener.firstChild
    fa_icon.click(); // Trigger click event

    // Re-fetch the chat_modal element after interaction
    const updatedChatModal = document.getElementById('chatModal');
    const updatedDisplayStyle = updatedChatModal.style.display;
    expect(updatedDisplayStyle).toBe('block');
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
    localStorage.setItem('tezkit_app_data', JSON.stringify({
    "app_id": "PMIQkW2NH2",
    "auth_key": "dGVuYW50NV9fU0VQUkFUT1JfX2FwcDFfYWNtX3RydWVfdGVuYW50NQ==",
    "settings": {
        "authCloudManaged": true,
        "requestCloudManaged": null,
        "app_type": "p2a"
    },
    "role": "Owner",
    "tenant_id": "tenant5",
    "timestamp": 1729163177,
    "app_name": "app1_acm_true_tenant5",
    "beta_toggle": {
        "admin": {
            "live_status": true
        },
        "consumer": {
            "live_status": false
        }
    },
    "region": "IN"
}));


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

  

  test('should add message to chat body when send button is clicked', () => {
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
  
    // Call initialize function which should render the chat opener and modal
    initialize(loggedInUser);
  
    // Simulate interaction to open chat modal
    const chatOpener = document.getElementById('chat_modal_opener');
    const fa_icon = chatOpener.firstChild;
    fa_icon.click(); // Trigger click event
  
    // Re-fetch the chat_modal element after interaction
    const chatModal = document.getElementById('chatModal');
    expect(chatModal).not.toBeNull();
  
    // Type a message into the input box
    const chatInput = chatModal.querySelector('#chatInput');
    const message = 'Hello, this is a test message!';
    chatInput.value = message;
  
    // Click the send button
    const sendButton = chatModal.querySelector('#sendButton');
    sendButton.click(); // Trigger click event
  
    // Check that the message was added to the chat body
    const chatBody = chatModal.querySelector('#chatBody');
    const chatMessages = chatBody.querySelectorAll('div'); // Assuming each message is wrapped in a <div>
  
    // Verify that the latest message is present in the chat body
    expect(chatBody.children).toHaveLength(1); // Assuming only one message is present
    expect(chatMessages[0].textContent).toContain(message);
  });
  

});



