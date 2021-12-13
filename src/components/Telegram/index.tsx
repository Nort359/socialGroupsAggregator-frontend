import React, { memo, useState, useCallback } from 'react';

import { useTelegramData } from '../../hooks/telegram';

import TelegramService from '../../services/TelegramService';

import Input from '../Input';
import Button from '../Button';

const Telegram = memo((): React.ReactElement => {
    const [message, setMessage] = useState<string>('');
    const { firstName, lastName, userName, chats } = useTelegramData();

    const onSendHandler = useCallback(async () => {
        await TelegramService.send(
            chats.map(({id}) => id),
            message,
        );

        setMessage('');
    }, [chats, message]);

    return userName ? (
        <div>
            <h2>Телеграм: {firstName} {lastName} (@{userName})</h2>
            <h3>Телеграм группы:</h3>
            {chats?.map((item, index) => (
                <div key={item.id}>
                    <p>- {item.title}</p>
                </div>
            ))}
            <p>Сообщение:</p>
            <Input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
            />
            <Button text={'Отправить'} onClick={onSendHandler} />
        </div>
    ) : (<h2>Вы ещё не авторизировались в телеграм боте</h2>);
});

export default Telegram;
