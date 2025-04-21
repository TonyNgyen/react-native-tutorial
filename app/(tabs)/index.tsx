import { Stack } from 'expo-router';
import EventListItem from '~/components/EventListItem';
import { FlatList } from 'react-native';
import { supabase } from '~/utils/supabase';
import { useEffect, useState } from 'react';
import { NearbyEvent } from '~/types/db';

export default function Events() {
  const [events, setEvents] = useState<NearbyEvent[]>([]);

  // const fetchAllEvents = async () => {
  //   let { data, error } = await supabase.from('events').select('*');
  //   setEvents(data);
  // };

  const fetchNearbyEvents = async () => {
    const { data, error } = await supabase.rpc('nearby_events', {
      lat: 32.86,
      long: -117.22,
    });
    if (data) {
      setEvents(data);
    }
  };

  useEffect(() => {
    fetchNearbyEvents();
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
