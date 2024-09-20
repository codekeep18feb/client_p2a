import { initialize, global_bucket } from '../src/index'; // Adjust the import path
import io from "socket.io-client";

// Mock the socket object returned by io()
jest.mock('socket.io-client', () => {
  const actualSocket = jest.requireActual('socket.io-client')();
  const mSocket = {
    ...actualSocket,
    emit: jest.fn((event, ...args) => {
      console.log(`emit called with event: ${event}, args:`, args);
      // actualSocket.emit(event, ...args); // Optionally call the real implementation if needed
    }),
    on: jest.fn((event, callback) => {
      // Store the callback if it's not ON_MESSAGE_ARRIVAL_BOT
      mSocket[event] = callback;
      
      if (event === 'ON_MESSAGE_ARRIVAL_BOT') {
        actualSocket.on(event, callback);
      } else {
        // You can also add logging here if needed
        console.log(`on called with event: ${event}`);
      }
    }),
  };
  return jest.fn(() => mSocket); // io() returns the mocked socket object
});


describe('Socket Tests', () => {

  beforeEach(() => {
    jest.clearAllMocks(); // Clears the call history and reset mock implementations
  });

  // Reset global_bucket state after each test
  afterEach(() => {
    global_bucket.unread_msgs = []; // Resetting the global bucket state
  });


  test('If chat_modal is closed :: if message is recieved it should store in the global_bucket', () => {
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

    // Call initialize function with loggedInUser
    initialize(loggedInUser);

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
          "assigned_msg_id": "msg_id__1",
          "message": "sdfsadf",
          "status": "SENT",
          "timestamp": "23:30:21",
          "to_user": {
            "user": "user2user"
          },
          "frm_id": "1"
        }
      };
      mockSocket['ON_MESSAGE_ARRIVAL_BOT'](JSON.stringify(payload));
      expect(mockSocket.emit).toHaveBeenCalledTimes(3);


      expect(global_bucket.unread_msgs).toHaveLength(1);


      //**************  WE CAN EXTEND IT FUTHER TO SEE IF THE MESSAGES REACHED TO THE DESIRED WINDOW?????****************** */




    }
  });
});


describe('Socket Tests2', () => {

  beforeEach(() => {
    jest.clearAllMocks(); // Clears the call history and reset mock implementations
  });

  // Reset global_bucket state after each test
  afterEach(() => {
    global_bucket.unread_msgs = []; // Resetting the global bucket state
  });

  
  test('If chat_modal is OPEN :: if message is recieved it should go to CHAT_BODY', () => {
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

    // Call initialize function with loggedInUser
    initialize(loggedInUser);

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
          "assigned_msg_id": "msg_id__1",
          "message": "sdfsadf",
          "status": "SENT",
          "timestamp": "23:30:21",
          "to_user": {
            "user": "user2user"
          },
          "frm_id": "1"
        }
      };
      mockSocket['ON_MESSAGE_ARRIVAL_BOT'](JSON.stringify(payload));
      expect(mockSocket.emit).toHaveBeenCalledTimes(3);


      expect(global_bucket.unread_msgs).toHaveLength(1);
      const chat_modal_opener = document.getElementById("chat_modal_opener");
      console.log("wahsdfs sadfjsdaf is open?",chat_modal_opener.style.display)

    }
  });
});
