import { fetchAppData } from '../../../src/utility'; // Import the function to mock
// import { initialize, global_bucket, handleMsgUpdatedEvent } from '../src/index'; // Adjust the import path
import * as index from '../../../src/index';  // Import the entire module

// Mock the module
jest.mock('../../../src/utility', () => ({
  fetchAppData: jest.fn(), // Mock the fetchAppData function
}));




import io from "socket.io-client";

// jest.spyOn(index, 'handleMsgUpdatedEvent').mockImplementation(() => {});

// Now move jest.spyOn() outside of jest.mock()

// Mock the socket object returned by io()
jest.mock('socket.io-client', () => {
  const actualSocket = jest.requireActual('socket.io-client')();
  const mSocket = {
    ...actualSocket,
    emit: jest.fn((event, ...args) => {
      console.log(`emit called with emit event: ${event}, args:`, args);
      // actualSocket.emit(event, ...args); // Optionally call the real implementation if needed
    }),
    on: jest.fn((event, callback) => {
      console.log(`.on called with on event: ${event}, callback:`, callback);

      // Store the callback if it's not ON_MESSAGE_ARRIVAL_BOT
      mSocket[event] = callback;
      
      if (event === 'ON_MESSAGE_ARRIVAL_BOT') {
        actualSocket.on(event, callback);
      }
      
      if (event === 'ON_MESSAGE_STATUS_CHANGED') {
        console.log("aerweqrwer")

        actualSocket.on(event, callback);
      }
      else {
        // You can also add logging here if needed
        console.log(`on called with elseCase: ${event}`);
      }
    }),
  };
  return jest.fn(() => mSocket); // io() returns the mocked socket object
});




describe('Socket Tests2 when window is open', () => {

  beforeEach(() => {
    jest.clearAllMocks(); // Clears the call history and reset mock implementations
  });

  // Reset global_bucket state after each test
  afterEach(() => {
    index.global_bucket.unread_msgs = []; // Resetting the global bucket state
  });

  index.setUp("app1_acm_true_tenant5","dGVuYW50NV9fU0VQUkFUT1JfX2FwcDFfYWNtX3RydWVfdGVuYW50NQ==")

  
  test('If chat_modal is OPEN :: if message is recieved it should go to CHAT_BODY',async() => {
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


    // Call initialize function with loggedInUser
    await index.initialize(loggedInUser);



     
 
 

    // Get the mock socket instance
    const mockSocket = io();


    
    // Verify that socket.emit was called with the correct arguments
    const expectedPayload = { room: 'global_for__2' }; // Adjust as needed
    expect(mockSocket.emit).toHaveBeenCalledTimes(1);
    expect(mockSocket.emit).toHaveBeenCalledWith('join_room', expectedPayload);





    // Example of manually triggering the 'ON_MESSAGE_ARRIVAL_BOT' event
    if (mockSocket['ON_MESSAGE_ARRIVAL_BOT']) {
      const payload = {
        "message": {
          "msg_id": "msg_id__1",
          "message": "sdfsadf",
          "status": "SENT",
          "timestamp": "23:30:21",
          "to_user": {
            "user": "user2user"
          },
          "frm_id": "1"
        }
      };
      // expect(index.global_bucket.unread_msgs).toHaveLength(0);


      const chatOpener = document.getElementById('chat_modal_opener');
      const fa_icon = chatOpener.firstChild;
      fa_icon.click(); // Trigger click event



      const chatBody1 = document.getElementById('chatBody');
      console.log("waewrewsdafsdf", chatBody1.children.length)

      expect(chatBody1.children.length).toEqual(0)
      mockSocket['ON_MESSAGE_ARRIVAL_BOT'](JSON.stringify(payload));
      expect(mockSocket.emit).toHaveBeenCalledTimes(3);

      //all five major listeners are on
      expect(mockSocket.on).toHaveBeenCalledTimes(5);
      expect(chatBody1.children.length).toEqual(1)


      
      
    }

    
      
  });
});
