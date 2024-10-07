// console.log("can we see global variables",aaaa);
// import io from 'socket.io'; // Add this line if missing

// Import the CSS file
import "./style.css";
import io from 'socket.io-client';
import myImage from "./tezkit_logo.jpg";


// const APP_NAME = "app1_t2" // this should technically be fetched by credentials??

let global_bucket = { unread_msgs: [] };
export { global_bucket };

const identifiers = {}


let chat_modal_open = false
export { chat_modal_open };


function incrementNotificationsCount() {
  const notification_num_div = document.getElementById("notification_num");
      notification_num_div.textContent =
        Number(notification_num_div.textContent) + 1;
}


// Function to change the background color of the body
export function changeBackgroundColor() {
  const colors = ["#FF5733", "#33FF57", "#5733FF", "#33B5E5", "#FFC300"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
}

// Function to render the customized component
export function renderCustomizeComponent() {
  // Create the full-screen div
  const fullScreenDiv = document.createElement("div");
  fullScreenDiv.classList.add("full-screen-div");

  // Create the left part
  const leftPart = document.createElement("div");
  leftPart.classList.add("left-part");
  leftPart.style.width = "25%"; // Set left part width
  leftPart.style.height = "100%"; // Set left part height
  leftPart.style.backgroundColor = "white"; // Set left part background color
  leftPart.style.border = "3px solid grey"; // Set left part background color
  leftPart.style.float = "left"; // Float left for side-by-side layout
  leftPart.style.padding = "10px"; // Optional padding

  // Title input
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Form Title:";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.placeholder = "Enter form title";
  // titleInput.style.width = '100%';
  titleInput.style.padding = "10px";
  titleInput.style.marginBottom = "10px";
  titleLabel.appendChild(titleInput);
  leftPart.appendChild(titleLabel);

  // Create form preview button
  const createFormPreviewButton = document.createElement("button");
  createFormPreviewButton.textContent = "Create Form Preview";
  createFormPreviewButton.style.width = "50%";
  createFormPreviewButton.style.padding = "10px";
  createFormPreviewButton.style.marginTop = "10px";
  createFormPreviewButton.style.backgroundColor = "#2196F3";
  createFormPreviewButton.style.color = "white";
  createFormPreviewButton.style.border = "none";
  createFormPreviewButton.style.borderRadius = "3px";
  createFormPreviewButton.addEventListener("click", () => {
    const newTitle = titleInput.value.trim();
    exampleConfig.form.title = newTitle || "Form Title"; // Update form title
    const dynamicForm = createDynamicForm(exampleConfig, handleLogin);
    rightPart.innerHTML = ""; // Clear existing preview
    rightPart.appendChild(dynamicForm); // Render new form preview
  });
  leftPart.appendChild(createFormPreviewButton);

  // Append left part to full-screen div
  fullScreenDiv.appendChild(leftPart);

  // Create the right part
  const rightPart = document.createElement("div");
  rightPart.classList.add("right-part");
  rightPart.style.width = "60%"; // Set right part width
  rightPart.style.height = "100%"; // Set right part height
  rightPart.style.backgroundColor = "black"; // Set right part background color
  rightPart.style.float = "left"; // Float left for side-by-side layout
  rightPart.style.padding = "10px"; // Optional padding

  // Append right part to full-screen div
  fullScreenDiv.appendChild(rightPart);

  // Render the full-screen div
  document.body.appendChild(fullScreenDiv);

  // Example form configuration
  const exampleConfig = {
    form: {
      id: "loginForm",
      title: "Login Title Here",
    },
    submitButton: {
      textContent: "Login",
    },
    fields: [
      { field_name: "email", placeholder: "Enter your email", type: "email" },
      {
        field_name: "password",
        placeholder: "Enter your password",
        type: "password",
      },
    ],
  };

  // Initial form preview
  const initialForm = createDynamicForm(exampleConfig, handleLogin);
  rightPart.appendChild(initialForm);
}

let socket;

function addNewElementToChatBody(obj) {
  const new_messageElement = document.createElement("div");
  new_messageElement.classList.add("message");
  new_messageElement.classList.add("admin");
  new_messageElement.innerHTML = `
        <div>
        <p>${obj.msg}</p>
        <span class="time">${obj.timestamp}</span>
        </div>
    `;
  chatBody.appendChild(new_messageElement);
}

export function renderAuthHeader(token) {
  const header = document.createElement("header");
  header.classList.add("header");

  const leftPart = document.createElement("div");
  leftPart.classList.add("left");

  // Create an img element for the logo
  const logo = document.createElement("img");
  logo.src = myImage;
  logo.alt = "Tezkit Logo";
  logo.style.height = "50px"; // Adjust the height as needed
  logo.style.marginRight = "10px"; // Optional: Add some space between the logo and text
  leftPart.appendChild(logo);

  const logoText = document.createElement("div");
  logoText.textContent = "Tezkit";
  logoText.style.display = "inline-block"; // To align it horizontally with the image
  logoText.style.verticalAlign = "middle"; // To align it vertically with the image
  leftPart.appendChild(logoText);

  header.appendChild(leftPart);

  const rightPart = document.createElement("div");
  rightPart.classList.add("right");

  const notificationIcon = document.createElement("span");
  notificationIcon.textContent = "🔔";
  notificationIcon.style.cursor = "pointer";
  notificationIcon.addEventListener("click", toggleNotificationModal);

  const notificationNum = document.createElement("span");
  notificationNum.setAttribute("id", "notification_num");
  notificationNum.textContent = 0;
  notificationNum.style.cursor = "pointer";
  // notificationNum.addEventListener('click', toggleNotificationModal);

  const notificationWrapperDiv = document.createElement("div");
  // notificationNum.textContent = 0;
  // notificationNum.style.cursor = 'pointer';
  // notificationNum.addEventListener('click', toggleNotificationModal);

  notificationWrapperDiv.appendChild(notificationIcon);
  notificationWrapperDiv.appendChild(notificationNum);

  rightPart.appendChild(notificationWrapperDiv);

  // const token = localStorage.getItem("tezkit_token");

  header.appendChild(rightPart);

  document.body.prepend(header);

  if (token) {
    const logoutButton = createButtonComp("Logout", () => {
      // Logout here
      localStorage.removeItem("tezkit_token");
      // Reload the page
      window.location.reload();
    });

    rightPart.appendChild(logoutButton);

    const chatIcon = document.createElement("span");
    chatIcon.textContent = "💬";
    chatIcon.style.cursor = "pointer";
    // chatIcon.addEventListener('click', toggleChatModal);
    // rightPart.appendChild(chatIcon);

   
  } else {
    const loginButton = createButtonComp("Login", () => {
      routeToLogin();
    });
    rightPart.appendChild(loginButton);

    const signupButton = createButtonComp("Signup", () => {
      toggleSignup();
    });
    rightPart.appendChild(signupButton);
  }
}



// Define your breakpoints
const MOBILE_WIDTH = 768;

// Function to check the viewport size
function checkViewportSize() {



  // if (width < 800) {
  //   console.log("areraewr dcp,dog dfsd")
  //   chat_modal.style.display = "flex";

  // }
  // else {
  //   console.log("else block is executing???", width)
  //   chat_modal.style.display = "block";

  // }

  const chat_modal = document.getElementById("chatModal");

  if (window.innerWidth < MOBILE_WIDTH) {
    console.log('Mobile size', window.innerWidth);
    chat_modal.style.display = "flex";


    // Add your mobile-specific logic here
  } else {
    console.log('Desktop size', window.innerWidth);
    // Add your desktop-specific logic here
    chat_modal.style.display = "block";

  }
}

export function setUp(app_name, api_key){
  localStorage.setItem("tezkit_app_name",app_name)
  localStorage.setItem("tezkit_api_key",api_key)
}


// Function to add a full-width header with a fixed height and red background color
export function initialize(loggedInUser) {
  console.log("here iteste for tests???", loggedInUser)
  // Attach the function to the resize event
  window.addEventListener('resize', checkViewportSize);
  // socket = socket;
  const tezkit_app_data = localStorage.getItem('tezkit_app_data')

  if (tezkit_app_data){
    console.log("are you here?")
    const tezkit_app_p_data = JSON.parse(tezkit_app_data)
    // console.log("here is the sdflogedddd",tezkit_app_p_data.settings.authCloudManaged===false);

    if (tezkit_app_p_data.settings.authCloudManaged){
      identifiers["name_idn"]="id"
    }
    else if(tezkit_app_p_data.settings.authCloudManaged===false){
      identifiers["name_idn"]="uid"
     
    }
    console.log("aerwer where herever",identifiers,tezkit_app_p_data)

  }
  else {
    const app_name = localStorage.getItem("tezkit_app_name");
    const api_key = localStorage.getItem("tezkit_api_key")

    console.log("arewe gonna fire this!!")
    if (app_name && api_key) {
      console.log("arerewrewrew")
      const reqUrl = `https://qiwppawsr7.execute-api.ap-south-1.amazonaws.com/prod/get_app?act_type=user&app_name=${app_name}`;
      const headersList = {
        "Accept": "*/*",
        "X-API-Key": api_key //THIS ONE SHOULD BE PICKED FROM index.html
      };

      try {
        fetch(reqUrl, {
          method: "GET",
          headers: headersList
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              console.error(`Error: ${response.status} - ${response.statusText}`);
            }
          })
          .then((data) => {
            if (data) {
              console.log("APP DATA", data);
              localStorage.setItem("tezkit_app_data", JSON.stringify(data));
            }
          })
          .catch((error) => {
            console.error('Request failed:', error);
          });
      } catch (error) {
        console.error('Request failed:', error);
      }
      
      
      
    } else {
      console.error("app_name not provided to the client!");
    }
  
  
  }

  if (loggedInUser) {
    console.log("loggedInUserasdfasd",loggedInUser)
    // const io = await require('socket.io-client') // For client-side connection

    socket = io("http://122.160.157.99:8022");
    console.log("loggedInUser in initialze??");


    
   

    // console.log("user on consumer joined", "global_for__" + identifiers["uid"]);


    console.log(loggedInUser,identifiers,"user on consumer joined", "global_for__" + loggedInUser[identifiers["name_idn"]]);

    socket.emit("join_room", { room: "global_for__" + loggedInUser[identifiers["name_idn"]] });

    // socket.emit('ON_MESSAGE_STATUS_CHANGED', );
    // console.log("waterw .id",loggedInUser)

    // console.log('joined room :: ',"global_for__" + loggedInUser[identifiers["name_idn"]])
    // socket.emit("join_room", { room: "global_for__" + loggedInUser[identifiers["name_idn"]] });

    socket.on("ON_MESSAGE_ARRIVAL_BOT", function (data) {
      console.log("isndie readl one", data)
      const p_data = JSON.parse(data);
      console.log("are we getting data just fine!p_data.message.frm_user.id", p_data);

      socket.emit("ON_MESSAGE_STATUS_CHANGED", {
        action: "MSG_STATUS_CHANGE_EVENT",
        msg_id: p_data.message.assigned_msg_id, // THIS WILL BE DYNAMIC IN NATURE upda
        room: "global_for__" + p_data.message.frm_user.id,
        message: "DELIVERED",
        timestamp: new Date().toLocaleTimeString(),
      });


    
      if (tezkit_app_data){
        const tezkit_app_p_data = JSON.parse(tezkit_app_data)
        // console.log("here is the sdflogedddd",tezkit_app_p_data.settings.authCloudManaged===false);

        if (tezkit_app_p_data.settings.authCloudManaged){
          incrementNotificationsCount()

        }
       
      }


      // const sd = JSON.parse(data)
      const msg = p_data["message"]["message"];
      const timestamp = p_data["message"]["timestamp"];

      // const chat_window = document.getElementById('chatBody')
      // const new_msg_div = document.createElement('div')
      // new_msg_div.textContent = 'new msg'
      // chat_window.appendChild(new_msg_div)

      console.log(
        "pdata do we have some msg_id?",
        p_data.message.assigned_msg_id
      );

      const chat_modal = document.getElementById("chatModal");
      console.log("whatewe sdfsdf", chat_modal.style.display)
      if (chat_modal_open) {
        addNewElementToChatBody({ msg, timestamp });
        socket.emit("ON_MESSAGE_STATUS_CHANGED", {
          action: "MSG_STATUS_CHANGE_EVENT",
          msg_id: p_data.message.assigned_msg_id, // THIS WILL BE DYNAMIC IN NATURE upda
          room: "global_for__1",
          message: "READ",
          timestamp: new Date().toLocaleTimeString(),
        });
      } else {
        console.log("arewe atleasthere", global_bucket)
        global_bucket.unread_msgs.push({
          msg,
          timestamp,
          assigned_msg_id: p_data.message.assigned_msg_id,
        });
        socket.emit("ON_MESSAGE_STATUS_CHANGED", {
          action: "MSG_STATUS_CHANGE_EVENT",
          msg_id: p_data.message.assigned_msg_id, // THIS WILL BE DYNAMIC IN NATURE upda
          room: "global_for__1",
          message: "DELIVERED",
          timestamp: new Date().toLocaleTimeString(),
        });
      }
    });

    socket.on('ON_MESSAGE_ARRIVAL', function (data) {
      console.log("Reply Recieved!", data)
    })


    // Main socket event handler
    socket.on("ON_MESSAGE_STATUS_CHANGED", function (data) {
      const p_data = JSON.parse(data);
      console.log("Received status change:", p_data);

      if (!p_data.message.action) {
        console.error("No action provided!");
        return;
      }

      if (p_data.message.action === "MSG_UPDATED_EVENT") {
        handleMsgUpdatedEvent(p_data);
      } else if (p_data.message.action === "MSG_REACTION_EVENT") {
        handleMsgReactionEvent(p_data);
      } else {
        console.error("Action Not Yet Handled:", p_data.message.action);
      }
    });




    // Usage in toggleChatModal or socket.on


    socket.on("ON_USER_LIVE_STATUS", function (data) {
      const p_data = JSON.parse(data);
      console.log("is user going offline?", p_data);

      if (!p_data.hasOwnProperty('status')) {
        console.error("No status provided!");
      } else {
        const statusElement = document.getElementById("statusElement");

        if (statusElement) {
          if (p_data.status === true) {
            console.log("Admin is Online");
            statusElement.textContent = "";
            statusElement.style.background = "#9acd32";
          } else if (p_data.status === false) {
            console.log("Admin is Offline");
            statusElement.textContent = "";
            statusElement.style.background = "#a99bbe";
          }
        }

      }
    });



    socket.on("ON_FILE_UPLOAD", function (data) {
      // const p_data = JSON.parse(data);
      console.log("some file it seeems was uploaded?", data, typeof (data));
      delete data.result.message;

      renderMessage(data, 'FILE_MIXED');



      //HERE WILL ADD A MSG BOX TO THE MAIN MSG WRAPPER
      //   {
      //     "result": {
      //         "message": "Files and fields processed successfully",
      //         "files": [
      //             "https://muti-media-bckt.s3.amazonaws.com/p2p/1__to__2/pexels-daan-rink-7047366.jpg",
      //             "https://muti-media-bckt.s3.amazonaws.com/p2p/1__to__2/pickme.png"
      //         ],
      //         "sometext_data": [
      //             "Editable content here"
      //         ]
      //     },
      //     "to_user": {
      //         "id": "2"
      //     }
      // }

    });



    // socket.on("ON_MESSAGE_STATUS_CHANGED", function (data) {
    //   const p_data = JSON.parse(data);
    //   console.log("arew we getting this now?", p_data);

    //   if (!p_data.message.action) {
    //     console.error("No action provided!");
    //   } else {
    //     console.log("hwere i am  let's go champ!!!!!");
    //     if (p_data.message.action == "MSG_UPDATED_EVENT") {
    //       console.log("do we get it the when message is seen???", p_data);
    //       console.log(
    //         p_data.message.message,
    //         "FIND status in message? IT SEEMS WE GOT SOME STATUS UPDATE ON MSGS.  @Admin.. lets get msg_id",
    //         data,
    //         typeof data
    //       );

    //       // message =
    //       const msg = p_data.message.message;
    //       const msg_id = p_data.message.msg_id;
    //       console.log(msg_id, "what is this msg", msg);

    //       console.log("my messg id",msg_id );

    //       // a = "msg_id__1"
    //       // 'msg_id__1'
    //       const msg_calc_ind = msg_id.split("msg_id__")[1];

    //       // ind = a.split('msg_id__')[1]
    //       // '1'
    //       // document.getElementById('chat_modal')

    //       // First, grab the parent element with id 'chatBody'
    //       const chatBody = document.getElementById("chatBody");

    //       // Get all <p> elements within .message.admin divs
    //       const messageElements = chatBody.querySelectorAll(".message.admin p");

    //       // Now, access the nth message (where n is the index, starting from 0)
    //       // const msg_calc_ind = 2; // For example, this will give you the 3rd message (index 2)
    //       if (msg_calc_ind - 1 < messageElements.length) {
    //         const nthMessage = messageElements[msg_calc_ind - 1];
    //         console.log("nthMessageText", nthMessage);
    //         nthMessage.textContent = msg;
    //       } else {
    //         console.error("No message found at this index. to be updated");
    //       }

    //       // Finally, get the text content of the <p> tag

    //       // console.log(messageText); // Output: "the message"

    //       // updateMsg(p_data.message.msg_id, msg);
    //     }


    //     if (p_data.message.action == "MSG_REACTION_EVENT") {
    //       console.log("reaction received!!!",p_data);
    //     } else {
    //       console.error("Action Not Yet Handled!");
    //     }
    //   }

    //   // Let's make the msgs all READ
    // });  


    // Function to extract message index from msg_id

    function getMessageIndex(msg_id) {
      const msg_calc_ind = msg_id.split("msg_id__")[1];
      return parseInt(msg_calc_ind, 10) - 1;
    }

    // Function to get a specific message element by index
    function getMessageElement(index, chatBody) {
      const messageElements = chatBody.querySelectorAll(".message");
      if (index < messageElements.length) {
        return messageElements[index];
      } else {
        console.error("No message found at this index:", index);
        return null;
      }
    }

    function updateMessageText(messageElement, newText) {
      const messageText = messageElement.querySelector("p");
      if (messageText) {
        messageText.textContent = newText;
        console.log("Message updated to:", newText);
      } else {
        console.error("Message text element not found.");
      }
    }

    // Function to update the reaction
    function updateMessageReaction(messageElement, reaction) {
      let reactionElement = messageElement.querySelector(".reaction");
      if (!reactionElement) {
        reactionElement = document.createElement("div");
        reactionElement.classList.add("reaction");
        messageElement.appendChild(reactionElement);
      }
      reactionElement.textContent = reaction;
      console.log("Reaction updated to:", reaction);
    }

    function handleMsgUpdatedEvent(p_data) {
      const { msg_id, message } = p_data.message;
      const msg = message;
      const chatBody = document.getElementById("chatBody");

      const msgIndex = getMessageIndex(msg_id);
      const messageElement = getMessageElement(msgIndex, chatBody);

      if (messageElement) {
        updateMessageText(messageElement, msg);
      }
    }


    function handleMsgReactionEvent(p_data) {
      const { msg_id, message } = p_data.message;
      const reaction = message;
      const chatBody = document.getElementById("chatBody");

      const msgIndex = getMessageIndex(msg_id);
      const messageElement = getMessageElement(msgIndex, chatBody);

      if (messageElement) {
        updateMessageReaction(messageElement, reaction);
      }
    }




  }

  const token = localStorage.getItem("tezkit_token");
  




    //   const tezkit_app_p_data = JSON.parse(tezkit_app_data)
    console.log("here is the fdghfjghjhgfj",tezkit_app_data);
    console.log("arev here on the first load!",tezkit_app_data)



    
  if (tezkit_app_data){
    const tezkit_app_p_data = JSON.parse(tezkit_app_data)
    console.log("here is the tezkit_app_p_data.settings.authCloudManaged",tezkit_app_p_data);

    if (tezkit_app_p_data.settings.authCloudManaged){
      if (!token) {
        console.log("dfgfghfghhjfrghfgsdfasdfasdfh")
    
        renderAuthHeader();
      } else {
    
        renderAuthHeader(token);
    
        // rightPart.appendChild(makeCompButton);
      }
    

    }



    }
  else{
    renderAuthHeader();

  }
  

  console.log("are we here yet!");

  // // Create the full-screen div
  // const fullScreenDiv = document.createElement('div');
  // fullScreenDiv.classList.add('full-screen-div');
  // document.body.appendChild(fullScreenDiv);

  // Create the modal element
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.id = "notificationModal";
  modal.textContent = "This is the notification modal";
  document.body.appendChild(modal);

  const chat_modal = document.createElement("div");
  chat_modal.classList.add("chat_modal");
  chat_modal.id = "chatModal";
  document.body.appendChild(chat_modal);

  // Function to toggle the modal visibility
  function toggleChatModal() {
    const chat_modal = document.getElementById("chatModal");
    console.log("sdfsdfsdafchat_modal_open", chat_modal_open)

    if (!chat_modal_open) {

      // Get the width and height of the window
      const width = window.innerWidth;
      // const height =  window.innerHeight;

      // Log the dimensions to the console
      // console.log(`Widtsdfsdh: ${width}px, Height: ${height}px`);
      console.log("MOBILE_WIDTHfdsf", MOBILE_WIDTH)
      if (width < MOBILE_WIDTH) {
        console.log("areraewr dcp,dog dfsd")
        chat_modal.style.display = "flex";

      }
      else {
        console.log("else block is executing???", width)
        chat_modal.style.display = "block";

      }


    } else {
      chat_modal.style.display = "none";
    }


    if (loggedInUser) {
      console.log("Now we can just updae the title");

      // Then find the chat_header and the h3 element inside it
      const chatHeader = chat_modal.querySelector(".chat_header");
      const loginMessage = chatHeader.querySelector("h3");
      const statusElement = chatHeader.querySelector("#statusElement");
      console.log("identifiersfdgsd",identifiers)
      loginMessage.textContent = loggedInUser.full_name || loggedInUser.uid;

      statusElement.textContent = "";
      statusElement.style.background = "#a99bbe";
    }

    chat_modal_open = !chat_modal_open


  }

  function closeModal() {
    console.log("you click on close btn",chat_modal_open);
    // chat_modal.style.display = 'none';
    // chat_modal_open = !chat_modal_open
    toggleChatModal()

  }


  chat_modal.innerHTML = `
  <div class="chat_header">
      <div style="display: flex; align-items: center;">
      <h3 id="loginMessage">Please Login to Chat</h3>
      <span id="statusElement" style="margin-left: 10px;"></span>
      </div>
      <button id="close-btn" style="background-color: white; outline: none; border: none; border-radius: 8px; padding: 5px; box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; ">Close</button>
  </div>
  <div class="chat_body" id="chatBody">
      <!-- Messages will be dynamically added here -->
  </div>
  <div class="chat_footer">
      <input type="text" id="chatInput" placeholder="Type here...">
      <button id="sendButton">Send</button>
  </div>
`;

  document.getElementById("close-btn").addEventListener("click", closeModal);

  console.log(
    "and if modal is open if logged into chat lets update the username on the chat header??"
  );

  const closebtn = document.getElementById("close-btn");
  closebtn.addEventListener("clickwheredoyouseethis", function () {
    toggleChatModal();
    chat_modal_opener.style.display = "block";

    // const width = window.innerWidth;
    // const height = window.innerHeight;

    // // Log the dimensions to the console
    // console.log(`Widtsdfsdh: ${width}px, Height: ${height}px`);

    // if (width < 800) {
    //   console.log("areraewr dcp,dog dfsd")
    //   chat_modal.style.display = "flex";

    // }
    // else {
    //   console.log("else block is executing???", width)
    //   chat_modal.style.display = "block";

    // }
  });

  // // Create an img element for the logo
  const chat_modal_container = document.createElement("div");
  chat_modal_container.setAttribute("id", "chat_modal_opener");
  chat_modal_container.style.display = "flex";
  chat_modal_container.style.alignItems = "center";
  chat_modal_container.style.justifyContent = "center";
  chat_modal_container.style.backgroundColor = "#A370CE";
  chat_modal_container.style.height = "50px";
  chat_modal_container.style.width = "50px";
  chat_modal_container.style.borderRadius = "50%";
  chat_modal_container.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.1)";
  chat_modal_container.style.marginRight = "10px";
  chat_modal_container.style.cursor = "pointer";

  const chat_modal_opener = document.createElement("i");
  chat_modal_opener.classList.add("fas", "fa-comments");
  chat_modal_opener.style.color = "#fff";
  chat_modal_opener.style.fontSize = "24px";

  // const chat_modal_opener = document.createElement('img');
  // chat_modal_opener.setAttribute('id', 'chat_modal_opener')
  // chat_modal_opener.src = chatNowImage;
  // chat_modal_opener.alt = 'chatNowImage Logo';
  // chat_modal_opener.style.display = 'none'; // Adjust the height as needed
  // chat_modal_opener.style.height = '50px'; // Adjust the height as needed
  // chat_modal_opener.style.marginRight = '10px'; // Optional: Add some space between the logo and text

  chat_modal_opener.addEventListener("click", function () {
    toggleChatModal();
    // DONOT DELETE ......WILL USE BELOW CODE LATER
    // if (global_bucket && global_bucket.unread_msgs) {
    //   console.log("arew westill goin in htere?");
    //   global_bucket.unread_msgs.forEach(function (obj, index) {
    //     addNewElementToChatBody({ msg: obj.msg, timestamp: obj.timestamp });
    //     socket.emit("ON_MESSAGE_STATUS_CHANGED", {
    //       action: "MSG_STATUS_CHANGE_EVENT",
    //       msg_id: obj.assigned_msg_id, // THIS WILL BE DYNAMIC IN NATURE upda
    //       room: "global_for__1",
    //       message: "READ",
    //       timestamp: new Date().toLocaleTimeString(),
    //     });
    //   });
    //   global_bucket.unread_msgs = [];
    // }
  });

  chat_modal_container.appendChild(chat_modal_opener);
  document.body.appendChild(chat_modal_container);

  // document.body.appendChild(chat_modal_opener);

  const chatBody = document.getElementById("chatBody");
  const chatInput = document.getElementById("chatInput");
  const sendButton = document.getElementById("sendButton");

  // sendButton.addEventListener('click',()=>{
  // let new_rply_msg_obj = {
  //     // "type": "reply",
  //     'room': "global_for__1",
  //     "message": "inputBox.value",
  //     "timestamp": new Date().toLocaleTimeString(),
  //     "frm_user": {
  //         "id": loggedInUser[identifiers["name_idn"]],
  //         "user": loggedInUser.full_name
  //     },
  //     "to_user": {
  //         "id": 1,
  //         "user": "Admin"
  //     }

  // }

  // socket.emit('ON_MESSAGE_ARRIVAL_BOT', new_rply_msg_obj);

  // })

  // Example of history messages
  const messages = [
    // { text: 'Lorem Ipsum is simply dummy textting industry. Lorem Ipsum has been the industry', sender: 'admin', time: '10:10 AM' },
    // { text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry', sender: 'admin', time: '10:10 AM' },
    // { text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry', sender: 'user', time: '11:15 AM' }
  ];

  // const messages = [
  //   { id: 'msg_id__1', text: 'Hello', time: '15:48:54', reaction: '' },
  //   // other messages
  // ];

  function renderReaction(reaction) {
    if (!reaction) return "";

    return `<div class="reaction">${reaction}</div>`;
  }


  function renderMessage(newMessage, type = 'REGULAR') {
    if (newMessage) {
      if (type === 'REGULAR') {
        const messageWrapper = document.createElement("div");
        messageWrapper.classList.add("message-container");

        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.classList.add(newMessage.sender || "de");

        const reactionHtml = renderReaction(newMessage.reaction);

        messageElement.innerHTML = `
          <p>${newMessage.text}</p>
          <span class="time">${newMessage.time}</span>
          ${reactionHtml}
        `;

        console.log("Rendering new message:", messageElement);

        // Append the new message at the bottom of chatBody
        chatBody.appendChild(messageWrapper);
        messageWrapper.appendChild(messageElement);

      } else if (type === 'FILE_MIXED') {
        const messageWrapper = document.createElement("div");
        messageWrapper.classList.add("message-container");

        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.classList.add(newMessage.to_user.id || "de");

        // Handling files, showing them directly as images
        let filesHtml = '';
        if (newMessage.result.files && newMessage.result.files.length > 0) {
          filesHtml = newMessage.result.files.map(fileUrl => {

            // let cleanedUrl = fileUrl.replace(/"/g, '');  // Remove double quotes
            return `<img src="${fileUrl}" alt="file" class="file-preview" />`;
          }).join("");
        }

        // Handling text content
        let textHtml = '';
        if (newMessage.result.sometext_data && newMessage.result.sometext_data.length > 0) {
          textHtml = JSON.parse(newMessage.result.sometext_data).map(text => {
            return `<p>${text}</p>`;
          }).join("");
        }

        // Construct the message inner HTML
        messageElement.innerHTML = `
          <div class="file-mixed-content">
            ${filesHtml}
            ${textHtml}
          </div>
          <span class="time">${new Date().toLocaleTimeString()}</span>
        `;

        console.log("Rendering FILE_MIXED message:", messageElement);

        // Append the new message at the bottom of chatBody
        chatBody.appendChild(messageWrapper);
        messageWrapper.appendChild(messageElement);
      }
    }
  }




  sendButton.addEventListener("click", () => {
    if (loggedInUser) {

      let new_rply_msg_obj = {
        // "type": "reply",
        room: "global_for__1",
        message: chatInput.value,
        timestamp: new Date().toLocaleTimeString(),
        frm_user: {
          id: loggedInUser[identifiers["name_idn"]],
          // user: loggedInUser.full_name,
        },
        to_user: {
          id: 1,
          user: "Admin",
        },
      };


      const messageText = chatInput.value;
      if (messageText.trim() !== "") {
        const newMessage = {
          text: messageText,
          sender: "user",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };


        console.log("w atis thsi", loggedInUser);
        socket.emit("ON_MESSAGE_ARRIVAL_BOT", new_rply_msg_obj);

        messages.push(newMessage);
        renderMessage(newMessage);
        chatInput.value = "";
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    } else {
      alert("kindly login first!");
    }
  });

  // Initial rendering of messages
  // renderMessage(null);

  document.body.appendChild(chat_modal);
}

