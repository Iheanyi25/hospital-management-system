import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import eyeson from 'eyeson'
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

const Chat = () => {
    const [ connection, setConnection ] = useState(null);
    const [ chat, setChat ] = useState([]);
    const [notification, setNotification] = useState([]);
    const latestChat = useRef(null);
    const latestNotification = useRef(null);


    latestChat.current = chat;

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:44333/signalRHub')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    
    
                    connection.on('ReceiveMessage', message => {
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);
                 
                        setChat(updatedChat);
                  
                    });
                })
                .then(result => {
                    
    
                    connection.on('RecieveNotification', message => {
                        const updatedNotification = [latestNotification.current];
                        updatedNotification.push(message);
              
                        setNotification(updatedNotification);
                 
                    });
                })
                .then(res =>{
                    LoadChat()
                    LoadNotifications()
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    useEffect(() => {
        if (connection) {
          connection
            .start()
            .then(() => {
              connection.on("RecieveNotification", (message) => {
                notification.open({
                  message: "New Notification",
                  description: message,
                });
              });
            })
            .catch((error) => console.log(error));
        }
      }, [connection]);


    const LoadChat = async ()=>{
        try {
             await  fetch('https://localhost:44333/api/chat/contactId?contactId=2cd707fc-4c74-46c4-9f81-9d22bce43b53&userId=cbaabd09-2ceb-4eef-9b47-f8ad9133b67f')
            .then(response => response.json())
            .then(data => {
                data.forEach(async element => {
                    await connection.send('SendMessage', element);
                });
                
       
            });
            
        }
        catch(e) {
            console.log(e);
        }
    }

    const LoadNotifications = async ()=>{
      try {
           await  fetch('https://localhost:44333/api/notification/GetNotifications?userId=cbaabd09-2ceb-4eef-9b47-f8ad9133b67f')
          .then(response => response.json())
          .then(data => {
              data.forEach(async element => {
                  await connection.send('SendNotification', element);
              });
              
     
          });
          
      }
      catch(e) {
          console.log(e);
      }
    }
    const startVideo = async() =>{
      eyeson.onEvent(event => {
        if (event.type !== "accept") {
          console.log(event.type)
          return;
        }
        // Note: Some iOS devices might require video to have autoplay attribute set.
        let video = document.querySelector("video");
        video.srcObject = event.remoteStream;
        video.play();
      });
      eyeson.start("chRuqcMel6Aj4k1mzdpiFW5p08GoBy8OOMVXan2R0X");
    }
    const sendMessage = async (message) => {
       

        const chatMessage = {
          FromUserId: "cbaabd09-2ceb-4eef-9b47-f8ad9133b67f",
          ToUserId: "2cd707fc-4c74-46c4-9f81-9d22bce43b53",
          message: message
      };

      const notification = {
        message: "Notified",
        UserId: "cbaabd09-2ceb-4eef-9b47-f8ad9133b67f",
         
      }
        if (connection.connectionStarted) {
        
            try {
                await  fetch('https://localhost:44333/api/chat', { 
                    method: 'POST', 
                    body: JSON.stringify(chatMessage),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                await  fetch('https://localhost:44333/api/notification/CreateNotification', { 
                  method: 'POST', 
                  body: JSON.stringify(notification),
                  headers: {
                      'Content-Type': 'application/json'
                  }
              });
               await connection.send('SendMessage', chatMessage);
               await connection.send('SendNotification', "Message Sent");
               
               
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    return (
      <>
        
        <div>
             
            <ChatWindow chat={chat}/>
            <hr />
            <ChatInput sendMessage={sendMessage} />
<button onclick={startVideo}>Video</button>
        </div>
        </>
    );
};

export default Chat;