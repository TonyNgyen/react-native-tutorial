import { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import DatePicker from 'react-native-date-picker';

export default function CreateEventPage() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <View className="flex-1 gap-3 bg-white p-5">
      <TextInput
        secureTextEntry={true}
        placeholder="Title"
        autoCapitalize={'none'}
        className="rounded-md border border-gray-200 p-3"
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Description"
        autoCapitalize={'none'}
        multiline
        numberOfLines={3}
        className="min-h-32 rounded-md border border-gray-200 p-3"
      />
      <Button title="Open" onPress={() => setOpen(true)} />
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
      />
    </View>
  );
}