function createButtonComp(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}

// Function to handle routing to /chat and render a box with an orange background
export function routeToChat() {
  // Clear the body content
  document.body.innerHTML = "";

  // Create the chat box
  const chatBox = document.createElement("div");
  chatBox.style.width = "100%";
  chatBox.style.height = "200px";
  chatBox.style.backgroundColor = "orange";
  chatBox.style.color = "black";
  chatBox.style.textAlign = "center";
  chatBox.style.lineHeight = "200px";
  chatBox.innerText = "Welcome to the Chat!";

  // Append the chat box to the body
  document.body.appendChild(chatBox);

  // Optionally, update the URL to reflect the new route
  history.pushState(null, "", "/chat");
}

// Function to handle routing to /login and render a login form
export function routeToLogin() {
  // Clear the body content
  document.body.innerHTML = "";

  // Create the login form
  // const loginForm = createLoginForm(handleLogin);

  // Usage example
  const formConfig = {
    form: {
      id: "loginForm",
      title: "Login Title Here",
    },
    submitButton: {
      textContent: "Login",
    },
    fields: [
      { field_name: "email", placeholder: "Enter your email", type: "email" },
      {
        field_name: "password",
        placeholder: "Enter you password",
        type: "password",
      },
    ],
  };

  const loginForm = createDynamicForm(formConfig, handleLogin);

  document.body.appendChild(loginForm);

  // Optionally, update the URL to reflect the new route
  history.pushState(null, "", "/login");
}

