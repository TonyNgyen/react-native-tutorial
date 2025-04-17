import { Stack } from 'expo-router';
import EventListItem from '~/components/EventListItem';
import { FlatList } from 'react-native';
import { supabase } from '~/utils/supabase';
import { useEffect, useState } from 'react';

export default function Events() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    let { data, error } = await supabase.from('events').select('*');
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />
      <FlatList
        className="bg-white"
        data={events}
        renderItem={({ item }) => <EventListItem event={item} />}
      />
    </>
  );
}
