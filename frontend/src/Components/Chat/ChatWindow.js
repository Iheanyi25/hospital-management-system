import React from 'react';

import Message from './Message';

const ChatWindow = (props) => {
    
    const chat = props?.chat
        .map(m => <Message 
            key={Date.now() * Math.random()}
            date={m.createdDate}
          
            message={m.message}/>);

    return(
        <>
        <div>
            {props?.chat[0]?.toUser?.firstName}
        </div>
        <div>
            {chat}
        </div>
        </>
    )
};

export default ChatWindow;