// Function to toggle the modal visibility
function toggleNotificationModal() {
  const modal = document.getElementById("notificationModal");
  if (modal.style.display === "none" || modal.style.display === "") {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }
}


// Function to toggle the signup form visibility
function toggleSignup() {
  const existingForm = document.getElementById("signupForm");
  if (existingForm) {
    existingForm.remove();
  } else {
    const signupForm = createSignupForm();
    signupForm.id = "signupForm";
    document.body.appendChild(signupForm);
  }
}

// Function to create the signup form
function createSignupForm() {
  const form = document.createElement("form");
  form.style.width = "100%";
  form.style.maxWidth = "400px";
  form.style.margin = "auto";
  form.style.padding = "20px";
  form.style.backgroundColor = "#f2f2f2";
  form.style.border = "1px solid #ccc";
  form.style.borderRadius = "5px";
  form.id = "signupForm";

  // Title
  const titleElement = document.createElement("h2");
  titleElement.textContent = "Signup";
  titleElement.style.textAlign = "center";
  titleElement.style.marginBottom = "20px";
  form.appendChild(titleElement);

  // Full name input
  const fullNameInput = createFormInput(
    "full_name",
    "Enter your full name",
    "text",

  );
  form.appendChild(fullNameInput);

  // Phone number input
  const phoneInput = createFormInput(
    "phone",
    "Enter your phone number",
    "text",
    
  );
  form.appendChild(phoneInput);

  // Email input
  const emailInput = createFormInput("email", "Enter your email", "email");
  form.appendChild(emailInput);

  // Password input
  const passwordInput = createFormInput(
    "password",
    "Enter your password",
    "password"
  );
  form.appendChild(passwordInput);

  // Gender input
  const genderLabel = document.createElement("label");
  genderLabel.textContent = "Gender";
  form.appendChild(genderLabel);

  const genderMale = document.createElement("input");
  genderMale.type = "radio";
  genderMale.name = "gender";
  genderMale.value = "Male";
  form.appendChild(genderMale);
  form.appendChild(document.createTextNode("Male"));

  const genderFemale = document.createElement("input");
  genderFemale.type = "radio";
  genderFemale.name = "gender";
  genderFemale.value = "Female";
  form.appendChild(genderFemale);
  form.appendChild(document.createTextNode("Female"));

  // Submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Signup";
  submitButton.style.width = "100%";
  submitButton.style.padding = "10px";
  submitButton.style.backgroundColor = "#4CAF50";
  submitButton.style.color = "white";
  submitButton.style.border = "none";
  submitButton.style.borderRadius = "3px";
  form.appendChild(submitButton);



  const tezkit_app_data = localStorage.getItem('tezkit_app_data')
  console.log("what is ittezkit_app_data",tezkit_app_data)
  const tezkit_app_pdata = JSON.parse(tezkit_app_data)
  console.log("there is thenat",tezkit_app_pdata.tenant_id)
  // Form submission handling
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = {
      full_name: formData.get("full_name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      type: "user_type",
      tenant: tezkit_app_pdata.tenant_id,
      gender: formData.get("gender"),
      app_name: tezkit_app_pdata.app_name,
      role: 65536
    };

    console.log(data,"let see if left it identical to right", tezkit_app_pdata.auth_key)
    try {
      console.log("is it running??")
      
      const response = await fetch(
        "https://8dk6ofm0db.execute-api.ap-south-1.amazonaws.com/prod/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key":tezkit_app_pdata.auth_key
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        // Navigate to /login on successful signup
        routeToLogin();
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  return form;
}

// Function to create form input elements
// Function to create form input elements
function createFormInput(name, placeholder, type) {
  const input = document.createElement("input");
  input.name = name;
  input.placeholder = placeholder;
  input.type = type;
  input.style.width = "100%";
  input.style.padding = "10px";
  input.style.marginBottom = "10px";
  input.style.border = "1px solid #ccc";
  input.style.borderRadius = "3px";
  return input;
}

// Function to create the login form dynamically
function createDynamicForm(config, handleSubmit) {
  const form = document.createElement("form");
  form.style.width = "100%";
  form.style.maxWidth = "400px";
  form.style.margin = "auto";
  form.style.padding = "20px";
  form.style.backgroundColor = "#f2f2f2";
  form.style.border = "1px solid #ccc";
  form.style.borderRadius = "5px";
  form.id = config.form.id;

  // Title
  const titleElement = document.createElement("h2");
  titleElement.textContent = config.form.title || "Form Title";
  titleElement.style.textAlign = "center";
  titleElement.style.marginBottom = "20px";
  form.appendChild(titleElement);

  // Generate form fields dynamically
  config.fields.forEach((field) => {
    const input = createFormInput(
      field.field_name,
      field.placeholder,
      field.type
    );
    form.appendChild(input);
  });

  // Submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = config.submitButton.textContent || "Submit";
  submitButton.style.width = "100%";
  submitButton.style.padding = "10px";
  submitButton.style.backgroundColor = "#4CAF50";
  submitButton.style.color = "white";
  submitButton.style.border = "none";
  submitButton.style.borderRadius = "3px";
  form.appendChild(submitButton);

  // Form submission handling
  form.addEventListener("submit", handleSubmit);

  return form;
}

// Function to handle login form submission
async function handleLogin(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const tezkit_app_data = localStorage.getItem('tezkit_app_data')
  const tezkit_app_pdata = JSON.parse(tezkit_app_data)
  const data = {
    type: "user_type",
    email: formData.get("email"),
    password: formData.get("password"),
    app_name: tezkit_app_pdata.app_name,
  };

  const headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  };
  console.log("is it running222??")

  try {
    const response = await fetch(
      "https://8dk6ofm0db.execute-api.ap-south-1.amazonaws.com/prod/login",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: headersList,
      }
    );

    if (response.ok) {
      //Save the token
      const responseData = await response.json();
      console.log("wahte is ti", responseData);
      console.log("Token:", responseData.token); // Assuming token is in the response data
      localStorage.setItem("tezkit_token", responseData.token);


      console.log("areweherdde?")
     
      routeToRoot("/package-consumer/index.html");
    } else {
      console.error("Login failed");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to handle routing to / root and render a welcome message
function routeToRoot(path = null) {
  // Clear the body content
  // document.body.innerHTML = '';

  // // Create the welcome message
  // const welcomeMessage = document.createElement('div');
  // welcomeMessage.style.width = '100%';
  // welcomeMessage.style.height = '200px';
  // welcomeMessage.style.backgroundColor = '#4CAF50';
  // welcomeMessage.style.color = 'white';
  // welcomeMessage.style.textAlign = 'center';
  // welcomeMessage.style.lineHeight = '200px';
  // welcomeMessage.innerText = 'Welcome to the Home Page!';

  // // Append the welcome message to the body
  // document.body.appendChild(welcomeMessage);

  // // Optionally, update the URL to reflect the new route
  history.pushState(null, "", path);
  window.location.reload();
}

// Attach the login form submit event handler to the login form
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
});
