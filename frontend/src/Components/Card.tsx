import * as React from 'react';

export default function Card(props: any) {
    const {
        name,
        start_time,
        end_time,
        participants,
        id,
        setModalOpen,
    } = props;

    return (
        <div className={"scheduler-card"}>
            <div className={"body"}>
                <p>
                    Interview Name: {name}
                </p>
                <p>
                    Start Date: {start_time}
                </p>
                <p>
                    End Date: {end_time}
                </p>
                <p>
                    Participants: {
                        participants.map((p: any)=> p.name).join(", ")
                    }
                </p>
            </div>
            <div className={"button"}>
                <button onClick={()=> setModalOpen(id)}>
                    Edit
                </button>
            </div>
        </div>
    );
}