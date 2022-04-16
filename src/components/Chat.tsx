import { useState } from 'react';
import { io, Socket } from 'socket.io-client';

type ChatType = {
  name: string;
  content: string;
};

let socket: Socket;

const Chat = () => {
  const [chatList, setChatList] = useState<ChatType[]>([]);

  const socketInitiate = () => {
    socket = io('ws://seungmin.shop', {
      extraHeaders: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
    });
    socket.on('receiveChat', (data: ChatType[]) => {
      setChatList(prev => [...prev, ...data]);
    });
  };

  return null;
};

export default Chat;
