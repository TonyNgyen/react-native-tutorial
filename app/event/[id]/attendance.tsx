import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { supabase } from '~/utils/supabase';

export default function EventAttendance() {
  const { id } = useLocalSearchParams();
  const [attendees, setAttendees] = useState([]);
  const fetchAttendees = async () => {
    const { data } = await supabase.from('attendance').select('*, profiles(*)').eq('event_id', id);
    setAttendees(data);
  };

  useEffect(() => {
    fetchAttendees();
  }, [id]);
  console.log(attendees);
  return (
    <>
      <FlatList
        data={attendees}
        renderItem={({ item }) => (
          <View className="p-3">
            <Text className="font-bold">{item.profiles.full_name || 'User'}</Text>
          </View>
        )}
      />
    </>
  );
}
