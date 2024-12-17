import React, { useState, useEffect } from "react";

function Timer() {
    const [isActive, setIsActive] = useState(false);
    const [time, setTime] = useState({ minutes: 0, seconds: 0 });

    useEffect(() => {
        let intervalId;

        if (isActive) {
            intervalId = setInterval(() => {
                setTime(prevTime => {
                    let newSeconds = prevTime.seconds + 1;
                    let newMinutes = prevTime.minutes;
                    if (newSeconds === 60) {
                        newSeconds = 0;
                        newMinutes++;
                    }
                    return { minutes: newMinutes, seconds: newSeconds };
                });
            }, 1000);
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [isActive]);

    const handleToggle = () => {
        if(isActive==true) {
            setIsActive(false);
        } else {
            setTime({ minutes: 0, seconds: 0 });
            setIsActive(true);
        }
    };

    return (
        <div>
            <h2>Temporizador</h2>
            <div onClick={handleToggle}>
                <span>{time.minutes < 10 ? '0' + time.minutes : time.minutes}</span>:
                <span>{time.seconds < 10 ? '0' + time.seconds : time.seconds}</span>
            </div>
        </div>
    );
}

export default Timer;
