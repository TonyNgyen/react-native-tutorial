import { router } from 'expo-router';
import { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Avatar from '~/components/Avatar';
import { useAuth } from '~/contexts/AuthProvider';
import { supabase } from '~/utils/supabase';

export default function CreateEventPage() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [imageUrl, setImageUrl] = useState('');

  const createEvent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          title: title,
          description: description,
          date: date.toISOString(),
          user_id: user.id,
          image_uri: imageUrl,
          location_point: 'POINT(-117.22 32.85)'
        },
      ])
      .select()
      .single();
    if (error) {
      Alert.alert('Failed to create the event', error.message);
    } else {
      setTitle('');
      setDate(new Date());
      setDescription('');
      setLoading(false);
      router.push(`/event/${data.id}`);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1 gap-3 bg-white p-5">
        <View className="items-center">
          <Avatar
            size={200}
            url={imageUrl}
            onUpload={(url: string) => {
              setImageUrl(url);
            }}
          />
        </View>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
          autoCapitalize={'none'}
          className="rounded-md border border-gray-200 p-3"
        />
        <TextInput
          placeholder="Description"
          autoCapitalize={'none'}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
          className="min-h-32 rounded-md border border-gray-200 p-3"
        />
        <Text onPress={() => setOpen(true)} className="rounded-md border border-gray-200 p-3">
          {date.toLocaleString()}
        </Text>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          minuteInterval={15}
          minimumDate={new Date()}
        />
        <Pressable
          className="mt-auto items-center rounded-md bg-red-500 p-3 px-8"
          onPress={() => createEvent()}
          disabled={loading}>
          <Text className="text-lg font-bold text-white">Create Event</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
}
