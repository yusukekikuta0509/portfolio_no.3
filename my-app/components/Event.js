// components/Event.js
import React from 'react';

const events = [
  { id: 1, title: 'Event 1', description: 'イベント1の詳細説明' },
  { id: 2, title: 'Event 2', description: 'イベント2の詳細説明' },
  { id: 3, title: 'Event 3', description: 'イベント3の詳細説明' },
];

const Event = () => {
  return (
    <section id="event" style={{ padding: '50px 20px' }}>
      <h2>Event</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {events.map(event => (
          <div key={event.id} style={{ border: '1px solid #ccc', padding: '10px', width: '300px' }}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Event;
